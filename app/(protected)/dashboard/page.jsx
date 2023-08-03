import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

import { redirect } from "next/navigation"

const DashboardPage = async () => {
    const session = await getServerSession(authOptions)

    if (!session) redirect('/login');
    
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage