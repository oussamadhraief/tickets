import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateTicket from "./pages/CreateTicket";
import Error from "./pages/Error";
import ClientLayout from "./components/layout/ClientLayout";
import MainPage from "./pages/MainPage";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/dashboard-layout/DashboardLayout";
import Tickets from "./pages/user-dashboard/Tickets";
import TicketsSearch from "./pages/user-dashboard/TicketsSearch";
import SingleTicket from "./pages/user-dashboard/SingleTicket";
import Settings from "./pages/user-dashboard/Settings";
import Dashboard from "./pages/user-dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="ticket" element={<CreateTicket />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="stats" element={<Dashboard />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/search" element={<TicketsSearch />} />
          <Route path="ticket/:id" element={<SingleTicket />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
