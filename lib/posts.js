import db from "./db";

export const getPosts = async () => {
    try {
        const posts = await db.post.findMany()
        return { posts }
    } catch (error) {
        console.log(error)
        return { error }
    }
}