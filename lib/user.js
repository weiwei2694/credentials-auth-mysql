import db from "./db";

export const getUsers = async () => {
    try {
        const users = await db.user.findMany();

        return users;
    } catch (error) {
        console.log(error)
    }
}