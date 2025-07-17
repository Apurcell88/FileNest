"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UploadFileBtn from "./UploadFileBtn";

const Folders = ({ folders }) => {
  const [openFolderId, setOpenFolderId] = useState(null);
  const [deletingFileId, setDeletingFileId] = useState(null);

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

    setDeletingFileId(fileId);
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

    setDeletingFileId(null);
  };

  return (
    <div className="mt-6 space-y-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="p-4 bg-white text-black rounded shadow-md md:flex md:justify-between md:items-center"
        >
          <div>
            <h2
              className="text-lg font-semibold cursor-pointer"
              onClick={() => toggleFolder(folder.id)}
            >
              📁 {folder.name}
            </h2>
            <p className="text-sm text-gray-600">
              {folder.files?.length ?? 0} file(s)
            </p>
            <UploadFileBtn folderId={folder.id} />
          </div>

          <button
            className="bg-red-600 text-white text-xs rounded px-3 py-1 mt-2 md:mt-0 hover:bg-red-700"
            onClick={() => handleDeleteFolder(folder.id)}
          >
            Delete
          </button>

          <AnimatePresence>
            {openFolderId === folder.id && (
              <motion.div
                className="ml-4 mt-4 space-y-3 md:pr-5 md:space-y-2 md:grid md:grid-cols-2 md:gap-4"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {folder.files.length > 0 ? (
                  folder.files.map((file) => (
                    <div
                      key={file.id}
                      className="p-4 rounded flex items-center space-x-3"
                    >
                      <img
                        src={file.url.replace(
                          "/upload/",
                          "/upload/w_100,h_100,c_fill/"
                        )}
                        alt={file.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 block truncate max-w-[130px]"
                        >
                          {file.name}
                        </a>
                        <div className="flex space-x-2 mt-1">
                          <a
                            href={getDownloadUrl(file.url)}
                            className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Download
                          </a>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                            onClick={() => handleDeleteFile(file.id)}
                          >
                            {deletingFileId === file.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
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
