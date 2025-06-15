import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";

function AdminHome() {
  let name = localStorage.getItem("fullname");
  let username = localStorage.getItem("username");
  let email = localStorage.getItem("email");

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("admin/adminLogin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white">
        <AdminNav/>
      </div>

      <div className="flex flex-col items-center justify-center py-10 px-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 lg:w-1/2">
          <h2 className="text-2xl font-bold text-center mb-4">
            Admin Information
          </h2>
          <div className="text-lg">
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Username:</span> {username}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {email}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-8 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-200">
            User Settings
          </h2>

          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <p className="text-lg font-semibold">Student Settings</p>
            <div className="flex gap-4">
              <Link to="/admin/adminHome/studentList">
                <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Student List
                </button>
              </Link>
              <Link to="/admin/adminPost">
                <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Student Posts
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-between items-center p-4">
            <p className="text-lg font-semibold">Instructor Settings</p>
            <div>
              <Link to="instructorList">
                <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Instructor List
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
