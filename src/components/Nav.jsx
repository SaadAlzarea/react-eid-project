import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Nav() {

//   const [user, setInfo] = useState([]);
  const username = localStorage.getItem("fullname");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    navigate("/login");
  };
  return (
    <div className="h-10 bg-blue-600">
      <div className="flex justify-around items-center h-full">
        <div>
          <p className="text-xs font-medium"> <span className="text-2xl font-bold">Project</span> Manager</p>
        </div>
        <ul className="flex gap-3 text-sm font-medium">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Support</li>
        </ul>
        <div>
          <div className="navbar">
            {!username ? (
              // Render Login and Register buttons if no username is found
              <div>
                <Link to="login">
                  <button>Login</button>
                </Link>
                <Link to="register">
                  <button>Register</button>
                </Link>
              </div>
            ) : (
              // Render Logout button if username exists
              <div>
                <span>Welcome, {fullname}!</span>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
