import { ApolloError } from "apollo-server-errors";
import { JwtPayload } from "jsonwebtoken";

export default function isConnected(authenticatedUser: JwtPayload | string) {
  if (authenticatedUser === "Token expired") {
    throw new ApolloError("Token expired");
  }

  if (!authenticatedUser) {
    throw new ApolloError("Not Authorized");
  }
}
