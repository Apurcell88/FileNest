"use client";

import { useState } from "react";

export default function CreateFolderBtn({ onCreate }) {
  const [folderName, setFolderName] = useState("");

  const handleCreate = async () => {
    if (!folderName) return;

    const res = await fetch("/api/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: folderName }),
    });

    const data = await res.json();
    if (res.ok) {
      onCreate(data.folder); // Send new folder back up
      setFolderName(""); // Clear input
    } else {
      console.error(data.error);
    }
  };

  return (
    <div className="flex space-x-2 mt-4">
      <input
        type="text"
        placeholder="Folder name"
        className="p-2 rounded border"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </div>
  );
}
