import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanupExpiredSessions() {
  const result = await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  console.log(`Deleted ${result.count} expired session(s).`);
  await prisma.$disconnect();
}

cleanupExpiredSessions().catch((err) => {
  console.error("Error cleaning up sessions", err);
  prisma.$disconnect();
  process.exit(1);
});
