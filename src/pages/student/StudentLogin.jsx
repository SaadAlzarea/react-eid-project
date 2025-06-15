import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function StudentLogin() {
  //! error value
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ! error message
  const [UsernameErr, setUsernameErr] = useState(
    "Username is required and must be at least 3 characters long."
  );
  const [passwordErr, setPasswordErr] = useState(
    "Password must be at least 8 characters long."
  );

  const nav = useNavigate();
  const api = "https://68219a2d259dad2655afc2ba.mockapi.io";

  const login = async () => {
    let isValid = true;

    // ! Username validation
    if (username === "") {
      isValid = false;
      setUsernameErr("Username is required and cannot be left empty");
    } else if (username.length < 3) {
      isValid = false;
      setUsernameErr("Username must be at least 3 characters long");
    }

    // ! Password validation
    if (password === "") {
      isValid = false;
      setPasswordErr("Password is required and cannot be left empty");
    } else if (password.length < 8) {
      isValid = false;
      setPasswordErr("Password must be at least 8 characters long");
    }

    if (isValid) {
      try {
        const response = await axios.get(`${api}/user`);
        const users = response.data;

        // Check if username and password match
        const userExists = users.find(
          (user) =>
            user.username === username &&
            user.password === password &&
            user.role === "student"
        );
        const getInfo = users.map((i) => {
          if (userExists) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("fullname", i.fullname);
            localStorage.setItem("username", username);
            localStorage.setItem("email", i.email);
            localStorage.setItem("password", i.password);
            localStorage.setItem("role", "student");
          }
        });

        if (userExists) {
          toast.success(`Welcome ${username}!`);
          localStorage.setItem("username", username);
          nav("/student/studentHome"); // Redirect to the homepage
        } else {
          toast.error("Username or Password is incorrect");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error(
          "An error occurred while trying to log in. Please try again."
        );
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };
  return (
    // todo : login form
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <div className=" flex items-center gap-7 shadow-2xl rounded-2xl bg-gray-100 ">
        <div className="flex flex-col justify-start p-3">
          <p className="text-xs font-medium">
            <span className="text-4xl font-bold">Project</span> Manager
          </p>
          <p className="text-lg font-medium ">
            <b>Student</b> Login
          </p>
        </div>
        <div className="flex flex-col gap-4 w-100 p-4">
          {/* //! login form  */}
          {/* username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border rounded-lg h-7 pl-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="text-xs text-gray-700">{UsernameErr}</span>
          </div>
          {/* password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-lg h-7 pl-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-xs text-gray-700">{passwordErr}</span>
          </div>
          <div>
            <p className="text-sm font-medium">
              Create new account{" "}
              <Link to="/student/studentRegister">
                {" "}
                <span className="text-blue-800">Register</span>
              </Link>
            </p>
          </div>
          <div>
            <ToastContainer />
            <button
              onClick={login}
              className="w-full bg-blue-500 mt-3 h-8 rounded-lg text-white  text-sm font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
