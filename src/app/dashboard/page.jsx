import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome, {session.user.name || session.user.email}</h1>
    </div>
  );
};

export default Dashboard;
