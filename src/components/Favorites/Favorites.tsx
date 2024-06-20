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
    <div className="h-full flex flex-col px-10">
      <div className="flex-shrink-0 Lexend bg-purple text-slate-100 px-2 py-2 rounded-full w-full">
        <p className="font-bold text-center">
          Your Favorite Dogs
        </p>
      </div>
      <div className="empty:hidden flex-grow flex justify-center items-center mt-10 text-center">
        {matched === true && (
          <div className="flex flex-col items-center mb-4">
            <Dog dog={match} />
            <h1 className="text-3xl font-bold mt-10 text-purple">
              {match.name} is your Pawfect Match!
            </h1>
          </div>
        )}
      </div>
      <div
        className={`empty:hidden ${
          matched === true && "hidden"
        } flex-grow mt-10 grid grid-cols-2 md:grid-cols-3 gap-10 overflow-scroll overflow-x-hidden px-10`}
      >
        {dogs.map((dog) => {
          return <Dog dog={dog} setFavorites={setFavorites} />;
        })}
      </div>
      <div className="empty:hidden flex-grow flex justify-center items-center mt-10 text-center">
        {favorites === null ||
          (favorites === "[]" && (
            <div className="text-center">
              <p className="Lexend text-purple mt-10 text-center">
                You haven't favorited any dogs yet!
              </p>
              <Link to="/">
                <button className="Lexend mt-10 bg-purple px-4 py-2 rounded-xl hover:bg-blue-600 text-white">
                  Back to Dogs
                </button>
              </Link>
            </div>
          ))}
      </div>
      <div className="empty:hidden mt-10 text-center">
        {JSON.parse(favorites).length !== 0 && (
          <button
            onClick={handleClick}
            className="Lexend bg-purple px-10 py-4 rounded-xl text-2xl text-white"
          >
            {match !== null ? "Match Again" : "Find Your Perfect Match"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Favorites;
