type FindManyArgs = Prisma.UserFindManyArgs;

export interface Context {
  prisma: PrismaClient;
  authenticatedUser: JwtPayload | null;
}
