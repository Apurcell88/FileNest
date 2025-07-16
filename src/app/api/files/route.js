import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const fileName = formData.get("fileName");
  const fileSize = formData.get("fileSize");
  const folderId = formData.get("folderId");
  const fileUrl = formData.get("fileUrl");
  const publicId = formData.get("publicId");

  if (!fileName || !folderId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const file = await prisma.file.create({
    data: {
      name: fileName,
      size: parseInt(fileSize),
      url: fileUrl,
      publicId,
      folderId,
      userId: session.user.id,
    },
  });

  return NextResponse.json(file, { status: 201 });
}
