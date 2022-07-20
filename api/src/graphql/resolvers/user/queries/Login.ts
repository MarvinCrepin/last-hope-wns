import { ApolloError } from "apollo-server-core";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async (_parent: any, args: any, context: any) => {
  const user = await context.prisma.user.findUnique({
    where: { mail: args.mail },
  });

  if (!user) {
    throw new ApolloError("Invalid mail");
  }

  if (!bcrypt.compareSync(args.password, user.password)) {
    throw new ApolloError("Invalid password");
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
      expiresIn: 10000,
    }
  );

  return { token, user };
};
