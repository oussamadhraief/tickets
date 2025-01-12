import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_base_url } from "../config"

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = form;

    axios
      .post(`${api_base_url}/api/auth/register`, { name : `${firstName} ${lastName}`, username, email, password })
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="w-full h-fit flex items-center justify-center py-40">
      <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl ">
          Create a new account
        </div>

        <div className="px-2 py-6 mt-8">
          <form onSubmit={handleSubmit}>
            
            <div className="flex gap-4 mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  id="create-account-first-name"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>
              <div className=" relative ">
                <input
                  type="text"
                  id="create-account-last-name"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  id="create-account-username"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="email"
                  id="create-account-email"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="password"
                  id="create-account-pseudo"
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex w-full my-4">
              <button
                type="submit"
                className="py-2 px-4  bg-primary hover:bg-emerald-800 focus:ring-emerald-500 focus:ring-offset-emerald-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-6">
            <span className="justify-center text-sm text-center text-gray-500 flex-items-center">
              Already have an account ?&nbsp;
              <Link
                to="/login"
                className="text-sm text-emerald-600 underline hover:text-emerald-900"
              >
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
