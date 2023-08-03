import { Login } from "./(components)/index "

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage