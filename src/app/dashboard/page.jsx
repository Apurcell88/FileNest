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
    redirect("/");
  }

  const folders = await prisma.folder.findMany({
    where: { userId: session.user.id },
    include: { files: true },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 px-4 py-6">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <Nav />
        <h1 className="text-3xl font-bold my-4 text-white">
          Welcome, {session.user?.name || session.user?.email}
        </h1>

        <CreateFolderBtn createFolder={createFolder} />

        <div className="mt-6 space-y-2">
          <Folders folders={folders} />
        </div>
      </div>
    </div>
  );
}
