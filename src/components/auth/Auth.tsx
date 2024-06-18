import { useState } from "react";

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

  /** Call login function with user data. */
  async function handleSubmit(e) {
    e.preventDefault();

    await Api.login(userData);
  }

  return (
    <form className="flex flex-col items-center w-1/4">
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        className="bg-blue-100 px-2 py-1 w-full"
        required
        value={userData.name}
        onChange={handleChange}
        type="text"
      ></input>
      <label htmlFor="email" className="mt-2">Email:</label>
      <input
        name="email"
        className="bg-blue-100 px-2 py-1 w-full"
        required
        value={userData.email}
        onChange={handleChange}
        type="text"
      ></input>
      <button onClick={handleSubmit} className="bg-blue-600 rounded px-6 py-2 w-fit mt-4 text-white font-bold">Submit</button>
    </form>
  );
}

export default Auth;
