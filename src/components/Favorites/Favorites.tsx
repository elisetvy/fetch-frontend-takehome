import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Dog from "../Dog/Dog";

import Api from "../api";

function Favorites({ favorites, setFavorites }) {
  const [dogs, setDogs] = useState([]);

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

  return (
    <div className="mt-10">
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
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
        {dogs.map((dog) => {
          return <Dog dog={dog} setFavorites={setFavorites} />;
        })}
      </div>
    </div>
  );
}

export default Favorites;
