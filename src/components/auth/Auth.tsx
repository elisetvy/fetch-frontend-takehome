import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../api";

function Auth() {
  const initialUserData = {
    name: "",
    email: "",
  };

  const [userData, setUserData] = useState(initialUserData);

  /** Update state within form data. */
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  const navigate = useNavigate();

  /** Call login function with user data. */
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await Api.login(userData);
      navigate("/dogs");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="pt-20 text-center">
      <h1 className="text-2xl font-bold pb-6">LET'S GET STARTED</h1>
      <form className="Lexend flex flex-col items-center min-w-1/3">
        <div className="grid grid-cols-6 gap-2 w-full pb-4">
          <label htmlFor="name" className="">
            Name:
          </label>
          <input
            id="name"
            name="name"
            className="col-span-5 bg-blue-100 px-2 py-1 w-full"
            required
            value={userData.name}
            onChange={handleChange}
            type="text"
          ></input>
        </div>
        <div className="grid grid-cols-6 gap-2 w-full">
          <label htmlFor="email" className="mt-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            className="col-span-5 bg-blue-100 px-2 py-1 w-full"
            required
            value={userData.email}
            onChange={handleChange}
            type="email"
          ></input>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 rounded px-6 py-2 w-fit mt-4 text-white hover:opacity-85"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Auth;
