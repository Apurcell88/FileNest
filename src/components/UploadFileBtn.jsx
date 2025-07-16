"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UploadFileBtn = ({ folderId }) => {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", "file-nest");

    const cloudRes = await fetch(
      "https://api.cloudinary.com/v1_1/drmj2e2qa/upload",
      {
        method: "POST",
        body: formDataCloud,
      }
    );

    const cloudData = await cloudRes.json();

    const formData = new FormData();
    formData.append("fileName", file.name);
    formData.append("fileSize", file.size);
    formData.append("folderId", folderId);
    formData.append("fileUrl", cloudData.secure_url);
    formData.append("publicId", cloudData.public_id);

    await fetch("/api/files", {
      method: "POST",
      body: formData,
    });

    startTransition(() => {
      router.refresh();
      toast.success("File uploaded!");
    });

    setFile(null); // clear file after upload
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-x-2 mt-2">
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="cursor-pointer"
      />
      <button
        onClick={handleUpload}
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        {isPending ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadFileBtn;
