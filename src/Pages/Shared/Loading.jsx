import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <progress className="progress w-56"></progress>
    </div>
  );
}
