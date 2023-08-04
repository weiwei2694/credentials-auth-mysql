"use client"
import { useOtp } from "@/context/resetPassword"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Loading } from "@/components"

const Validation = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(true);
    const currentPage = useOtp(state => state.currentPage)

    const checkOtp = () => {
        if (currentPage !== 'recovered') return router.push('/accounts/reset-password');
        setLoading(false);
    }

    useEffect(() => {
        checkOtp();
    }, [])

    return loading ? <Loading /> : null;
}

export default Validation