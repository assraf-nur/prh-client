import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Services from "./Services";

export default function AvailableAppointments({ selectedDate }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("service.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div>
      <p className="text-center mt-8 text-[36px] text-bold">
        Available Appointments on <span className="text-[#0051B5]">{format(selectedDate, "PP")}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center justify-items-center align-items-center mt-4 mb-8 px-[2px]">
        {services.map((service) => (
          <Services key={service._id} service={service}></Services>
        ))}
      </div>
    </div>
  );
}
