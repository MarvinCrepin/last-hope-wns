export interface Context {
  prisma: PrismaClient;
  authenticatedUser: JwtPayload | null;
}
