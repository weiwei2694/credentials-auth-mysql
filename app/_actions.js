"use server";
import { createPost } from "@/lib/posts";

export const createPostAction = async (data) => {
    await createPost(data)
}