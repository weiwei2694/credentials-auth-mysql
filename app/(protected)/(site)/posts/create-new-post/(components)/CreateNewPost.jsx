"use client";
import { useState } from "react";

import { IoMdCreate } from "react-icons/io";

const CreateNewPost = ({ userId }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    userId,
  });

  async function action() {} //temporary
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Heading */}
      <div className="flex justify-start">
        <h2 className="text-2xl font-bold tracking-tight text-black">
          Create New Post
        </h2>
      </div>

      {/* Form */}
      <form action={action} className="flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <div>
            <label htmlFor="title" className="block text-sm text-gray-900">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              required
              className="block w-full border-b outline-none border-b-gray-200 focus:border-b-2 focus:border-b-gray-400 pt-1.5 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            <div className="flex justify-end">
              <p
                className={`font-medium ${
                  data.title.length > 60 ? "text-red-500" : "text-black"
                } text-xs mt-1 tracking-wider`}
              >
                {data.title.length}/60
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="description"
                className="block text-sm leading-6 text-gray-900"
              >
                Description
              </label>
            </div>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              required
              rows="10"
              className="block w-full border-b outline-none border-b-gray-200 focus:border-b-2 focus:border-b-gray-400 pt-1.5 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            <div className="flex justify-end">
              <p
                className={`font-medium ${
                  data.description.length > 612 ? "text-red-500" : "text-black"
                } text-xs mt-1 tracking-wider`}
              >
                {data.description.length}/612
              </p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="flex w-full justify-center items-center gap-3 rounded p-3 text-white font-medium bg-black leading-6"
          >
            Create
            <IoMdCreate />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPost;
