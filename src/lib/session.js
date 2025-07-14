import { cookies } from "next/headers";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// export async function getSession(req = null) {
//   const cookieStore = req ? req.cookies : cookies();
//   const sessionId = cookieStore.get("session_id")?.value;

//   if (!sessionId) return null;

//   const session = await prisma.session.findUnique({
//     where: { sid: sessionId },
//     include: { user: true }, // to access session.user
//   });

//   // Check if the session exists and hasn't expired
//   if (!session || new Date(session.expiresAt) < new Date()) {
//     return null;
//   }

//   return {
//     id: session.sid,
//     user: session.user,
//   };
// }

export async function getSession(req = null) {
  let sessionId;

  if (req) {
    // Middleware: req.cookies is a Map
    sessionId = req.cookies.get("session_id")?.value;
  } else {
    // App route: cookies() is a function
    sessionId = cookies().get("session_id")?.value;
  }

  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { sid: sessionId },
    include: { user: true },
  });

  if (!session || new Date(session.expiresAt) < new Date()) {
    return null;
  }

  return {
    id: session.sid,
    user: session.user,
  };
}
