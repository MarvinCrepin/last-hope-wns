import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../types";
import moment from "moment";

export default async (
  _: any,
  { projectId }: { projectId: string },
  context: Context
) => {
  isConnected(context.authenticatedUser);

  const project = await context.prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  let lastWeek: any = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  lastWeek = new Date(lastWeek).toISOString();

  const ticketDurationUser = await context.prisma.ticketDurationUser.findMany({
    where: {
      AND: [
        {
          created_at: {
            gte: lastWeek,
          },
        },
        { project_id: projectId },
      ],
    },

    include: {
      ticket: true,
      user: true,
    },
  });

  const stats = ticketDurationUser.sort((a: any, b: any) => {
    return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf();
  });

  let label: string[] = [];
  let treatData: number[] = [];

  let count = 0;
  let weekDayNameCurrent: string | null = null;

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

  return {
    datas: treatData,
    labels: label,
    total_passed_time: treatData.reduce(
      (sum: number, current: number) => sum + current,
      0
    ),
  };
};
