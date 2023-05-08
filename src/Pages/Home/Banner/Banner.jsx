import React from "react";
import banner from "../../../../src/Assets/images/mainLogo.jpg";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div>
      <div className="min-h-screen flex">
        <div className="w-1/2 home-text mt-[130px]">
          <h1>Hello There</h1>
          <h2 className="leading-tight">
            <span className="text-[#FE615C]">Welcome</span> to the <span className="text-[#0051B5]">Patient Report Hub</span>
          </h2>
          <h3 className="mt-24">For Taking your service please login first</h3>

          <div class="text-center mt-8">
            <Link class="login-button-home mx-auto" to="/login">
              Login
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <img src={banner} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
