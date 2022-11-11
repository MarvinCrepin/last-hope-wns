import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";
import moment from "moment";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";

export default async (
  _: any,
  { projectId, userIdArray }: { projectId: string; userIdArray: string[] },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const project = await context.prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (userIdArray.length === 0) {
    throw new Error("User list is empty");
  }

  let lastWeek: string | number = Date.now() - 168 * 60 * 60 * 1000;
  lastWeek = new Date(lastWeek).toISOString();

  let ticketDurationUser: any[] | null = null;

  let result: any = [];

  // Simple User project
  if (!(await isAuthorizedToAdminProject(context, projectId))) {
    const user = {
      id: context.authenticatedUser.id,
      fistname: context.authenticatedUser.firstname,
      lastname: context.authenticatedUser.lastname,
      mail: context.authenticatedUser.mail,
    };

    ticketDurationUser = await context.prisma.ticketDurationUser.findMany({
      where: {
        AND: [
          {
            created_at: {
              gte: lastWeek,
            },
          },
          { project_id: projectId },
          { user_id: context.authenticatedUser.id },
        ],
      },
      include: {
        ticket: true,
        user: true,
      },
    });

    let label: string[] = [];
    let treatData: number[] = [];

    let count = 0;
    let weekDayNameCurrent: string | null = null;

    if (ticketDurationUser && ticketDurationUser.length > 0) {
      const stats = ticketDurationUser.sort((a: any, b: any) => {
        return (
          new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
        );
      });

      stats.forEach((ticketDuration: any, index: number) => {
        const myDate = ticketDuration.created_at;
        const weekDayName = moment(myDate).format("MMM Do YYYY");

        if (weekDayNameCurrent === null) {
          weekDayNameCurrent = weekDayName;
        }

        if (weekDayName === weekDayNameCurrent) {
          count += ticketDuration.minute_passed;
        } else {
          treatData.push(Math.ceil(count / 60));
          label.push(weekDayNameCurrent);
          count = 0 + ticketDuration.minute_passed;
          weekDayNameCurrent = weekDayName;
        }

        if (index === stats.length - 1) {
          label.push(weekDayNameCurrent);
          treatData.push(Math.ceil(count / 60));
        }
      });

      result.push({ label: label, data: treatData, user });
    }

    //Admin project
  } else {
    let userArray: string[] = [];

    userArray = userIdArray.reduce((acc: string[], item: string) => {
      if (acc.indexOf(item) === -1) {
        acc.push(item);
      }
      return acc;
    }, []);

    userArray.forEach(async (id: string) => {
      const userExist = await context.prisma.user.findUnique({
        where: { id: id },
      });

      if (userExist) {
        ticketDurationUser = await context.prisma.ticketDurationUser.findMany({
          where: {
            AND: [
              {
                created_at: {
                  gte: lastWeek,
                },
              },
              { project_id: projectId },
              { user_id: userExist.id },
            ],
          },

          include: {
            ticket: true,
            user: true,
          },
        });

        let label: string[] = [];
        let treatData: number[] = [];

        let count = 0;
        let weekDayNameCurrent: string | null = null;

        if (ticketDurationUser && ticketDurationUser.length > 0) {
          const stats = ticketDurationUser.sort((a: any, b: any) => {
            return (
              new Date(a.created_at).valueOf() -
              new Date(b.created_at).valueOf()
            );
          });

          stats.forEach((ticketDuration: any, index: number) => {
            const myDate = ticketDuration.created_at;
            const weekDayName = moment(myDate).format("MMM Do YYYY");

            if (weekDayNameCurrent === null) {
              weekDayNameCurrent = weekDayName;
            }

            if (weekDayName === weekDayNameCurrent) {
              count += ticketDuration.minute_passed;
            } else {
              treatData.push(Math.ceil(count / 60));
              label.push(weekDayNameCurrent);
              count = 0 + ticketDuration.minute_passed;
              weekDayNameCurrent = weekDayName;
            }

            if (index === stats.length - 1) {
              label.push(weekDayNameCurrent);
              treatData.push(Math.ceil(count / 60));
            }
          });
        }

        result.push({ label: label, data: treatData, user: userExist });
      }
    });

    while (result.length < userArray.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return {
    datas: result,
  };
};
