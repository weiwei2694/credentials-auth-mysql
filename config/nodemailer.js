import { createTransport } from "nodemailer"

const email = process.env.NEXT_PUBLIC_EMAIL
const pass = process.env.NEXT_PUBLIC_EMAIL_PASS

export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass,
    }
})

export const mailOptions = {
    from: email,
    subject: 'Forgot-Password | OTP CODE',
}