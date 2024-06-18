import { useState } from "react";

function Auth() {
    const initialUserData = {
        name: "",
        email: ""
      };

  const [userData, setUserData] = useState(initialUserData);

  /** Update state within form data. */
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData(f => ({ ...f, [name]: value}))
  }

  /** Call login function with user data. */
  async function handleSubmit(e) {
    e.preventDefault();

    await login(userData);
  }

  return (
    <form className="flex flex-col border-black border">
      <label>Name:</label>
      <input className="bg-blue-200 px-2 py-1"></input>
      <label>Email:</label>
      <input className="bg-blue-200 px-2 py-1"></input>
      <button>Submit</button>
    </form>
  );
}

export default Auth;
