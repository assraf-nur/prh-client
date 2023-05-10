import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div>
        <h2 className="text-4xl">Login here</h2>
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <input {...register("firstName")} placeholder="First name" />
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What is your name?</span>
              <span className="label-text-alt">Top Right label</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label className="label">
              <span className="label-text-alt">Bottom Left label</span>
              <span className="label-text-alt">Bottom Right label</span>
            </label>
          </div>
          <select {...register("category", { required: true })}>
            <option value="">Select...</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
          </select>
          <textarea {...register("aboutYou")} placeholder="About you" />
          <p>{data}</p>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
