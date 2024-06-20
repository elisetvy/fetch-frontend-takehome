import { AuthProps } from "../interfaces";

import Api from "../api";

function LogOut({ setCurrUser }: AuthProps) {
  async function handleClick(e) {
    e.preventDefault();

    sessionStorage.clear();
    setCurrUser("");

    try {
      await Api.logout();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      onClick={handleClick}
      className="Lexend mt-4 bg-purple px-4 py-2 rounded-xl hover:bg-blue-600 text-white"
    >
      Log Out
    </button>
  );
}

export default LogOut;
