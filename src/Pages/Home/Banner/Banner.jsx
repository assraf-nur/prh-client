import React from "react";
import banner from "../../../../src/Assets/images/mainLogo.jpg";

export default function Banner() {
  return (
    <div>
      <div className="min-h-screen flex">
        <div className="w-1/2">
            <h1>Hello There</h1>
            <h2>Welcome to the Patient Report Hub</h2>
            <h3>For Taking your service please login first</h3>
        </div>
        <div className="w-1/2">
          <img src={banner} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
