import { ApolloServer } from "apollo-server";

import * as dotenv from "dotenv";

import typeDefs from "./graphql/resolvers/typeDefs";
import { context } from "./context";
import resolvers from "./graphql/resolvers/resolvers";

dotenv.config();

const runServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
  });

  const port = process.env.PORT || 4000;

  server.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
};

runServer();
