import {Context} from '../../../../context'

export default async ( _obj: any , _args :any, context:Context) => await context.prisma.project.findMany();
