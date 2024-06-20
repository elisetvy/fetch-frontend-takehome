import { useState, useEffect } from "react";

import Dog from "../Dog/Dog";

import Api from "../api";

function Favorites({ favorites, setFavorites }) {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function getDogs() {
      try {
        const dogs = await Api.fetchDogs(JSON.parse(favorites));
        console.log(dogs, "DOGS");
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
      <div className="mt-10">
        {dogs.map((dog) => {
          return <Dog dog={dog} setFavorites={setFavorites} />;
        })}
      </div>
    </div>
  );
}

export default Favorites;
