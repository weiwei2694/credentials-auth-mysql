import { VerifyOtp, Validation } from "./(components)"
import { isEmailValid } from "@/lib/email";
import { redirect } from "next/navigation";

const VerifyOtpPage = ({ searchParams }) => {
    const email = searchParams?.email;

    if (!email) redirect('/accounts/reset-password');

    if (!isEmailValid(email)) redirect('/accounts/reset-password');
  return (
    <div>
        {/* Only Validation */}
        <Validation />

        <VerifyOtp email={email} />
    </div>
  )
}

export default VerifyOtpPage