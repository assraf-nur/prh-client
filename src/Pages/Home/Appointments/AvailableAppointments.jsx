import { format } from "date-fns";
import React, { useState } from "react";
import Services from "./Services";
import BookingModal from "./BookingModal";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";

export default function AvailableAppointments({ selectedDate }) {
  const [treatment, setTreatment] = useState("");
  const date = format(selectedDate, "PP");

  const {
    data: services = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () => fetch(`http://localhost:5000/appointmentOptions?date=${date}`).then((res) => res.json()),
  });

  if (isLoading) {
    return <Loading />;
  }

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
      <BookingModal refetch={refetch} treatment={treatment} setTreatment={setTreatment} selectedDate={selectedDate} />
    </div>
  );
}
