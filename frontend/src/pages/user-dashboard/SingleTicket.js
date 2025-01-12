import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import Comment from "../../components/Comment";

export default function SingleTicket() {
  const navigate = useNavigate()
  const { id } = useParams();

  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    type: "",
    subject: "",
    message: "",
    user: null,
  });
  const [tickets, setTickets] = useState([]);
  const [showTickets, setShowTickets] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      const getData = () => {
        const token = localStorage.getItem("token");
        Promise.all([
          axios.get(`/api/tickets/${id}`),
          axios.get(`/api/tickets/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`/api/comments/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ])
          .then((response) => {
            setTicket(response[0].data.ticket);
            setTickets(response[1].data.tickets);
            setComments(response[2].data.comments);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getData();
    }
  }, [id]);

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/comments/${id}`,
        { content: comment, status: ticket.status, submitter: ticket.user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatusChange = () => {
    const newStatus = ticket.status === "Pending" ? "In progress" : "Resolved";
    axios
      .put(`/api/tickets/status/${ticket._id}`, { status: newStatus })
      .then((res) => {
        setTicket(prev => {
          return { 
          ...prev, 
          status: newStatus 
        }});
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleDeleteTicket = () => {
    axios
      .delete(`/api/tickets/${ticket._id}`, )
      .then((res) => {
        navigate('/dashboard/tickets')
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 transition duration-200">
      <div className="w-full flex flex-col items-center align-middle overflow-hidden sm:rounded-lg border-b border-gray-200 py-14">
        <div className="w-11/12 mx-auto flex items-center border-b border-gray-400">
          <Link
            to="/dashboard/tickets"
            className="px-10 py-3 border-r border-transparent hover:border-gray-200 text-primary flex items-center gap-2 hover:rounded-t-md hover:underline"
          >
            <FaArrowLeftLong />{" "}
            <span className="font-bold text-sm"> All tickets</span>
          </Link>
          <Link
            to="#"
            className="px-3 py-2.5 font-medium rounded-t-md bg-primary text-white"
          >
            REF#{ticket._id}
          </Link>
        </div>
        <div className="w-full max-w-[1280px]">
          <div className="w-full flex items-center justify-between mt-8">
            <h1 className="text-lg font-bold">Ticket Ref: {ticket._id}</h1>
            <div className="relative flex items-center gap-2">
              <p
                className={`inline-flex text-xs leading-5 font-bold rounded-full px-2 py-0.5 ${
                  ticket.status === "Resolved" &&
                  "text-green-500 bg-green-500/20"
                } ${
                  ticket.status === "In progress" &&
                  "text-sky-500 bg-sky-500/20"
                } ${
                  ticket.status === "Pending" &&
                  "text-yellow-500 bg-yellow-500/20"
                }`}
              >
                {ticket.status}
              </p>
              <div className="dropdown dropdown-end bg-transparent border-0 shadow-0 text-primary">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn gap-0 border-0 shadow-none hover:bg-transparent hover:border-gray-50 text-primary bg-transparent font-bold"
                >
                  <BsThreeDotsVertical size={18} />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {!(ticket.status == "Resolved") && (
                    <li>
                      <button onClick={() => handleStatusChange()}>
                        Set status to&nbsp;
                        {ticket.status === "Pending"
                          ? "In progress"
                          : "Resolved"}
                      </button>
                    </li>
                  )}
                  <li>
                    <button onClick={handleDeleteTicket}>Delete</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-between gap-5 mt-8">
            <div>
              <h2 className="font-bold text-xl mb-6">Ticket Details</h2>
              <div className="flex items-start flex-nowrap gap-2 text-sm">
                <p className="font-bold">Date:</p>
                <p>{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-start flex-nowrap gap-2 text-sm mt-3">
                <p className="font-bold">Subject:</p>
                <p>{ticket.subject}</p>
              </div>
              <div className="flex items-start flex-nowrap gap-2 text-sm mt-3">
                <p className="font-bold">Message:</p>
                <p>{ticket.message}</p>
              </div>
            </div>
            <div className="p-5 max-h-[320px] rounded-lg shadow-form border border-gray-300 bg-gray-300">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10">
                    <img src="/image.png" alt="" />
                  </div>
                  <div className="text-sm">
                    <h2 className="font-bold">{ticket.user?.name}</h2>
                    <p>{ticket.user?.email}</p>
                  </div>
                </div>
                <div className="text-sm whitespace-nowrap">
                  <h4 className="font-bold text-base">Contact Information</h4>
                  <div className="w-full flex flex-nowrap gap-2 mt-2">
                    <div className="font-bold text-sm">
                      <p>Requester ID</p>
                      <p>Email</p>
                      {ticket?.user?.phone && <p>Phone</p>}
                    </div>
                    <div className="w-fit">
                      <p className="overflow-hidden text-ellipsis">
                        {ticket?.user?.username}
                      </p>
                      <p className="overflow-hidden text-ellipsis">
                        {ticket.user?.email}
                      </p>
                      {ticket?.user?.phone && (
                        <p className="overflow-hidden text-ellipsis">
                          {ticket?.user?.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm whitespace-nowrap">
                  <h4 className="font-bold text-base">Other details</h4>
                  <div className="w-full flex flex-nowrap gap-2 mt-2">
                    <div className="font-bold text-sm">
                      {ticket?.user?.address && <p>Address</p>}
                      {ticket?.user?.country && <p>Country</p>}
                      <p>Contact method</p>
                    </div>
                    <div className="w-fit">
                      {ticket?.user?.address && (
                        <p className="overflow-hidden text-ellipsis">
                          {ticket?.user?.address}
                        </p>
                      )}
                      {ticket?.user?.country && (
                        <p className="overflow-hidden text-ellipsis">
                          {ticket?.user?.country}
                        </p>
                      )}
                      <p className="overflow-hidden text-ellipsis">
                        {ticket?.user?.method === "email" ? "Email" : "Phone"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="w-full my-10 py-10">
          <div className="max-w-[1280px] mx-auto ">
            <form
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <h2 className="font-bold text-lg">
                Conversation ({comments.length})
              </h2>
              {ticket.status === "Resolved" && (
                <p className="flex items-center gap-2 my-3">
                  This ticket is marked as resolved.{" "}
                  <span className="text-green-500">
                    <FaCheck />
                  </span>{" "}
                </p>
              )}
              <textarea
                rows="5"
                cols="50"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="outline-none border border-gray-300 w-full disabled:h-28 h-44 p-2 text-sm bg-gray-50 border-none rounded-md disabled:bg-gray-300/70"
                disabled={ticket.status === "Resolved"}
                placeholder="Submit a response... "
              />
              <button
                type="submit"
                disabled={ticket.status === "Resolved"}
                className="bg-primary rounded-md px-6 py-2 text-white self-end disabled:bg-zinc-600/50"
              >
                Respond
              </button>
            </form>
            <div className="w-full">
              {comments.map((item) => (
                <Comment
                  id={item._id}
                  user={item.user.name}
                  createdAt={item.createdAt}
                  content={item.content}
                />
              ))}
            </div>
          </div>
        </section>
        {tickets.length > 0 && (
          <div className="container lg:max-w-[1280px] mx-auto py-10">
            <button
              className="text-primary text-lg font-medium w-full flex items-center justify-between"
              onClick={() => setShowTickets((prev) => !prev)}
            >
              <p> Other tickets submitted by {ticket?.user?.name}</p>
              <MdKeyboardArrowDown
                size={30}
                className={showTickets && "rotate-180"}
              />
            </button>
            <div
              className={
                !showTickets
                  ? "max-h-0 transition-all overflow-hidden durat"
                  : "mt-5 max-h-[2000px] transition-all overflow-hidden durat"
              }
            >
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
                                <p className="text-xs text-gray-500">
                                  Ticket Type
                                </p>
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
                              <div className="text-sm leading-5 text-gray-900 whitespace-nowrap">
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
                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                              <Link
                                to={`/dashboard/tickets/${item._id}`}
                                className="text-zinc-700 hover:text-white text-xs px-1 py-0.5 font-medium hover:bg-zinc-700 rounded-md border border-zinc-600"
                              >
                                view
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
        )}
      </div>
    </main>
  );
}
