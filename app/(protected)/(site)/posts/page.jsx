import { PostsItem, PostsNavigation } from "./(components)";
import { Refresh } from "@/components";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

import { getUsers } from "@/lib/user";
import { getPosts } from "@/lib/posts";

const PostsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const posts = await getPosts();
  const users = await getUsers();

  return (
    <div className="container mt-6 flex flex-col gap-8">
      {/* Refresh */}
      <Refresh />

      {/* Navigation */}
      <PostsNavigation />

      {/* PostsItem */}
      {posts.length === 0 ? (
        <div className="grid place-items-center">
          <p className="font-medium text-black">No Posts</p>
        </div>
      ) : (
        <div className="space-y-6 columns-1 sm:columns-2 md:columns-3 md:gap-6">
          {posts.map((item) => {
            const user = users.find(({ id }) => id === item.userId);
            return <PostsItem key={item.id} item={item} name={user.name} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
