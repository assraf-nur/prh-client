import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch((err) => console.log(err.message));
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <Link className="text-bold" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="text-bold" to="/appointments">
          Appointment
        </Link>
      </li>
      <li>
        <Link className="text-bold" to="/report-hub">
          Report Hub
        </Link>
      </li>
      {user?.uid ? (
        <>
          <li>
            <Link className="text-bold" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <button onClick={handleLogOut} className="text-bold" to="/login">
              Log Out
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link className="text-bold" to="/login">
            Login
          </Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <div className="">
      <div className="navbar bg-[#f4060600] justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl ms-0">
            Patient Report Hub
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
      </div>
    </div>
  );
}
