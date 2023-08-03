"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc"

const Login = ({ OAuthCallbackError }) => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [mutation, setMutation] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (OAuthCallbackError) return setError("Gmail that you use, already registered")
  }, [])

  const loginUser = async (e) => {
    e.preventDefault();

    setMutation(true);

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res.error === "CredentialsSignin")
        return setError("Invalid email or password. Please try again.");

      router.push("/dashboard");
    } finally {
      setMutation(false);
    }
  };

  return (
    <div className="container max-w-[450px] flex flex-col items-center">
      {/* Error */}
      <div className="mt-16 mb-10 w-full">
        <div className="bg-red-500 rounded py-4 px-8">
          <p className="font-medium text-white">
            {error}
          </p>
        </div>
      </div>

      {/* Credentials */}
      <div className="w-full flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Sign In
          </h2>

          <p className="text-black font-medium">
            or <span className="underline cursor-pointer" onClick={() => router.push('/register')}>Register</span>
          </p>
        </div>

        <form className="flex flex-col gap-20" onSubmit={loginUser}>
          <div className="flex flex-col gap-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                autoComplete="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                className="block w-full border-b outline-none border-b-gray-200 focus:border-b-2 focus:border-b-gray-400 pt-1.5 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                className="block w-full border-b outline-none border-b-gray-200 focus:border-b-2 focus:border-b-gray-400 pt-1.5 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation}
              className="flex w-full justify-center rounded-md bg-indigo-600 disabled:bg-indigo-800 px-3 py-3 font-medium leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {mutation ? "Login..." : "Login"}
            </button>
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className="my-16 w-full">
        <div className="relative">
          <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
            <h2 className="w-fit font-medium text-gray-500 tracking-wide p-2 bg-white">Or</h2>
          </div>

          <div className="bg-gray-200 h-[1px]" />
        </div>
      </div>


      {/* OAuth */}
      <div className="w-full font-medium text-black">
        <button type="button" onClick={() => signIn('google', { redirect: false })} className="w-full rounded py-3 px-6 border border-gray-200 flex items-center justify-center gap-5 bg-white hover:bg-gray-50 transition active:bg-gray-100">
          <FcGoogle/>
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
