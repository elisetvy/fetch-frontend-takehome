import { useState } from "react";

import Dog from "../Dog/Dog";

import Api from "../api";
import { Link } from "react-router-dom";

function Match() {
  const [match, setMatch] = useState(null);
  const [matched, setMatched] = useState(false);

  async function handleClick(e) {
    e.preventDefault();

    try {
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
      {matched === true && (
        <div className="flex flex-col items-center">
          <h1 className="Lexend my-4 text-red-500">
            {match.name} is yo pawfect match
          </h1>
          <Dog dog={match} />
        </div>
      )}
      <Link to="/favorites">
        <button className="Lexend mt-4 bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 text-white">
          Find Your Pawfect Match!
        </button>
      </Link>
    </div>
  );
}

export default Match;
