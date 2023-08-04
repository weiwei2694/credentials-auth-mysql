import { Recovered, Validation } from "./(components)"
import { redirect } from "next/navigation";

const RecoveredPage = ({ searchParams }) => {
    const email = searchParams?.email;

    if (!email) redirect('/accounts/reset-password');

  return (
    <div>
        {/* Validation Only */}
        <Validation />
        
        <Recovered email={email} />
    </div>
  )
}

export default RecoveredPage