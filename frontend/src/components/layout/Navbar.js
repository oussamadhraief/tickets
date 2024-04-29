import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between">
        <div className="flex space-x-4 w-36">
          <div>
            <Link
              to="/"
              className="flex items-center py-5 px-2 text-sky-700 hover:text-sky-900"
              rel="noreferrer"
            >
              <span className="font-bold ml-1">
                <img src="/logo.png" alt="" />
              </span>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-primary font-bold text-sm">
          <Link to="/" className="py-5 px-3" rel="noreferrer">
            Home
          </Link>
          <Link to={user ? "/ticket" : 'login'} className="py-5 px-3">
            Create
          </Link>
          {/* <a href="#" className="py-5 px-3 text-lg" rel="noreferrer"><LuUser /></a> */}
          {user ? (
            <div className="dropdown bg-transparent border-0 shadow-0 text-primary">
              <div tabIndex={0} role="button" className="btn gap-0 m-1 border-0 shadow-none hover:bg-transparent hover:border-gray-50 text-primary bg-transparent font-bold">
                {user.name} <RiArrowDropDownLine  size={30} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="dashboard/stats">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="py-5 px-3">
                Login
              </Link>
              <Link
                to="/register"
                className="py-2 px-5 bg-primary rounded-md text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
