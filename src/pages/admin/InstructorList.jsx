import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../../components/admin/AdminNav";

const InstructorList = () => {
  const [students, setStudents] = useState([]);
  const [searchInst, setSearchInst] = useState("");
  const api = "https://68219a2d259dad2655afc2ba.mockapi.io";
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${api}/user`);
      const filteredStudents = response.data.filter(
        (user) => user.role === "instructor"
      );
      setStudents(filteredStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const filteredStudents = students.filter(
    (instructor) =>
      instructor.fullname.toLowerCase().includes(searchInst.toLowerCase()) ||
      instructor.username.toLowerCase().includes(searchInst.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchInst.toLowerCase())
  );
  if (!filteredStudents) {
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
        <AdminNav/>
      </div>
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8">
        <p className="text-3xl font-bold text-blue-600 mb-6">Instructor List</p>

        <div className="w-full max-w-3xl mb-6 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name, username, or email"
            value={searchInst}
            onChange={(e) => setSearchInst(e.target.value)}
            className="w-full border rounded-md h-10 px-4 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div>
            <Link to="/admin/adminHome/createInstructor">
              <button className="py-2 px-2 w-35 bg-blue-600 rounded-lg text-white font-bold">
                Add Instructor
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">More Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((instructor, index) => (
                <tr
                  key={instructor.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="px-4 py-2 text-gray-700">
                    {instructor.fullname}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {instructor.username}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {instructor.email}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`instructorDetails/${instructor.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorList;
