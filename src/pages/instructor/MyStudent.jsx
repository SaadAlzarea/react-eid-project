import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InstNav from "../../components/instructor/InstNav";

const MyStudent = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const classname = localStorage.getItem("classname");
  const API_URL = "https://68219a2d259dad2655afc2ba.mockapi.io/user";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/instructor/instructorLogin");
      return;
    }

    if (!classname) {
      // optional: could fetch instructor here again
      return;
    }

    axios
      .get(API_URL)
      .then((res) => {
        const allStudents = res.data.filter((user) => user.role === "student");
        const matchedStudents = allStudents.filter(
          (student) => student.classname === classname
        );
        setStudents(matchedStudents);
      })
      .catch((error) => console.error(error));
  }, [isAuthenticated, navigate, classname]);

  return (
    <div>
      <div>
        <InstNav />
      </div>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
          My Students — Class: <span className="italic">{classname}</span>
        </h1>
        {students.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No students found for your class yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {student.fullname}
                </h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Username:</span>{" "}
                  {student.username}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {student.email}
                </p>
                <p className="text-gray-500">
                  <span className="font-semibold">Class:</span>{" "}
                  {student.classname}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStudent;
