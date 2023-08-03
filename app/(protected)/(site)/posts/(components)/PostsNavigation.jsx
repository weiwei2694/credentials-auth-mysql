"use client"
import { useRouter } from "next/navigation"

const PostsNavigation = () => {
    const router = useRouter()

  return (
    <div className="flex">
        <div className="flex-1 flex justify-end">
            <button type="button" className="py-2 px-6 bg-white hover:bg-gray-50 active:bg-gray-100 transition text-black border border-gray-200 font-medium rounded" onClick={() => router.push('/posts/create-new-post')}>Create New Post</button>
        </div>
    </div>
  )
}

export default PostsNavigation