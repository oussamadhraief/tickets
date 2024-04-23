import { Outlet } from "react-router-dom";
import React from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";
import { UserProvider } from "../../contexts/UserContext";

export default function ClientLayout() {
  return (
    <UserProvider>
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </UserProvider>


  )
}
