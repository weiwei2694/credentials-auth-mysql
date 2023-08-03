import { Login } from "./(components)/index "

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation";

const LoginPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');

  const OAuthCallbackError = searchParams?.error

  return (
    <div>
        <Login OAuthCallbackError={OAuthCallbackError} />
    </div>
  )
}

export default LoginPage