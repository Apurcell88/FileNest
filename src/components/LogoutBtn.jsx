"use client";

const LogoutBtn = () => {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <button className="text-black" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;
