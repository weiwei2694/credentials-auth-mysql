import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div className="container mt-6">
      {/* Name */}
      <h1 className="font-extrabold text-3xl text-black">
        {session.user.name}
      </h1>

      {/* divider */}
      <div className="h-[1px] bg-gray-200 w-full mt-2 mb-4" />

      {/* Email */}
      <h3 className="font-medium text-black font-serif">
        Email: <span className="text-gray-500">{session.user.email}</span>
      </h3>

      {/* User ID */}
      <h3 className="font-medium text-black font-serif">
        userId: <span className="text-gray-500">{session.user.userId}</span>
      </h3>
    </div>
  );
};

export default DashboardPage;
