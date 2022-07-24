import { Context } from "../graphql/resolvers/types";


export default async function createNotification(
  title: string,
  content: string,
  type: string,
  context: Context,
  userId: string
) {
  if (title && content && type && userId && context) {
    try {
      const newNotification = await context.prisma.notification.create(
        {data:{
        title,
        content,
        type,
        is_read: false,
        user_id: userId,
      }});

      return newNotification;
    } catch (err) {
      console.log(err);
    }
  }
}
