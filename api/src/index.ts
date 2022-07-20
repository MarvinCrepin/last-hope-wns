import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
const jwt = require("jsonwebtoken");
import { JwtPayload } from "jsonwebtoken";
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
        //ts type to define error with string|jwt.JwtPayload and payload.user
        try {
          const payload: JwtPayload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET_KEY as string
          );
            console.log(payload);
          return { authenticatedUser: payload, prisma: prisma };
        } catch (err) {
          console.error(err);
        }
      } 
      return { prisma: prisma };
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
