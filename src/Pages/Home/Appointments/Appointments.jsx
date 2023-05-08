import React from "react";
import doctor from '../../../Assets/images/doctor.png'

export default function Appointments() {
  return (
    <div className="bg-cover bg-center h-screen appointment-page">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img alt="" src={doctor} className="max-w-xl shadow-2xl rounded-xl" />
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
