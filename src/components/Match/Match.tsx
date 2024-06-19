import { useState } from "react";

import Api from "../api";

function Match() {
  const [matched, setMatched] = useState(false);
  const [error, setError] = useState(null);
  const favorites = sessionStorage.getItem("favorites");

  async function handleClick(e) {
    e.preventDefault();

    if (favorites === null) {
        setError("No favorites!")
    }

    try {
        await Api.getMatch()
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <div>
        {error !== null && <h1>You haven't favorited any dogs yet!</h1>}
      <button
        onClick={handleClick}
        className="Lexend mt-4 bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 text-white"
      >
        Get Match
      </button>
    </div>
  );
}

export default Match;
