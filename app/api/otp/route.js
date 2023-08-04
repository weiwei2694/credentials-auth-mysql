import db from "@/lib/db";
import { NextResponse } from "next/server";
import { hash, compare } from "bcrypt";

export async function PATCH(req){
    const { email, otp, otpExpired } = await req.json();

    if (!email) return new NextResponse('Missing email', { status: 400 })

    try {
        if (!otp && !otpExpired) {
            await db.user.update({
                where: { email },
                data: {
                    hashOtp: null,
                    otpExpired: null
                }
            })

            return new NextResponse(null, { status: 204 })
        }

        const hashOtp = await hash(otp, 10);

        const user = await db.user.update({
            where: { email },
            data: {
                hashOtp,
                otpExpired
            }
        })

        if (!user) return new NextResponse("User not found", { status: 404 });

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error.message);
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function POST(req){
    const { email, otp } = await req.json();

    if (!email || !otp) return new NextResponse('Missing email or otp', { status: 400 })

    try {
        const user = await db.user.findUnique({
            where: { email }
        })

        if (!user) return new NextResponse("User not found", { status: 404 });

        const otpMatch = await compare(otp, user?.hashOtp)

        if (!otpMatch) return new NextResponse('Invalid OTP', { status: 400 })

        const currentTime = new Date().getTime();

        if (user?.otpExpired <= currentTime) return new NextResponse('Token expires, please request a new OTP code', { status: 410 })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.log(error.message)
        return new NextResponse(error.message, { status: 500 })
    }
}