import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  //! error value
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState("");

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
  } else {
    setUsernameErr(""); // Clear error if valid
  }

  // ! Password validation
  if (password === "") {
    isValid = false;
    setPasswordErr("Password is required and cannot be left empty");
  } else if (password.length < 8) {
    isValid = false;
    setPasswordErr("Password must be at least 8 characters long");
  } else {
    setPasswordErr(""); // Clear error if valid
  }

  if (isValid) {
    try {
      const response = await axios.get(`${api}/user`);
      const users = response.data;

      // Check if username and password match
      const userExists = users.find(
        (user) => user.username === username && user.password === password
      );

      if (userExists) {
        toast.success(`Welcome ${username}!`);
        localStorage.setItem("username" , username)
        nav("/studentHome"); // Redirect to the homepage
      } else {
        toast.error("Username or Password is incorrect");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred while trying to log in. Please try again.");
    }
  } else {
    toast.error("Please fix the errors in the form before submitting.");
  }
};
  return (
    // todo : register form
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <div className=" flex flex-col gap-7 shadow-2xl rounded-2xl">
        <p className="text-3xl font-bold text-center">Login</p>
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
              Create new account <Link to="studentRegister"><span className="text-blue-800">Login</span></Link>
            </p>
          </div>
          <div>
            <ToastContainer />
            <button
              onClick={login}
              className="w-full bg-blue-500 mt-3 h-8 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
