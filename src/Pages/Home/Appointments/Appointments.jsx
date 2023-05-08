import React, { useState } from "react";
import doctor from "../../../Assets/images/doctor.png";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import AvailableAppointments from "./AvailableAppointments";

export default function Appointments() {
  const [selected, setSelected] = useState(new Date());

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  return (
    <div>
      <div>
        <div className="appointment-page">
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img alt="" src={doctor} className="max-w-xl shadow-2xl rounded-xl mb-[-16px]" />
              <div className="bg-white rounded-2xl me-48">
                <p className="ms-5 text-bold mt-3">Book your date from here</p>
                <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AvailableAppointments selectedDate={selected}/>
    </div>
  );
}
