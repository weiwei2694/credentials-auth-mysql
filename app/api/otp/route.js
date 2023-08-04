import db from "@/lib/db";
import { NextResponse } from "next/server";
import { hash, compare } from "bcrypt";

export async function PATCH(req){
    const { email, otp, otpExpired } = await req.json();

    if (!otp || !otpExpired || !email) return new NextResponse('Missing otp, otpExpired or email', { status: 400 })

    try {
        const hashOtp = await hash(otp, 10);

        const user = await db.user.findUnique({
            where: { email },
            data: {
                hashOtp,
                otpExpired
            }
        })

        if (!user) return new NextResponse(null, { status: 204 })

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error.message);
        return new NextResponse(error.message, { status: 500 })
    }
}

export async function GET(req){
    const { email, otp } = await req.json();

    if (!email || !otp) return new NextResponse('Missing email or otp', { status: 400 })

    try {
        const user = db.user.findUnique({
            where: { email }
        })

        if (!user) return new NextResponse(null, { status: 204 });

        const otpMatch = await compare(otp, user?.hashOtp)

        if (!otpMatch) return new NextResponse('Invalid OTP', { status: 410 })

        const currentTime = new Date().getTime();

        if (user?.otpExpired <= currentTime) return new NextResponse('Token expires, please request a new OTP code', { status: 410 })

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.log(error.message)
        return new NextResponse(error.message, { status: 500 })
    }
}