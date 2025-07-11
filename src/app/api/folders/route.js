import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const folders = await prisma.folder.findMany({
    where: { userId: session.user.id },
    include: { files: true },
  });

  return NextResponse.json({ folders, user: session.user });
}

export async function POST(req) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();

  if (!name || name.trim() === "") {
    return NextResponse.json(
      { error: "Folder name is required" },
      { status: 400 }
    );
  }

  const newFolder = await prisma.folder.create({
    data: {
      name,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ message: "Folder created", folder: newFolder });
}
