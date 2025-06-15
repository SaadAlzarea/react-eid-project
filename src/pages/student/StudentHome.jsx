import React, { useEffect, useState } from "react";
import StudentNav from "../../components/student/StudentNav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentHome = () => {
  const [posts, setPosts] = useState([]);
  const [classname, setClassname] = useState("");
  const [newClassname, setNewClassname] = useState("");
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const API_POSTS_URL = "https://68219a2d259dad2655afc2ba.mockapi.io/post";
  const API_USERS_URL = "https://68219a2d259dad2655afc2ba.mockapi.io/user";

  const username = localStorage.getItem("username");
  const fullname = localStorage.getItem("fullname");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/student/studentLogin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch accepted posts
  useEffect(() => {
    axios
      .get(API_POSTS_URL)
      .then((response) => {
        const acceptedPosts = response.data.filter(
          (post) => post.status === "accepted"
        );
        setPosts(acceptedPosts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Fetch current student data to get classname and studentId
  useEffect(() => {
    if (!username) return;

    axios
      .get(API_USERS_URL, {
        params: { username },
      })
      .then((response) => {
        if (response.data.length > 0) {
          const student = response.data[0];
          setClassname(student.classname || "");
          setNewClassname(student.classname || "");
          setStudentId(student.id);
        }
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, [username]);

  const updateClassname = async () => {
    if (!newClassname) {
      alert("Classname cannot be empty");
      return;
    }

    try {
      await axios.put(`${API_USERS_URL}/${studentId}`, {
        classname: newClassname,
      });
      setClassname(newClassname);
      localStorage.setItem("classname", newClassname);
      alert("Classname updated successfully");
    } catch (error) {
      console.error("Failed to update classname:", error);
      alert("Failed to update classname. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNav />
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-10 bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Student {fullname}</h1>
          <p className="text-lg">
            Manage your posts, stay updated, and access resources in one place.
          </p>

          <div className="mt-6">
            <p className="mb-2">
              <strong>Classname:</strong> {classname || "Not set"}
            </p>
            <input
              type="text"
              placeholder="Enter new classname"
              value={newClassname}
              onChange={(e) => setNewClassname(e.target.value)}
              className="p-2 rounded border border-gray-300 mr-2 text-black"
            />
            <button
              onClick={updateClassname}
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
            >
             Join
            </button>
          </div>
        </div>

        <img
          src="https://img.freepik.com/free-vector/people-analyzing-growth-charts_23-2148866843.jpg?ga=GA1.1.1453594557.1745424831&semt=ais_hybrid&w=740"
          alt="Growth Chart"
          className="md:w-1/3 w-full rounded-lg shadow-lg"
        />
      </div>

      <div className="flex justify-center gap-4 my-6 px-6">
        <Link to="/student/post">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            Create a Post
          </button>
        </Link>
        <Link to="/student/myPost">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            View My Posts
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg mx-6 my-6 p-6">
        <h2 className="text-2xl font-bold mb-4">Accepted Posts</h2>
        <div className="flex flex-col gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">Posted by:</span> {post.fullname}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No accepted posts available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
