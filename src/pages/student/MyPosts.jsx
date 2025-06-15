import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentNav from "../../components/student/StudentNav";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem("username");
  const API_URL = "https://68219a2d259dad2655afc2ba.mockapi.io/post";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const filteredPosts = response.data.filter(
          (post) => post.username === username
        );
        setPosts(filteredPosts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [username]);

  return (
    <div>
      <div>
        <StudentNav />
      </div>
      <div className="flex flex-col items-center bg-gray-50 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">My Posts</h1>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {posts.map((post) => (
              <div
                key={post.id}
                className="w-full border border-gray-300 shadow-lg rounded-lg p-4 bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <p
                  className={`font-bold ${
                    post.status === "pending"
                      ? "text-yellow-500"
                      : post.status === "accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
