import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from '../../contexts/UserContext'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import axios from "axios";
import DashboardNavbar from "./DashboardNavbar";
import { CiSettings } from "react-icons/ci";

export default function DashboardLayout() {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)");
    if (mql.matches) {
      setIsOpen(false);
    }

    const getTickets = () => {
      axios.get("/api/tickets").then((res) => {
        {
          setTickets(res.data.tickets);
        }
      });
    };
    getTickets();
  }, []);


  return (
    <UserProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="w-full flex-1 flex flex-col overflow-hidden">
          
          <DashboardNavbar setIsOpen={setIsOpen} />

          <div className="flex w-full full-height-dashboard">
            <div
              className={`bg-white  ${
                isOpen ? "w-64 px-2" : "w-0 px-0"
              } space-y-6 pb-7 transition-[width] duration-200 ease-in-out shrink-0`}
            >
              <nav className="bg-white">
                <Link
                  to='/dashboard/stats'
                  className={`${
                    isOpen ? "opacity-100" : "opacity-0"
                  }  transition-all flex items-center gap-2 font-bold text-sm py-2.5 px-4 rounded duration-200 text-primary hover:bg-emerald-800 hover:text-white whitespace-nowrap`}
                >
                  <LuLayoutDashboard size={17} /> Dashboard
                </Link>
                <Link
                  to="/dashboard/tickets"
                  className={`${
                    isOpen ? "opacity-100" : "opacity-0"
                  } transition-all flex items-center gap-2 font-bold text-sm py-2.5 px-4 rounded duration-200 text-primary hover:bg-emerald-800 hover:text-white whitespace-nowrap`}
                >
                  <IoTicketOutline size={18} /> Submitted Tickets
                </Link>
                <a
                  href="#"
                  className={`${
                    isOpen ? "opacity-100" : "opacity-0"
                  } transition-all flex items-center gap-2 font-bold text-sm py-2.5 px-4 rounded duration-200 text-primary hover:bg-emerald-800 hover:text-white whitespace-nowrap`}
                >
                  Profile
                </a>
                <Link
                  to="/dashboard/settings"
                  className={`${
                    isOpen ? "opacity-100" : "opacity-0"
                  } transition-all flex items-center gap-2 font-bold text-sm py-2.5 px-4 rounded duration-200 text-primary hover:bg-emerald-800 hover:text-white whitespace-nowrap`}
                >
                 <CiSettings size={20} /> Settings
                </Link>
              </nav>
            </div>

           <Outlet />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
