import { PrismaClient } from "@prisma/client";
import {Context} from './graphql/resolvers/types'

const prisma = new PrismaClient();

export const context: Context = {
  prisma: prisma,
};
