import db from "./db";

export const getPosts = async () => {
    try {
        const posts = await db.post.findMany()
        return posts
    } catch (error) {
        console.log(error)
        return { error }
    }
}

export const createPost = async (data) => {
    try {
        const post = await db.post.create({
            data
        })

        return { post }
    } catch (error) {
        console.log(error)
        return { error }
    }
}