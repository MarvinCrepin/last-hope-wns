const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import createNotification from "../../../../helpers/createNotification";

export default async (
  _parent: any,
  { createUserInput }: { createUserInput: userInputRegister },
  context: any
) => {
  // Faire de la vérification de données
  const password = await bcrypt.hash(createUserInput.password, 10);
  const defaultRole = "ROLE_DEVELOPER";
  const data = { ...createUserInput, password, roles: defaultRole };

  const user = await context.prisma.user.create({ data: { ...data } });

  const token = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET_KEY
  );

  const notificationTitle = `Welcome to Last Hope ${user.lastname} ${user.firstname}!`;
  const notificationContent = `From your Dashboard, you can view your projects and your tasks in progress. If not, ask an admin to activate your account.`;
  const notificationType = "welcome";

  createNotification(
    notificationTitle,
    notificationContent,
    notificationType,
    context,
    user.id
  );

  return { token, user };
};
