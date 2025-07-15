import { serialize } from "cookie";
import { PrismaClient } from "@/generated/prisma";
import { getSession } from "@/lib/session";

const prisma = new PrismaClient();

export async function POST() {
  const session = getSession();

  if (session?.id) {
    await prisma.session.deleteMany({
      where: { sid: session.id },
    });
  }

  // Clear cookie
  const cookie = serialize("session_id", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
