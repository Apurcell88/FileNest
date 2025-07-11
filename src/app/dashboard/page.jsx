"use client";

import { useEffect, useState } from "react";
import CreateFolderBtn from "@/components/CreateFolderBtn";

export default function DashboardPage() {
  const [folders, setFolders] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch folders on mount
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/folders"); // you'll need this route
      const data = await res.json();
      setFolders(data.folders);
      setUser(data.user);
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.name || user?.email}
      </h1>
      <CreateFolderBtn
        onCreate={(newFolder) => setFolders((prev) => [...prev, newFolder])}
      />

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
