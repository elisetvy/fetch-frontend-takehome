import { LogInProps } from "../interfaces";

import Api from "../api";

function LogOut({ setCurrUser }: LogInProps) {
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
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
      className="Lexend mt-4 bg-purple px-4 py-2 rounded-xl hover:bg-[#300D38] text-white"
    >
      Log Out
    </button>
  );
}

export default LogOut;
