import { NextResponse } from "next/server";
import { transporter, mailOptions } from "@/config/nodemailer";

export async function POST(req){
    const { email, otp } = await req.json();

    if (!email || !otp) return new NextResponse('Missing email or otp', { status: 400 })

    try {
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