"use client";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="py-3 border-b border-b-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Image */}
        <div className="w-[60px] h-[60px] rounded-full bg-gray-100" />

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
