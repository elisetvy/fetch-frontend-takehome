import { useState } from "react";

import Dog from "../Dog/Dog";

import Api from "../api";

function Match() {
  const [match, setMatch] = useState(null);
  const [matched, setMatched] = useState(false);
  const [error, setError] = useState(false);
  const favorites = sessionStorage.getItem("favorites");

  async function handleClick(e) {
    e.preventDefault();

    if (favorites === null) {
      setError(true);
    }

    try {
      const favoritesArray = JSON.parse(favorites);
      const match = await Api.getMatch(favoritesArray);
      const matchedDog = await Api.fetchDogs([match.match]);
      setMatch(matchedDog[0]);
      setMatched(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {error === true && (
        <h1 className="Lexend mt-4 text-red-500">
          You haven't favorited any dogs yet!
        </h1>
      )}
      {matched === true && (
        <div className="flex flex-col items-center">
            <h1 className="Lexend my-4 text-red-500">{match.name} is yo pawfect match</h1>
          <Dog dog={match} />
        </div>
      )}
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
