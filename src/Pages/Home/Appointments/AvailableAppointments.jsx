import { format } from "date-fns";
import React, { useState } from "react";
import Services from "./Services";
import BookingModal from "./BookingModal";
import { useQuery } from "@tanstack/react-query";

export default function AvailableAppointments({ selectedDate }) {
  const [treatment, setTreatment] = useState('');

  const { data: services = [] } = useQuery({
    queryKey: ["appointmentOptions"],
    queryFn: () => fetch("http://localhost:5000/appointmentOptions").then((res) => res.json())
  });

  return (
    <div>
      <p className="text-center mt-8 text-[36px] text-bold">
        Available Appointments on <span className="text-[#0051B5]">{format(selectedDate, "PP")}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center justify-items-center align-items-center mt-4 mb-8 px-[2px]">
        {services.map((service) => (
          <Services key={service._id} service={service} setTreatment={setTreatment}></Services>
        ))}
      </div>
      <BookingModal treatment={treatment} setTreatment={setTreatment} selectedDate={selectedDate} />
    </div>
  );
}
