import { ApolloError } from "apollo-server-errors";
import { JwtPayload } from "jsonwebtoken";

export default function isConnected(authenticatedUser: JwtPayload) {
  if (!authenticatedUser) {
    throw new ApolloError("Not Authorized");
  }
}
