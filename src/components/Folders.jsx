"use client";

import { useState } from "react";
import UploadFileBtn from "./UploadFileBtn";

const Folders = ({ folders }) => {
  const [openFolderId, setOpenFolderId] = useState(null);

  const toggleFolder = (folderId) => {
    setOpenFolderId((prev) => (prev === folderId ? null : folderId));
  };

  return (
    <div className="mt-6 space-y-2">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="p-4 bg-white text-black rounded shadow-md"
        >
          <h2
            className="text-lg font-semibold cursor-pointer"
            onClick={() => toggleFolder(folder.id)}
          >
            📁 {folder.name}
          </h2>
          <p>{folder.files?.length ?? 0}</p>
          <UploadFileBtn />

          {openFolderId === folder.id && (
            <div className="ml-4 mt-2 space=y=1">
              {folder.files.length > 0 ? (
                folder.files.map((file) => (
                  <div key={file.id} className="p-2 bg-gray-100 rounded">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No files in this folder.
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Folders;
