import { UserInputError } from "apollo-server";

export default async (_parent: any, args: { data: any }, context: Context) => {
  let errors = null;

  try {
    if (args.data.title.trim() === "") errors = "Title must not be empty.";
    if (args.data.description.trim() === "")
      errors = "Description must not be empty.";
    if (!args.data.end_at) errors = "'End_at' must not be empty.";
    if (!args.data.due_at) errors = "'Due_at' must not be empty.";

    if (!args.data.advancement) errors = "Advancement must not be empty.";

    if (errors) throw errors;

    const project = await context.prisma.project.create({
      data: {
        title: args.data.title,
        description: args.data.description,
        start_at: new Date(args.data.start_at),
        end_at: new Date(args.data.end_at),
        due_at: new Date(args.data.due_at),
        product_owner_id: args.data.product_owner_id,
        advancement: args.data.advancement,
      },
    });

    console.log(project);

    return project;
  } catch (err) {
    throw new UserInputError("Bad Request", { errors: err });
  }
};
