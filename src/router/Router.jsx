import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// student
import StudentRegister from "../pages/student/StudentRegister";
import StudentLogin from "../pages/student/StudentLogin";
import StudentHome from "../pages/student/StudentHome";
// admin
import AdminHome from "../pages/admin/AdminHome";
import AdminRegister from "../pages/admin/AdminRegister";
import AdminLogin from "../pages/admin/AdminLogin";

import NewInstructor from "../pages/admin/NewInstructor";
import InstructorList from "../pages/admin/instructorList.jsx";
import InstructorDetails from "../pages/admin/InstructorDetails.jsx";

import NewStudent from "../pages/admin/NewStudent.jsx";
import StudentList from "../pages/admin/StudentList.jsx";
import StudentDetails from "../pages/admin/StudentDetails.jsx"; 

// instructor
import InstructorLogin from "../pages/instructor/InstructorLogin.jsx";
import CreatePost from "../pages/student/CreatePost.jsx";
// import { SiTrueup } from "react-icons/si";
import MyPosts from "../pages/student/MyPosts.jsx";
import AdminPosts from "../pages/admin/AdminPosts.jsx";
import InstructorHome from "../pages/instructor/InstructorHome.jsx";
import MyStudent from "../pages/instructor/MyStudent.jsx";
import Main from "../pages/Main.jsx";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
    {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },

    ],
  },
  {
    path: "student/",
    element: <Layout />,
    children: [
      { path: "studentRegister", element: <StudentRegister /> },
      { path: "studentLogin", element: <StudentLogin /> },
      { index: true, path: "studentHome", element: <StudentHome /> },
      { path: "post", element: <CreatePost /> },
      { path: "myPost", element: <MyPosts /> },
    ],
  },
  {
    path: "instructor/",
    element: <Layout />,
    children: [
      { index: true,path:"instructorLogin", element: <InstructorLogin /> },
      { path:"instHome", element: <InstructorHome /> },
      { path:"myStudent", element: <MyStudent /> },
    ],
  },
  {
    path: "admin/",
    element: <Layout />,
    children: [
      { path: "adminHome", element: <AdminHome /> },
      { path: "adminRegister", element: <AdminRegister /> },
      { index: true, path: "adminLogin", element: <AdminLogin /> },

      { path: "adminHome/newStudent", element: <NewStudent /> },
      { path: "adminHome/studentList", element: <StudentList /> },
      {
        path: "adminHome/studentList/studentDetails/:id",
        element: <StudentDetails />,
      },
      { path: "adminPost", element: <AdminPosts /> },

      { path: "adminHome/createInstructor", element: <NewInstructor /> },
      { path: "adminHome/instructorList", element: <InstructorList /> },
      {
        path: "adminHome/instructorList/instructorDetails/:id",
        element: <InstructorDetails />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
