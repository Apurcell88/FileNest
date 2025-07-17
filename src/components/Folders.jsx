"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UploadFileBtn from "./UploadFileBtn";

const Folders = ({ folders }) => {
  const [openFolderId, setOpenFolderId] = useState(null);

  const router = useRouter();

  const toggleFolder = (folderId) => {
    setOpenFolderId((prev) => (prev === folderId ? null : folderId));
  };

  const getDownloadUrl = (cloudUrl) => {
    return cloudUrl.replace("/upload/", "/upload/fl_attachment/");
  };

  const handleDeleteFolder = async (folderId) => {
    if (!confirm("Are you sure you want to delete this folder?")) return;

    try {
      const res = await fetch(`/api/folders/${folderId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Folder deleted!");
        router.refresh();
      } else {
        toast.error("Failed to delete folder.");
      }
    } catch (err) {
      toast.error("An error occured");
      console.error("Failed to delete folder:", err);
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("File deleted");
        router.refresh();
      } else {
        toast.error("Failed to delete file");
      }
    } catch (err) {
      toast.error("An error occured");
      console.error("Failed to delete file:", err);
    }
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
          <button
            className="bg-red-600 text-white text-xs rounded px-3 py-1 my-2 cursor-pointer hover:bg-red-700"
            onClick={() => {
              handleDeleteFolder(folder.id);
            }}
          >
            Delete
          </button>
          <p>{folder.files?.length ?? 0} file(s)</p>
          <UploadFileBtn folderId={folder.id} />

          <AnimatePresence>
            {openFolderId === folder.id && (
              <motion.div
                className="ml-4 mt-2 space-y-1"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {folder.files.length > 0 ? (
                  folder.files.map((file) => (
                    <div key={file.id} className="p-2 bg-gray-100 rounded">
                      <img
                        src={file.url.replace(
                          "/upload/",
                          "/upload/w_200,h_200,c_fill/"
                        )}
                        alt={file.name}
                        className="w-20 h-20 object-cover"
                      />
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                      <a
                        href={getDownloadUrl(file.url)}
                        className="bg-green-600 text-white px-2 py-1 rounded text-sm block w-[25%]"
                      >
                        Download
                      </a>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2 mt-2"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No files in this folder.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Folders;
