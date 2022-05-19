import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { typeDefs } from "./schema";
import resolvers from './resolvers/queries/project/project';

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
