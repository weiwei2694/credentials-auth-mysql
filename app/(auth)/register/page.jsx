import { Register } from "./(components)"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/dashboard');
  
  return (
    <div>
        <Register />
    </div>
  )
}

export default RegisterPage