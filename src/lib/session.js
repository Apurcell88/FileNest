import { cookies } from "next/headers";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function getSession() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { sid: sessionId },
    include: { user: true }, // to access session.user
  });

  // Check if the session exists and hasn't expired
  if (!session || new Date(session.expiresAt) < new Date()) {
    return null;
  }

  return {
    id: session.sid,
    user: session.user,
  };
}
