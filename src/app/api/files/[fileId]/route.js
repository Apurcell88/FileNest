import { PrismaClient } from "@/generated/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  const { fileId } = params;

  const file = await prisma.file.findUnique({
    where: { id: fileId },
  });

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  await cloudinary.uploader.destroy(file.publicId);

  await prisma.file.delete({
    where: { id: fileId },
  });

  return NextResponse.json({ message: "File deleted successfully" });
}
