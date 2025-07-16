import { PrismaClient } from "@/generated/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const folderId = params.folderId;

  try {
    await prisma.folder.delete({
      where: {
        id: folderId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Folder deleted successfully" });
  } catch (err) {
    console.error("Failed to delete folder:", err);
    return NextResponse.json(
      { error: "Failed to delete folder" },
      { status: 500 }
    );
  }
}
