import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Dog from "../Dog/Dog";

import { Dog as DogType, FavoritesProps } from "../interfaces";

import Api from "../api";

/** Renders favorited dogs list. */

function Favorites({ favorites, setFavorites }: FavoritesProps) {
  const [dogs, setDogs] = useState<DogType[]>([]);
  const [match, setMatch] = useState<DogType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /** Gets all favorited dogs from IDs array. */
  useEffect(() => {
    async function getDogs() {
      if (!favorites) {
        setLoading(false);
        return;
      }

      try {
        const dogs = await Api.fetchDogs(JSON.parse(favorites));
        setDogs(dogs);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getDogs();
  }, []);

  /** Gets match from IDs array. */
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const match = await Api.getMatch(JSON.parse(favorites));
      const matchedDog = await Api.fetchDogs([match.match]);
      setMatch(matchedDog[0]);
    } catch (err) {
      console.log(err);
    }
  }

  /** Empties favorites ID array in state and sessionStorage. */
  function clearFavorites() {
    setFavorites("[]");
    sessionStorage.setItem("favorites", "[]");
  }

  return (
    <div className="h-full flex flex-col px-10">
      <div className="flex-shrink-0 Lexend bg-purple text-slate-100 px-2 py-2 rounded-full w-full">
        <p className="font-bold text-center">Your Favorite Dogs</p>
      </div>
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <p className="text-3xl font-bold text-purple">Loading...</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-3 gap-6 overflow-scroll overflow-x-hidden px-6">
          {match ? (
            <div className="col-start-2">
              <Dog dog={match} setFavorites={setFavorites} />
            </div>
          ) : (
            <>
              {dogs.map((dog: DogType) => {
                return (
                  <Dog dog={dog} key={dog.name} setFavorites={setFavorites} />
                );
              })}
            </>
          )}
        </div>
      )}
      <div className="empty:hidden flex-grow flex justify-center items-center mt-10 text-center">
        {(!favorites || favorites == "[]") && (
          <div className="text-center">
            <p className="Lexend text-purple mt-10 text-center">
              You haven't favorited any dogs yet!
            </p>
            <Link to="/">
              <button className="Lexend mt-10 bg-purple px-4 py-2 rounded-xl hover:bg-[#300d38] text-white">
                Back to Dogs
              </button>
            </Link>
          </div>
        )}
      </div>
      {favorites && (
        <div className="empty:hidden mt-10 text-center flex-shrink-0">
          {JSON.parse(favorites).length !== 0 && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={clearFavorites}
                className="Lexend bg-purple hover:bg-[#300D38] px-10 py-4 rounded-xl text-white"
              >
                Clear Favorites
              </button>
              <button
                onClick={handleClick}
                className="Lexend bg-purple hover:bg-[#300D38] px-10 py-4 rounded-xl text-white"
              >
                {match !== null ? "Match Again" : "Find Your Perfect Match"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Favorites;
