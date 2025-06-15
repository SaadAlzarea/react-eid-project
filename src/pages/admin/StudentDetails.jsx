import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../components/admin/AdminNav";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = "https://68219a2d259dad2655afc2ba.mockapi.io";
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`${api}/user/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const deleteStudent = async () => {
    try {
      await axios.delete(`${api}/user/${id}`);
      alert("Student deleted successfully!");
      navigate("/admin/adminHome/studentList");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const update = async () => {
    try {
      await axios.put(`${api}/user/${id}`, student);
      alert("Student details updated successfully!");
      navigate("/admin/adminHome/studentList");
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <AdminNav />
      </div>
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-start gap-8 shadow-lg rounded-lg bg-white p-6">
          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-lg font-semibold text-gray-700 text-center w-full">
              Student Details
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={student.fullname}
                onChange={onChange}
                className="w-full border rounded-md h-10 px-3 text-gray-800  focus:outline-none"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={student.username}
                onChange={onChange}
                className="w-full border rounded-md h-10 px-3 text-gray-800   focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={onChange}
                className="w-full border rounded-md h-10 px-3 text-gray-800 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={student.password}
                onChange={onChange}
                className="w-full border rounded-md h-10 px-3 text-gray-800  focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={update}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Update
              </button>
              <button
                onClick={deleteStudent}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => navigate("admin/studentList")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
