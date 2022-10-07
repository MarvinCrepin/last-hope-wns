import isConnected from "../../../../helpers/isConnected";
import { Context } from "../../../resolvers/types";
import { ROLES } from "../../../../Constant";

async function addSpentTime(projects: any) {
  await projects.forEach((project: any) => {
    let totalDuration = 0;
    project.tickets.forEach((ticket: any) => {
      ticket.ticketDurationUser.forEach((ticketDurationUser: any) => {
        totalDuration += ticketDurationUser.minute_passed;
      });
    });
    project["time_spent"] = totalDuration;
    console.log(project);
    console.log(
      (totalDuration / (project.estimated_time ? project.estimated_time : 0)) *
        100
    );
    project["advancement"] = Math.round(
      (totalDuration / project.estimated_time) * 100
    );
  });

  return projects;
}

export default async (_obj: any, _args: any, context: Context) => {
  isConnected(context.authenticatedUser);

  if (context.authenticatedUser.roles === ROLES.ADMIN) {
    const result = await context.prisma.project.findMany({
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        tickets: {
          include: {
            ticketDurationUser: true,
          },
        },
        product_owner: true,
      },
    });

    return await addSpentTime(result);
  }

  const projectUser = await context.prisma.userProject.findMany({
    where: {
      userId: context.authenticatedUser.id,
    },
    include: {
      project: true,
    },
  });

  let projectsId: string[] = [];

  projectUser.forEach((project: any) => {
    projectsId.push(project.projectId);
  });

  const result = await context.prisma.project.findMany({
    where: {
      id: {
        in: projectsId,
      },
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
      product_owner: true,
    },
  });

  return await addSpentTime(result);
};
