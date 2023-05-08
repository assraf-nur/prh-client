import React from "react";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";
import { Outlet } from "react-router-dom";
import "../../src/Layout/Global.css";

export default function Main() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}
