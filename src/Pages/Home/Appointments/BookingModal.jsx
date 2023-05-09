import { format } from "date-fns";
import React from "react";

export default function BookingModal({ treatment, selectedDate }) {
  const { name, slots } = treatment;

  const handleBookingModal = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const mail = form.mail.value;
    const phone = form.phone.value;
    const date = form.date.value;

    console.log(name, mail, slot, phone, date);
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <div>
            <form action="" onSubmit={handleBookingModal}>
              <input name="date" type="text" value={format(selectedDate, "PP")} className="input input-bordered w-full mt-4 font-bold" />
              <select name="slot" className="select select-bordered w-full mt-4">
                {slots && slots.map((slot,i) => <option value={slot} key={i}>{slot}</option>)}
              </select>

              <input name="name" type="text" placeholder="full-name" className="input input-bordered w-full mt-4" />
              <input name="phone" type="number" placeholder="phone-number" className="input input-bordered w-full mt-4" />
              <input name="mail" type="mail" placeholder="email" className="input input-bordered w-full mt-4" />
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
