import { ResetPassword } from "./(components)"
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

const ResetPasswordPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard');

  return (
    <div>
        <ResetPassword />
    </div>
  )
}

export default ResetPasswordPage