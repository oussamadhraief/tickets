import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TicketsSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        axios
          .get(`/api/tickets/search?query=${query}`)
          .then((response) => {
            setTickets(response.data.tickets);
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
          });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      setSearch(query);
      fetchSearchResults();
    }
  }, [query]);

  const handleSearchTickets = (e) => {
    e.preventDefault();

    navigate(`/dashboard/tickets/search?query=${search}`);
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 transition duration-200">
      <div className="container lg:max-w-[1280px] mx-auto px-6 py-8">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-primary text-2xl font-medium">
            Submitted Tickets
          </h3>
          <form
            onSubmit={handleSearchTickets}
            className="bg-white border px-3 py-1 rounded-md h-9 border-primary/70 overflow-hidden flex items-center gap-2"
          >
            <label>
              <input
                type="text"
                className="grow outline-none h-9 placeholder:text-primary text-sm focus-within:border-white border-white"
                placeholder="Search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button type="submit" onClick={handleSearchTickets}>
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
          </form>
        </div>
        <div className="mt-8">
          <div className="flex flex-col">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <tbody className="bg-white">
                    {tickets.map((item) => (
                      <tr className="h-28">
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <p className="font-bold">#{item._id}</p>
                            <p className="text-xs text-gray-500">
                              Support Ticket No
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            <p className="font-bold">{item.name}</p>
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
                          <div className="text-sm leading-5 text-gray-900">
                            <p className="inline-flex text-xs leading-5 font-bold rounded-full text-green-500">
                              resolved
                            </p>
                            <p className="text-xs text-gray-500">Status</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                          <Link
                            to={`/dashboard/ticket/${item._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </Link>
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
