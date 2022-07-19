import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

import typeDefs from "./graphql/resolvers/typeDefs";
import resolvers from "./graphql/resolvers/resolvers";

dotenv.config();

const prisma = new PrismaClient();

const runServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (token) {
        try {
          const payload: JwtPayload | String = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET_KEY as string
          );
          console.log(payload);

          return { authenticatedUser: payload, prisma: prisma };
        } catch (err) {
          console.error(err);
        }
      }

      return { prisma: prisma, authenticatedUser: null };
    },
  });

  const port = process.env.PORT || 4000;

  server.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
};

runServer();
