import {Context} from '../../../../context'
import {ProjectInput} from '../../../../types'

export default (_parent: any, args: { data: ProjectInput }, context: Context) => {
  return context.prisma.project.create({
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
};
