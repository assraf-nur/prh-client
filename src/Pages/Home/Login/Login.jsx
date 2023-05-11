import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <div className="h-[800px] flex justify-center items-center bg-[#485164]">
      <div className="border w-[30%] p-16 rounded-xl shadow-lg bg-white">
        <h2 className="text-4xl mb-5 text-bold">Login here</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full">
            <label className="label mb-0">
              <span className="label-text mb-[-8px]">Your Mail</span>
            </label>
            <input
              {...register("mail", {
                required: "Email is required",
              })}
              type="mail"
              className="input input-bordered w-full mt-0"
            />
            {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full mt-5">
            <label className="label mb-0">
              <span className="label-text mb-[-8px]">Your Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              className="input input-bordered w-full mt-0"
            />
            {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
          </div>
          <input className="mt-8 w-full bg-[#0051B5] text-white py-2 rounded-xl cursor-pointer" value="Login" type="submit" />
        </form>
        <p className="text-[14px] mt-3 ms-2 text-semibold">
          New to Doctors Portal?{" "}
          <Link className="ms-8 text-[#19D3AE]" to="/signup">
            Create new account
          </Link>{" "}
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full pt-1">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
}
