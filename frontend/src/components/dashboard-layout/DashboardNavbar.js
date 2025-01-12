import React from "react";
import { useUser } from "../../contexts/UserContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardNavbar({ setIsOpen }) {
  const navigate = useNavigate();

  const { user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center py-2 px-6 bg-white">
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-primary focus:outline-none text-2xl"
        >
          <IoMdMenu />
        </button>
      </div>

      <div className="flex w-32">
        <div>
          <Link
            to="/"
            className="flex items-center text-sky-700 hover:text-sky-900"
            rel="noreferrer"
          >
            <span className="font-bold ml-1">
              <img src="/logo.png" alt="" />
            </span>
          </Link>
        </div>
      </div>

      <div className="flex items-center text-primary">
        <div className="dropdown bg-transparent border-0 shadow-0 text-primary">
          <div
            tabIndex={0}
            role="button"
            className="btn gap-0 border-0 shadow-none hover:bg-transparent hover:border-gray-50 text-primary bg-transparent font-bold"
          >
            <p className="text-base">
              <FaRegUser />
            </p> &nbsp;&nbsp;
            {user.name} <RiArrowDropDownLine size={30} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
