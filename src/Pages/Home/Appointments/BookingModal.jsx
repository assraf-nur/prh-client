import { format } from "date-fns";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function BookingModal({ treatment, selectedDate, refetch }) {
  const { name: treatmentName, slots } = treatment;
  const { user } = useContext(AuthContext);

  const handleBookingModal = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const date = form.date.value;

    const booking = {
      appointmentDate: date,
      treatment: treatmentName,
      patient: name,
      slot,
      email,
      phone,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          form.reset();
          const modalCheckbox = document.getElementById("booking-modal");
          modalCheckbox.checked = !modalCheckbox.checked;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your booking is saved",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
        else {
          Swal.fire('You already have an appointment on this day')
          const modalCheckbox = document.getElementById("booking-modal");
          modalCheckbox.checked = !modalCheckbox.checked;
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">{treatmentName}</h3>
          <div>
            <form action="" onSubmit={handleBookingModal}>
              <input name="date" type="text" value={format(selectedDate, "PP")} className="input input-bordered w-full mt-4 font-bold" disabled />
              <select name="slot" className="select select-bordered w-full mt-4">
                {slots &&
                  slots.map((slot, i) => (
                    <option value={slot} key={i}>
                      {slot}
                    </option>
                  ))}
              </select>

              <input name="name" defaultValue={user?.displayName} type="text" placeholder="full-name" className="input input-bordered w-full mt-4" disabled />
              <input name="phone" type="number" placeholder="phone-number" className="input input-bordered w-full mt-4" />
              <input name="email" defaultValue={user?.email} type="email" placeholder="email" className="input input-bordered w-full mt-4" disabled />
              <br />
              <div class="flex justify-center">
                <input type="submit" class="mt-5 bg-slate-600 text-white px-12 py-3 rounded-xl text-[18px] cursor-pointer" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
