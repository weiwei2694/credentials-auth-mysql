import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(req){
    const { name, password, email } = await req.json();

    if (!name || !password || !email) {
        return new NextResponse("Missing name, email or password", { status: 400 })
    }

    const exist = await db.user.findUnique({
        where: {
            email
        }
    })

    if (exist) {
        return new NextResponse("Email already exist", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}