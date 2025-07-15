"use client";

import toast from "react-hot-toast";

const LogoutBtn = () => {
  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } else {
      toast.error("Failed to logout. Try again.");
    }
  };

  return (
    <button className="text-black" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;
