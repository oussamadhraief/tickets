import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";
import { api_base_url } from "../../config"
export default function Settings() {
  const { user } = useUser();

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    country: "",
    phone: "",
    method: "email",
    language: "",
    address: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        username: user.username,
        email: user.email,
        country: user.country,
        phone: user.phone,
        method: user.method,
        language: user.language,
        address: user.address,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .patch(`${api_base_url}/api/auth/user`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {});
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .patch(`${api_base_url}/api/auth/user/security`, passwordForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPasswordForm({
            password: "",
            newPassword: "",
            newPasswordConfirmation: "",
          })
      });
  };
  return (
    <section className="w-full h-full p-14 bg-gray-200 text-gray-900">
      <form
        onSubmit={handleSubmit}
        className="container max-w-[1280px] flex flex-col mx-auto space-y-12"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-100">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Personal Inormation</p>
            <p className="text-xs">
              Update all of your personal information (name, phone, email...)!
            </p>
          </div>
          <div className="grid grid-cols-6 gap-x-4 gap-y-7 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-md focus:ring-2 h-10 px-1 focus:ring-opacity-75 text-gray-800 focus:ring-emerald-600 border-gray-300 outline-none text-sm"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded-md focus:ring-2 h-10 px-1 focus:ring-opacity-75 text-gray-800 focus:ring-emerald-600 border-gray-300 outline-none text-sm"
              />
            </div>
            <div className="col-span-3">
              <label htmlFor="phone" className="text-sm">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-md focus:ring-2 h-10 px-1 focus:ring-opacity-75 text-gray-800 focus:ring-emerald-600 border-gray-300 outline-none text-sm"
              />
            </div>
            <div className="col-span-3">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md focus:ring-2 h-10 px-1 focus:ring-opacity-75 text-gray-800 focus:ring-emerald-600 border-gray-300 outline-none text-sm"
              />
            </div>
            <div className="col-span-3">
              <label htmlFor="method" className="text-sm">
                Preferred contact method
              </label>
              <select
                id="method"
                name="method"
                value={form.method}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 ring-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 outline-none block w-full h-10 px-1"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
            </div>
            <div className="col-span-3">
              <label htmlFor="language" className="text-sm">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={form.language}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 ring-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 outline-none block w-full h-10 px-1"
              >
                <option value="">Select an option</option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
              </select>
            </div>
            <div className="col-span-3">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-md focus:ring-2 h-10 px-1 focus:ring-opacity-75 text-gray-800 focus:ring-emerald-600 border-gray-300 outline-none text-sm"
              />
            </div>
            <div className="col-span-3">
              <label htmlFor="country" className="text-sm">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 ring-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 outline-none block w-full h-10 px-1"
              >
                <option value="">Select an option</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Brazil">Brazil</option>
                <option value="China">China</option>
                <option value="DR Congo">DR Congo</option>
                <option value="Egypt">Egypt</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Japan">Japan</option>
                <option value="Mexico">Mexico</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Philippines">Philippines</option>
                <option value="Russia">Russia</option>
                <option value="Thailand">Thailand</option>
                <option value="Turkey">Turkey</option>
                <option value="Tunisia">Tunisia</option>
                <option value="United States">United States</option>
                <option value="Vietnam">Vietnam</option>
              </select>
            </div>

            <div className="col-span-5"></div>
            <button className="col-span-1 mt-5 bg-primary text-white rounded-md py-2 hover:bg-emerald-800">
              Save
            </button>
          </div>
        </fieldset>
      </form>
      <form className="container max-w-[1280px] flex flex-col mx-auto space-y-12 mt-6" onSubmit={handlePasswordSubmit}>
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-100">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Security</p>
            <p className="text-xs">
              Update your password, make it hard to guess!
            </p>
          </div>
          <div className="grid grid-cols-6 gap-x-4 gap-y-7 col-span-full lg:col-span-3">
            <div className="col-span-full">
              <label htmlFor="password" className="text-sm">
                Current password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Current password"
                value={passwordForm.password}
                onChange={handlePasswordChange}
                className="w-full rounded-md focus:ring-2 h-10 px-1 focus:ring-opacity-75 text-gray-800 focus:ring-emerald-600 border-gray-300 outline-none text-sm"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="newPassword" className="text-sm">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-md focus:ring-2 h-10 px-1 focus:ring-opacity-75 text-gray-800 focus:ring-emerald-600 border-gray-300 outline-none text-sm"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="newPasswordConfirmation" className="text-sm">
                Confirm New Password
              </label>
              <input
                id="newPasswordConfirmation"
                name="newPasswordConfirmation"
                type="password"
                placeholder="Confirm New Password"
                value={passwordForm.newPasswordConfirmation}
                onChange={handlePasswordChange}
                className="w-full rounded-md focus:ring-2 h-10 px-1 focus:ring-opacity-75 text-gray-800 focus:ring-emerald-600 border-gray-300 outline-none text-sm"
              />
            </div>
            <div className="col-span-5"></div>
            <button className="col-span-1 mt-5 bg-primary text-white rounded-md py-2 hover:bg-emerald-800">
              Save
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
