import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InstNav from "../../components/instructor/InstNav";

const InstructorHome = () => {
  const [classname, setClassname] = useState("");
  const [newClassname, setNewClassname] = useState("");
  const [instructorId, setInstructorId] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const username = localStorage.getItem("username");
  const fullname = localStorage.getItem("fullname");
  const API_USERS_URL = "https://68219a2d259dad2655afc2ba.mockapi.io/user"; // Replace with your actual API URL

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/instructor/instructorLogin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch current instructor data to get classname and instructorId
  useEffect(() => {
    if (!username) return;

    axios
      .get(API_USERS_URL, {
        params: { username },
      })
      .then((response) => {
        if (response.data.length > 0) {
          const instructor = response.data[0];
          setClassname(instructor.classname || "");
          setNewClassname(instructor.classname || "");
          setInstructorId(instructor.id);
        }
      })
      .catch((error) =>
        console.error("Error fetching instructor data:", error)
      );
  }, [username]);

  const updateClassname = async () => {
    if (!newClassname) {
      alert("Classname cannot be empty");
      return;
    }

    try {
      await axios.put(`${API_USERS_URL}/${instructorId}`, {
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

  const goToMyStudents = () => {
    navigate("/instructor/myStudent");
  };

  return (
    <div>
        <div>
            <InstNav/>
        </div>
      <div className="min-h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="mb-6">
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
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
          </div>

          <button
            onClick={goToMyStudents}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            View My Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorHome;
