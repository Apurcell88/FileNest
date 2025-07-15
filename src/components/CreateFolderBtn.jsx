"use client";

import { useState } from "react";

export default function CreateFolderBtn({ createFolder }) {
  const [folderName, setFolderName] = useState("");

  async function handleCreate() {
    if (!folderName.trim()) return;

    const formData = new FormData();
    formData.append("name", folderName);

    await createFolder(formData);
    setFolderName(""); // clear input after creation
  }

  return (
    <div className="flex space-x-2 mt-4">
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Folder Name"
        className="border p-2 rounded text-white"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded border border-white"
      >
        Create Folder
      </button>
    </div>
  );
}
