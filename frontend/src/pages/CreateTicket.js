import { useState } from "react";
import axios from "axios";

export default function CreateTicket() {
  const [form, setForm] = useState({
    type: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "/api/tickets",
        {
          ...form,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => setForm({ type: "", subject: "", message: "" }));
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 pb-32 pt-20 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-emerald-900">
            Create your ticket
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Explain your problem and include as many details as possible.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form className="flex flex-wrap -m-2" onSubmit={handleSubmit}>
            <div className="p-2 w-full">
              <label htmlFor="type" className="leading-7 text-sm text-gray-600">
                Ticket type
              </label>
              <select
                id="type"
                name="type"
                className="bg-gray-50 border border-gray-300 ring-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 outline-none block w-full p-2.5"
                value={form.type}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="billing">Billing</option>
                <option value="damaged">Damaged product(s)</option>
                <option value="missing">Missing items</option>
                <option value="late">Order not yet received</option>
                <option value="wrong">Received wrong order/items</option>
                <option value="credentials">Forgot credentials</option>
                <option value="login">Unable to connect to account</option>
                <option value="register">Unable to create account</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="subject"
                  className="leading-7 text-sm text-gray-600"
                >
                  Subject
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  id="subject"
                  name="subject"
                  value={form.subject}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  value={form.message}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-emerald-800 rounded text-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
