import { getSession } from "@/lib/session";
import { PrismaClient } from "@/generated/prisma";
import { redirect, revalidatePath } from "next/navigation";
import CreateFolderBtn from "@/components/CreateFolderBtn";
import Nav from "@/components/Nav";
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
    <div className="p-6 max-w-4xl mx-auto">
      <Nav />
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {session.user?.name || session.user?.email}
      </h1>
      <CreateFolderBtn createFolder={createFolder} />

      <div className="mt-6 space-y-2">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="p-4 bg-white text-black rounded shadow-md"
          >
            <h2 className="text-lg font-semibold">{folder.name}</h2>
            <p>{folder.files?.length ?? 0} files</p>
          </div>
        ))}
      </div>
    </div>
  );
}
