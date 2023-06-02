import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();


  const handleRegister = (data) => {
    console.log(data);
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message);
      });
  };

  const saveUser = (name, email) => {
    const newUser = { name, email };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        navigate('/');
      })
  }

  return (
    <div className="h-[800px] flex justify-center items-center bg-[#485164]">
      <div className="border w-[30%] p-16 rounded-xl shadow-lg bg-white">
        <h2 className="text-4xl mb-5 text-bold">Sign Up here</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full">
            <label className="label mb-0">
              <span className="label-text mb-[-8px]">Your Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full mt-0"
            />
            {errors.name && <p className="text-red-500 mt-2 mb-[-15px]">{errors.name.message}</p>}
          </div>
          <div className="form-control w-full mt-2">
            <label className="label mb-0">
              <span className="label-text mb-[-8px]">Your Mail</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Mail is required",
              })}
              className="input input-bordered w-full mt-0"
            />
            {errors.email && <p className="text-red-500 mt-2 mb-[-15px]">{errors.email.message}</p>}
          </div>
          <div className="form-control w-full mt-2">
            <label className="label mb-0">
              <span className="label-text mb-[-8px]">Your Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "password must be 6 character long" },
              })}
              className="input input-bordered w-full mt-0"
            />
            {errors.password && <p className="text-red-500 mt-2 mb-[-25px]">{errors.password.message}</p>}
          </div>
          <input className="mt-8 w-full bg-[#0051B5] text-white py-2 rounded-xl cursor-pointer" value="Sign Up" type="submit" />
          {signUpError && <p className="text-red-500">{signUpError}</p>}
        </form>
        <p className="text-[14px] mt-3 ms-2 text-semibold">
          Already have account?{" "}
          <Link className="ms-8 text-[#19D3AE]" to="/login">
            Login
          </Link>{" "}
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full pt-1">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
}
