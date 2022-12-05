import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";
import moment from "moment";
import isAuthorizedToAdminProject from "../../../../helpers/isAuthorizedToAdminProject";
import { DataStat, TicketDurationUser, UserStat } from "../types";

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

  async function transformData(stats: TicketDurationUser[], user: UserStat) {
    let label: string[] = [];
    let treatData: number[] = [];

    let count = 0;
    let weekDayNameCurrent: string | null = null;

    stats.map(async (ticketDuration: TicketDurationUser, index: number) => {
      new Promise<void>((resolve) => {
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
        resolve();
      });
    });

    return { label: label, data: treatData, user };
  }

  // Simple User project
  if (!(await isAuthorizedToAdminProject(context, projectId))) {
    let result: DataStat[] = [];

    const user: UserStat = {
      id: context.authenticatedUser.id,
      firstname: context.authenticatedUser.firstname,
      lastname: context.authenticatedUser.lastname,
      mail: context.authenticatedUser.mail,
    };

    let ticketDurationUser = await context.prisma.ticketDurationUser.findMany({
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

    if (ticketDurationUser && ticketDurationUser.length > 0) {
      const stats = ticketDurationUser.sort((a: any, b: any) => {
        return (
          new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
        );
      });

      let resulForUserCurrent = await transformData(stats, user);

      result.push(resulForUserCurrent);
    }

    return {
      datas: result,
    };
  }
  //Admin project
  else {
    let result: DataStat[] = [];
    let userArray: string[] = [];

    userArray = userIdArray.reduce((acc: string[], item: string) => {
      if (acc.indexOf(item) === -1) {
        acc.push(item);
      }
      return acc;
    }, []);

    for (const userId of userArray) {
      const userExist = await context.prisma.user.findUnique({
        where: { id: userId },
      });

      if (userExist) {
        let ticketDurationUser =
          await context.prisma.ticketDurationUser.findMany({
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

        if (ticketDurationUser && ticketDurationUser.length > 0) {
          const stats = ticketDurationUser.sort((a: any, b: any) => {
            return (
              new Date(a.created_at).valueOf() -
              new Date(b.created_at).valueOf()
            );
          });

          let resulForUserCurrent = await transformData(stats, userExist);
          result.push(resulForUserCurrent);
        }
      }
    }
    return {
      datas: result,
    };
  }
};
