import React, { useContext } from "react";
import banner from "../../../../src/Assets/images/mainLogo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

export default function Banner() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="min-h-screen flex">
        <div className="w-1/2 home-text mt-[130px]">
          <h1>Hello There</h1>
          <h2 className="leading-tight">
            <span className="text-[#FE615C]">Welcome</span> to the <span className="text-[#0051B5]">Patient Report Hub</span>
          </h2>

          {user?.uid ? (
            <div className="mt-32">
              <h5 className="text-[52px] text-bold">Your are already Logged In</h5>
              <h5 className="text-[32px] ms-24 mt-[-10px] text-[#0051B5]">Please take your desire Service</h5>
            </div>
          ) : (
            <>
              <h3 className="mt-24">For Taking your service please login first</h3>

              <div class="text-center mt-8">
                <Link class="login-button-home mx-auto" to="/login">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="w-1/2">
          <img src={banner} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
