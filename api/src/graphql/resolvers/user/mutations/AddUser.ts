const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

export default async (_parent: any, { createUserInput }: { createUserInput: userInputRegister }, context: any) => {
  // Faire de la vérification de données
    const password = await bcrypt.hash(createUserInput.password, 10);
    const defaultRole = "ROLE_DEVELOPER";
    const data = {...createUserInput, password, roles: defaultRole}

    const user = await context.prisma.user.create({ data: { ...data } });

    const token = jwt.sign({ userId: user.id },  process.env.ACCESS_TOKEN_SECRET_KEY);

    return {
      token,
      user
    }
}