import { PrismaClient } from "@/generated/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  const folderId = params.folderId;

  const files = await prisma.file.findMany({
    where: { folderId },
  });

  await Promise.all(
    files.map((file) => cloudinary.uploader.destroy(file.publicId))
  );

  await prisma.folder.delete({
    where: { id: folderId },
  });

  return NextResponse.json({ message: "Folder and files deleted" });
}
