"use client"
import { useState, useEffect } from "react"
import { useOtp } from "@/context/resetPassword";
import { useRouter } from "next/navigation";
import { Loading } from "@/components";

const Validation = ({ email }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const otp = useOtp(state => state.otp)

    const checkOtpState = () => {
        if (!otp.otp || !email || !otp.expired) return router.push('/accounts/reset-password');
        if (email !== otp.email) return router.push('/accounts/reset-password');

        setLoading(false)
    }

    useEffect(() => {
        checkOtpState();
    }, [])

  return loading ? <Loading /> : null;
}

export default Validation