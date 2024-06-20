import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Dog from "../Dog/Dog";

import Api from "../api";

function Favorites({ favorites, setFavorites }) {
  const [dogs, setDogs] = useState([]);
  const [match, setMatch] = useState(null);
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    async function getDogs() {
      try {
        const dogs = await Api.fetchDogs(JSON.parse(favorites));
        setDogs(dogs);
      } catch (err) {
        console.log(err);
      }
    }

    getDogs();
  }, []);

  async function handleClick(e) {
    e.preventDefault();

    try {
      const match = await Api.getMatch(JSON.parse(favorites));
      const matchedDog = await Api.fetchDogs([match.match]);
      setMatch(matchedDog[0]);
      setMatched(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="mt-10 max-h-screen overflow-scroll">
      <p className="text-2xl font-bold text-center">YOUR FAVORITE DOGS</p>
      {favorites === null && (
        <div className="text-center">
          <p className="Lexend mt-10 text-center">
            You haven't favorited any dogs yet!
          </p>
          <Link to="/">
            <button className="Lexend mt-10 bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-600 text-white">
              Back to Dogs
            </button>
          </Link>
        </div>
      )}
      <div className="mt-6 text-center">
        {matched === true && (
          <div className="flex flex-col items-center mb-4">
            <h1 className="Lexend my-4 text-red-500">
              {match.name} is yo pawfect match
            </h1>
            <Dog dog={match} />
          </div>
        )}
        <button
          onClick={handleClick}
          className="Lexend bg-rose-500 px-10 py-4 rounded-xl text-2xl hover:bg-rose-600 text-white"
        >
          Find Your Pawfect Match
        </button>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
        {dogs.map((dog) => {
          return <Dog dog={dog} setFavorites={setFavorites} />;
        })}
      </div>
    </div>
  );
}

export default Favorites;
