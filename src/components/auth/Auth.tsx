import { useState } from "react";

import { AuthProps } from "../interfaces";
import Api from "../api";

function Auth({ setCurrUser }: AuthProps) {
  const initialUserData = {
    name: "",
    email: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState("");

  /** Update state within form data. */
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  /** Call login function with user data. */
  async function handleSubmit(e) {
    e.preventDefault();

    if (userData.name === "" || userData.email === "") {
      setError("Please enter your name and a valid email to get started.");

      return;
    }

    try {
      await Api.login(userData);

      sessionStorage.setItem("user", userData.name);
      setCurrUser(userData.name);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <form className="Lexend text-white w-1/2 bg-purple px-10 py-10 rounded-xl mx-10 flex flex-col items-center min-w-1/3 ">
      <h1 className="text-2xl font-bold pb-6">Let's Get Started</h1>
        <div className="grid grid-cols-6 gap-2 w-full pb-4">
          <label htmlFor="name" className="">
            Name:
          </label>
          <input
            id="name"
            name="name"
            className="col-span-5 bg-slate-100 px-2 py-1 w-full rounded-xl text-purple"
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
            className="col-span-5 bg-slate-100 px-2 py-1 w-full rounded-xl text-purple"
            required
            value={userData.email}
            onChange={handleChange}
            type="email"
          ></input>
        </div>
        {error && <p className="mt-6 text-white">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-orange rounded-xl px-6 py-2 w-fit mt-6 text-white hover:opacity-85"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Auth;
