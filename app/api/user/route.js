import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import db from "@/lib/db";

export async function PATCH(req){
    const { email, password } = await req.json()

    if (!email || !password) return new NextResponse('Missing email or password', { status: 400 });

    try {
        const hashedPassword = await hash(password, 10);

        const updateUser = await db.user.update({
            where: { email },
            data: {
                hashedPassword
            }
        })

        return new NextResponse(JSON.stringify(updateUser), { status: 200 })
    } catch (error) {
        console.log(error.message)
        return new NextResponse(error.message, { status: 500 })
    }
}