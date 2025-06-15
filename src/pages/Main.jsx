import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-3">
      <p className="text-4xl">This page just for fast access</p>
      <div className="flex justify-center items-center gap-5">
        <div>
          <p>username: admin</p>
          <p>password: 11111111</p>
          <Link to="admin/adminLogin">
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
              Admin login
            </button>
          </Link>
        </div>
        <div>
          <p>username: student</p>
          <p>password: 11111111</p>
          <Link to="student/studentLogin">
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
              Student login
            </button>
          </Link>
        </div>
        <div>
          <p>username: inst-1 </p>
          <p>password: 11111111</p>
          <Link to="student/studentLogin">
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
              Instructor login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
