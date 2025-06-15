import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminNav() {

  const fullname = localStorage.getItem("fullname");
  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  const logout = () => {
    toast.success("You have been logged out.", { position: "top-center" });
    localStorage.removeItem("username");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("isAuthenticated");


    navigate("/admin/AdminLogin");
  };
  return (
    <div className="h-10 bg-blue-600 text-white">
      <div className="flex justify-between items-center h-full mx-5">
        <div>
          <p className="text-xs font-medium text-black"> <span className="text-2xl font-bold">Project</span> Manager</p>
        </div>
        <ul className="flex gap-5 text-sm font-medium">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Support</li>
        </ul>
        <div>
          <div className="navbar">
            {!username ? (
              // Render Login and Register buttons if no username is found
              <div className="flex gap-3">
                <Link to="/admin/adminLogin">
                  <button className="py-1 px-3 border rounded-lg text-white">Login</button>
                </Link>
              </div>
            ) : (
              // Render Logout button if username exists
              <div className="flex justify-around items-center gap-10">
                <span>Welcome, {fullname}!</span>
                <button className="py-1 px-3 bg-red-700 rounded-lg text-white" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
