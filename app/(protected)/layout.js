import { Navbar } from "./(components)"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

const layout = async ({ children }) => {
    const session = await getServerSession(authOptions)
    
  return (
    <>
        <Navbar userImg={session?.user?.image} name={session?.user.name} />
        <main>
            {children}
        </main>
    </>
  )
}

export default layout