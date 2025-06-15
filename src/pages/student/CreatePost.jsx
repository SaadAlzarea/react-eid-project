import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentNav from "../../components/student/StudentNav";

const CreatePost = () => {
  const username = localStorage.getItem("username");
  const fullname = localStorage.getItem("fullname");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const nav = useNavigate();

  const API_URL = "https://68219a2d259dad2655afc2ba.mockapi.io";

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await axios.post(`${API_URL}/post`, {
        username: username,
        fullname: fullname,
        title,
        content: description,
        status: "pending",
      });
      alert("Post submitted successfully!");
      nav("/student/studentHome");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <StudentNav/>
      </div>
      <div className="flex justify-center items-center bg-gray-50 min-h-screen min-w-screen">
        <div className="flex justify-center items-center h-full w-full">
          <form
            onSubmit={submit}
            className="flex flex-col gap-2 shadow-2xl rounded-lg w-100 p-3"
          >
            <p className="text-lg font-medium text-center">New Post</p>
            <div>
              <p className="text-sm font-medium">Title</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus:outline-none w-full border border-gray-400 rounded-lg p-1 mt-1"
                placeholder="Enter title"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="focus:outline-none w-full h-24 border border-gray-400 rounded-lg p-1 mt-1"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="text-sm font-medium bg-blue-500 text-white w-full h-8 rounded-lg"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
