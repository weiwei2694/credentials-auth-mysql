import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/config/nodemailer";
import db from "@/lib/db";

export async function POST(req){
    const { email, otp } = await req.json();

    if (!email || !otp) return new NextResponse('Missing email or otp', { status: 400 })

    try {
        const user = await db.user.findUnique({
            where: {
                email
            },
            include: {
                accounts: true
            }
        })

        const accountsExist = user?.accounts;

        if (accountsExist.length !== 0) return new NextResponse('This email has been registered via OAuth and cannot use the forgot password feature.', { status: 403 })

        await transporter.sendMail({
            ...mailOptions,
            to: email,
            html: `<p>Code OTP: ${otp} | Expired in 2 minutes</p>`
        })

        return new NextResponse("Created", { status: 201 })
    } catch (error) {
        console.log(error.message)
        return new NextResponse(error.message, { status: 400 })
    }
}