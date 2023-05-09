import React from "react";

export default function BookingModal({ treatment }) {
  const { name } = treatment;
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
            <input type="text" className="input input-bordered w-full mt-4" />
            <input type="text" className="input input-bordered w-full mt-4" />
            <input type="text" className="input input-bordered w-full mt-4" />
            <input type="text" className="input input-bordered w-full mt-4" />
            <input type="text" className="input input-bordered w-full mt-4" />
            <br />
            <div class="flex justify-center">
              <input type="submit" class="mt-5 bg-slate-600 text-white px-12 py-3 rounded-xl text-[18px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
