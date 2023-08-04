"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Recovered = ({ email }) => {
  const router = useRouter();

  const [data, setData] = useState({
    newPassword: '',
    confirmPassword: '',
  })

  const [mutation, setMutation] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setMutation(true)

    try {
        const res = await fetch('/api/user', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password: data.newPassword })
        })

        const status = res.status;

        if (status === 200) router.push('/login?callbackSuccess')
    } catch (error) {
      console.log(error.message)
    } finally {
      setMutation(false)
    }
  };

  return (
    <div className="container max-w-[450px] flex flex-col items-center mt-16">
      <div className="w-full flex flex-col gap-10">
        <div className="flex justify-start">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Change Password
          </h2>
        </div>

        <form className="flex flex-col gap-20" onSubmit={handleChangePassword}>
          <div className="flex flex-col gap-10">
            <div>
              <label htmlFor="newPassword" className="block text-sm text-gray-900">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={data.newPassword}
                onChange={(e) => setData(() => ({...data, newPassword: e.target.value}))}
                required
                className="block w-full outline-none pt-1.5 pe-6 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6 border-b border-b-gray-200 focus:border-b-2 focus:border-b-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-gray-900">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={data.confirmPassword}
                onChange={(e) => {
                    setData(() => ({...data, confirmPassword: e.target.value}))

                    // if (data.confirmPassword !== data.newPassword) return setError('passwords must be the same')
                    // else setError("")
                }}
                required
                className={`block w-full outline-none pt-1.5 pe-6 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                  data.confirmPassword !== data.newPassword
                    ? "border-b-2 border-b-red-500"
                    : "border-b border-b-gray-200 focus:border-b-2 focus:border-b-gray-400"
                }`}
              />
              <span className="text-red-500 text-xs font-medium">
                {data.confirmPassword !== data.newPassword ? 'passwords must be the same' : null}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation || !(data.newPassword === data.confirmPassword)}
              className="flex w-full justify-center rounded-md bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed px-3 py-3 font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {mutation ? "Submit..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recovered;
