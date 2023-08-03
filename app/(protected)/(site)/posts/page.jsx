import { PostsItem, PostsNavigation } from "./(components)"
import { getPosts } from "@/lib/posts"

import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"
import { redirect } from "next/navigation"

const PostsPage = async () => {
    const session = await getServerSession(authOptions)

    if (!session) redirect('/login');

    // const posts = await getPosts()
    
    // temporary
    const posts = [
        {
            id: 1,
            title: "This is important to remember.",
            description: "This is important to remember. Love isn't like pie. You don't need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn't run out, so don't try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
            userId: 2
        },
        {
            id: 2,
            title: "His mother had always taught him",
            description: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
            userId: 9
        },
        {
            id: 3,
            title: "The Journey of a Lifetime",
            description: "The journey of a lifetime often requires leaving behind the familiar and stepping into the unknown. Embrace the challenges, for they are the opportunities that shape your character and open new horizons. With each step, you'll discover more about yourself and the world around you.",
            userId: 5
        },
        {
            id: 4,
            title: "A Simple Act of Kindness",
            description: "Sometimes, a simple act of kindness can brighten someone's day and have a ripple effect that spreads positivity to others. Whether it's a smile, a listening ear, or a helping hand, never underestimate the power of being kind. It costs nothing, but its impact can be immeasurable.",
            userId: 7
        }
    ]

  return (
    <div className="container mt-6">
        {/* Navigation */}
        <PostsNavigation />

        {/* Divider */}
        <div className="h-[1px] mb-6 md:mb-10 mt-3 bg-gray-200" />

        {/* PostsItem */}
        <div className="space-y-6 columns-1 sm:columns-2 md:columns-3 md:gap-6">
            {posts?.map((item) => (
                <PostsItem key={item.id} item={item} />
            ))}
        </div>
    </div>
  )
}

export default PostsPage