import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { toast } from 'react-toastify';
import useReactApi from "../../hooks/useReactApi/useReactApi";

const AdminNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [admin, setAdmin] = useState({});
  const [error, setError] = useState(null);

  const {  loading, fetchData } = useReactApi();

  const fetchAdmin = async () => {
    try {
      const { data, error} = await fetchData("/api/v1/admin/getAdmin");
      
      if(error) {
        console.log("Error => ", error);
        toast.error(error);
        setError(error);
        return;
      }

      setAdmin(data?.data);
    } 
    catch (error) {
      console.error("Error fetching admin:", error);
    }
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {

    fetchAdmin();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sidebar = [
    { name: "Dashboard", icon: "dashboard", path: "/admin/dashboard" },
    { name: "Profile", icon: "person", path: "/admin/profile" },
    { name: "Users", icon: "group", path: "/admin/users" },
    { name: "Block/Unblock User", icon: "block", path: "/admin/block-user" },
    { name: "Events", icon: "event", path: "/admin/events" },
    { name: "Block/Unblock Events", icon: "event_busy", path: "/admin/block-events" },
    { name: "Calendar", icon: "calendar_today", path: "/admin/calendar" },
    { name: "Send Notice", icon: "announcement", path: "/admin/send-notice" },
    { name: "Settings", icon: "settings", path: "/admin/settings" },
    { name: "FAQ", icon: "help_outline", path: "/admin/faq" },
  ];

  const logoutHandler = () => {
    localStorage.removeItem("eventAdmin");
    window.location.href = "/";
  }

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 bg-gray-900 px-4">
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button onClick={toggleSidebar} className="text-white p-2 rounded hover:bg-gray-700">
            <span className="text-xl material-icons">close</span>
          </button>
        </div>

        {/* Sidebar Content */}
        <nav className="mt-4">
          <ul>
            {sidebar.map((item) => (
              <li key={item.name} className="px-4 py-2 hover:bg-gray-700 cursor-pointer ">
                <Link to={item.path} className="flex items-center space-x-2">
                  <span className="material-icons">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800 text-white">
          <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-700">
            <span className="material-icons">menu</span>
          </button>
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded hover:bg-gray-700">
              <span className="material-icons">notifications</span>
            </button>
            {/* Profile Section */}
            <div className="flex items-center space-x-2">
              <span className="material-icons">account_circle</span>
              <Link to="/admin/profile" className="text-white hover:underline">{admin?.adminFullName}</Link>
            </div>

             {/* Logout Section */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded hover:bg-gray-700"
                onClick={() => logoutHandler()}
              >
                <span className="material-icons">logout</span>
              </button>
            </div>

          </div>

         
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
