import { ApolloError } from "apollo-server-core";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async (
  _parent: any,
  { loginUserInput }: { loginUserInput: LoginUserInput },
  context: any
) => {
  const user = await context.prisma.user.findUnique({
    where: { mail: loginUserInput.mail },
  });

  if (
    !user ||
    !(await bcrypt.compare(loginUserInput.password, user.password))
  ) {
    throw new ApolloError("Invalid credentials");
  }

  const token = await jwt.sign(
    {
      id: user._id,
      mail: user.mail,
      roles: user.roles,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );

  return { token, user };
};
