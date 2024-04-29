import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { IoEyeOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getTickets = () => {
      axios.get("/api/tickets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        setTickets(res.data.tickets);
      });
    };
    getTickets();
  }, []);

  const handleSearchTickets = (e) => {
    e.preventDefault();

    navigate(`/dashboard/tickets/search?query=${search}`);
  };

  const handleStatusChange = (ticket) => {
    const newStatus = ticket.status === "Pending" ? "In progress" : "Resolved";
    axios
      .put(`/api/tickets/status/${ticket._id}`, { status: newStatus })
      .then((res) => {
        setTickets(
          tickets.map((item) =>
            item._id === ticket._id ? { ...item, status: newStatus } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleDeleteTicket = (ticketId) => {
    axios
      .delete(`/api/tickets/${ticketId}`)
      .then((res) => {
        setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
  };

  return (
    <main className="flex-1 overflow-x-hidden bg-gray-200 transition duration-200">
      <div className="container lg:max-w-[1280px] mx-auto px-6 py-8">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-primary text-2xl font-medium">
            Submitted Tickets
          </h3>
          <form onSubmit={handleSearchTickets}>
            <label className="bg-white border px-3 py-1 rounded-md h-9 border-primary/70 overflow-hidden flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none h-9 placeholder:text-primary text-sm focus-within:border-white border-white"
                placeholder="Search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </form>
        </div>
        <div className="mt-8">
          <div className="flex flex-col">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <tbody className="bg-white">
                    {tickets.map((item) => (
                      <tr key={item._id} className="h-28">
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <p className="font-bold">#{item._id}</p>
                            <p className="text-xs text-gray-500">
                              Support Ticket No
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <p className="font-bold">{item.user?.name}</p>
                            <p className="text-xs text-gray-500">
                              Request Submitter
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <p className="font-bold">{item.type}</p>
                            <p className="text-xs text-gray-500">Ticket Type</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <p className="font-bold">{item.subject}</p>
                            <p className="text-xs text-gray-500">
                              Ticket Subject
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <p className="font-bold">
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">Date</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 whitespace-nowrap">
                            <p
                              className={`inline-flex text-xs leading-5 font-bold rounded-full px-2 py-0.5 ${
                                item.status === "Resolved" &&
                                "text-green-500 bg-green-500/20"
                              } ${
                                item.status === "In progress" &&
                                "text-sky-500 bg-sky-500/20"
                              } ${
                                item.status === "Pending" &&
                                "text-yellow-500 bg-yellow-500/20"
                              }`}
                            >
                              {item.status}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 leading-5 font-medium">
                          <div className="flex items-center">
                            <Link
                              to={`/dashboard/ticket/${item._id}`}
                              className="text-zinc-700 hover:text-white text-xs px-1 py-0.5 font-medium hover:bg-zinc-700 rounded-md border border-zinc-600"
                            >
                              view
                            </Link>
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
                                {!(item.status == "Resolved") && (
                                  <li>
                                    <button
                                      onClick={() => handleStatusChange(item)}
                                    >
                                      Set status to&nbsp;
                                      {item.status === "Pending"
                                        ? "In progress"
                                        : "Resolved"}
                                    </button>
                                  </li>
                                )}
                                <li>
                                  <button
                                    onClick={() => handleDeleteTicket(item._id)}
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
