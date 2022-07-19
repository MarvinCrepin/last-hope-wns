import { ApolloError } from "apollo-server-errors";
import { JwtPayload } from "jsonwebtoken";

export default function isConnected(authenticatedUser: JwtPayload) {
  console.log(authenticatedUser);
  if (!authenticatedUser) {
    throw new ApolloError("Not Authorized");
  }
}
