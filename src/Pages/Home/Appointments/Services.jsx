import React from "react";

export default function Services({ service }) {
  const { name, slots } = service;
  return (
    <div className="mt-4">
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-[28px]">{name}</h2>
          <p>{slots.length > 0 ? slots[0] : "Try another day"}</p>
          <p>{slots.length} slots are available</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Book Appointments</button>
          </div>
        </div>
      </div>
    </div>
  );
}
