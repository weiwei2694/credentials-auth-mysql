"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [mutation, setMutation] = useState(false);
  const [error, setError] = useState("");

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
    <div className="container flex justify-center">
      <div className="w-full max-w-[450px] mt-16 flex flex-col gap-10">
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
    </div>
  );
};

export default Login;
