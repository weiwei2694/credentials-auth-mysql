import { CreateNewPost } from "./(components)"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

const CreateNewPostPage = async () => {
    const session = await getServerSession(authOptions)

    if (!session) redirect('/login');

  return (
    <div className="container max-w-[450px] mt-6">
        {/* Router Push Back */}
        <div className="mb-10">
            <Link href="/posts" className="font-medium text-black flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> </svg>

                Back
            </Link>
        </div>

        {/* Create New Post */}
        <CreateNewPost userId={session.user.userId} />
    </div>
  )
}

export default CreateNewPostPage