"use server";
import { PrismaClient } from "@/generated/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createFolder(formData) {
  const session = await getSession();
  const name = formData.get("name");
  if (!name) throw new Error("Folderr name is required");

  const folder = await prisma.folder.create({
    data: {
      name,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard");

  return folder;
}
