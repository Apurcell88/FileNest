import { getSession } from "@/lib/session";
import { PrismaClient } from "@/generated/prisma";
import { redirect, revalidatePath } from "next/navigation";
import CreateFolderBtn from "@/components/CreateFolderBtn";
import Nav from "@/components/Nav";
import Folders from "@/components/Folders";

import { createFolder } from "./actions";

export default async function DashboardPage() {
  const prisma = new PrismaClient();
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const folders = await prisma.folder.findMany({
    where: { userId: session.user.id },
    include: { files: true },
  });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 min-h-screen">
      <Nav />
      <h1 className="text-3xl font-bold my-4 text-gray-300">
        Welcome, {session.user?.name || session.user?.email}
      </h1>
      <CreateFolderBtn createFolder={createFolder} />

      <div className="mt-6 space-y-2">
        <Folders folders={folders} />
      </div>
    </div>
  );
}
