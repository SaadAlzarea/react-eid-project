import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../components/admin/AdminNav";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const API_URL = "https://68219a2d259dad2655afc2ba.mockapi.io/post";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? { ...post, status } : post))
      );
      alert(`Post ${status === "accepted" ? "accepted" : "rejected"}!`);
    } catch (error) {
      console.error("Error updating post status:", error);
      alert("Failed to update post status. Please try again.");
    }
  };

  return (
    <div>
        <div>
            <AdminNav/>
        </div>
      <div className="flex flex-col items-center bg-gray-50 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Student Posts</h1>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-4 w-full max-w-3xl">
            {posts.map((post) => (
              <div
                key={post.id}
                className="w-full border border-gray-300 shadow-lg rounded-lg p-4 bg-white"
              >
                <p className="text-gray-700 mb-2">
                  <span className="text-lg font-bold">Posted by:</span>{" "}
                  {post.fullname}
                </p>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.content}</p>
                <p
                  className={`font-bold mb-4 ${
                    post.status === "pending"
                      ? "text-gray-500"
                      : post.status === "accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status:{" "}
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </p>
                {post.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(post.id, "accepted")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(post.id, "rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPosts;
