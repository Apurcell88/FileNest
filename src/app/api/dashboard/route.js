import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";

const prisma = PrismaClient();

export async function GET() {
  const user = await getSession();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }, { status: 401 })
    );
  }

  const folders = await prisma.folder.findMany({
    where: { userId: user.id },
    include: {
      files: {
        orderBy: { uploadedAt: "desc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return new Response(JSON.stringify({ user, folders }), { status: 200 });
}
