"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AiOutlineExclamationCircle } from "react-icons/ai";

const Register = () => {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [mutation, setMutation] = useState(false);
  const [error, setError] = useState("")

  const registerUser = async (e) => {
    e.preventDefault();

    setMutation(true)
    setError("")

    try {
      const req = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const userInfo = await req.json();

      if (userInfo) router.push("/login");
    } catch (error) {
      const regex = /"(.*?)"/;
      const match = error.message.match(regex);
      if (match) setError(match[1])
    } finally {
      setMutation(false);
    }
  };
  return (
    <div className="container max-w-[450px] flex justify-center">
      <div className="w-full mt-16 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Sign Up
          </h2>

          <p className="text-black font-medium">
            or{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>

        <form className="flex flex-col gap-20" onSubmit={registerUser}>
          <div className="flex flex-col gap-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                  className="block w-full border-b outline-none border-b-gray-200 focus:border-b-2 focus:border-b-gray-400 pt-1.5 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm text-gray-900">
                Email
              </label>
              <div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    autoComplete="email"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                    className={`block w-full outline-none pt-1.5 pe-6 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6 ${error ? "border-b-2 border-b-red-500" : "border-b border-b-gray-200 focus:border-b-2 focus:border-b-gray-400"}`}
                  />

                  {error && (
                    <span className="absolute top-0 right-0 text-red-500">
                      <AiOutlineExclamationCircle />
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-red-500">
                  {error}
                </span>
              </div>
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
              {mutation ? "Register..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;