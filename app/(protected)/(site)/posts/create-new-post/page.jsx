import { CreateNewPost } from "./(components)"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation"

const CreateNewPostPage = async () => {
    const session = await getServerSession(authOptions)

    if (!session) redirect('/login');

  return (
    <div className="container max-w-[450px] mt-6">
        <CreateNewPost />
    </div>
  )
}

export default CreateNewPostPage