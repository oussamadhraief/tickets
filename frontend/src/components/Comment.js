import axios from "axios";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Comment({ id, user, createdAt, content }) {

    const handleDeleteComment = async () => {
        await axios.delete(`/api/comments/${id}`)
        window.location.reload();
    }

  return (
    <article class="px-6 py-4 text-base rounded-lg">
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p class="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
            <img
              class="mr-2 w-6 h-6 rounded-full"
              src="/image.png"
              alt="Michael Gough"
            />
            {user}
          </p>
          <p class="text-sm text-gray-600">
            <time pubdate datetime="2022-02-08" title="February 8th, 2022">
              {new Date(createdAt).toLocaleString()}
            </time>
          </p>
        </div>
        <div className="dropdown dropdown-end bg-transparent border-0 shadow-0">
          <div
            tabIndex={0}
            role="button"
            className="btn gap-0 border-0 shadow-none hover:bg-transparent hover:border-gray-50 hover:text-zinc-900 text-zinc-700 bg-transparent font-bold"
          >
            <BsThreeDotsVertical size={18} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={handleDeleteComment}>Delete</button>
            </li>
          </ul>
        </div>
      </footer>
      <p class="text-gray-500">{content}</p>
    </article>
  );
}
