"use client"
import { useOtp } from "@/context/resetPassword"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Loading } from "@/components"

const Validation = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(true);
    const validOtp = useOtp(state => state.validOtp)

    const checkOtp = () => {
        if (validOtp === false) return router.push('/accounts/reset-password');

        setLoading(false);
    }

    useEffect(() => {
        checkOtp();
    }, [])

    return loading ? <Loading /> : null;
}

export default Validation