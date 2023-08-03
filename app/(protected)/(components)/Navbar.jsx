"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ userImg, name }) => {
  return (
    <div className="py-3 border-b border-b-gray-200">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-6">
            {/* Image */}
            {userImg ? (
                <Image
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    width={100}
                    height={100}
                    src={userImg}
                    alt={name}
                />
            ) : (
                <div className="w-[50px] h-[50px] rounded-full bg-gray-100" />
            )}

            {/* List */}
            <ul className="flex gap-4">
                <Link href="/dashboard" className="font-medium text-sm tracking-wide text-gray-500 hover:text-gray-700 transition">Dashboard</Link>
                <Link href="/posts" className="font-medium text-sm tracking-wide text-gray-500 hover:text-gray-700 transition">Posts</Link>
            </ul>
        </div>

        {/* SignOut */}
        <button
          type="button"
          className="font-semibold bg-black text-white tracking-tight py-2 px-4 rounded"
          onClick={signOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
