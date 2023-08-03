import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const PostsItem = ({ item, name }) => {
  return (
    <article className="border border-gray-200 rounded py-4 px-6">
        {/* Title */}
        <h3 className="font-medium text-black">{item.title}</h3>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-200 my-3" />

        {/* Description */}
        <p className="text-sm text-gray-500">{item.description}</p>

        {/* Copyright - Footer */}
        <p className={`${inter.className} font-medium text-black text-xs mt-4`}>© {name}, Inc. All rights reserved.</p>
    </article>
  )
}

export default PostsItem