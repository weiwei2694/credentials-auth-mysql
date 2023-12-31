"use client"
import { useState, useEffect } from "react"
import { useOtp } from "@/context/resetPassword";
import { useRouter } from "next/navigation";
import { Loading } from "@/components";

const Validation = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const currentPage = useOtp(state => state.currentPage)

    const checkOtpState = () => {
        if (currentPage !== 'verify-otp') router.push('/accounts/reset-password');
        setLoading(false)
    }

    useEffect(() => {
        checkOtpState();
    }, [])

  return loading ? <Loading /> : null;
}

export default Validation