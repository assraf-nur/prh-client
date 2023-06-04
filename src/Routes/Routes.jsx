import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Login/Login";
import About from "../Pages/Home/About/About";
import Appointments from "../Pages/Home/Appointments/Appointments";
import SignUp from "../Pages/Home/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MyAppointments from "../Pages/Dashboard/MyAppointments";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AddDoctor from "../Pages/Dashboard/AddDoctor";
import ManageDoctor from "../Pages/Dashboard/ManageDoctor";
import ReportHub from "../Pages/ReportHub/ReportHub";
import ManageReportHub from "../Pages/ReportHub/ManageReportHub";
import ManagePrescriptions from "../Pages/ReportHub/ManagePrescriptions";
import DoctorSection from "../DoctorSection/DoctorSection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/appointments",
        element: <Appointments></Appointments>,
      },
      {
        path: "/report-hub",
        element: <ReportHub />,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/doctor-section",
        element: <DoctorSection />,
      },
    ],
  },
  {
    path: "/dashboard",
    element:
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ,
    children: [
      {
        path: '/dashboard',
        element: <MyAppointments />
      },
      {
        path: '/dashboard/allUsers',
        element: <AllUsers />
      },
      {
        path: '/dashboard/adddoctor',
        element: <AddDoctor />
      },
      {
        path: '/dashboard/manage-doctor',
        element: <ManageDoctor />
      },
      {
        path: '/dashboard/manage-report-hub',
        element: <ManageReportHub />
      },
      {
        path: '/dashboard/manage-prescription',
        element: <ManagePrescriptions />
      },
    ]
  },
]);
