import { useState, useEffect } from "react";

import Api from "../api";

function Search() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBreeds() {
      try {
        const breeds = await Api.getBreeds();
        setBreeds(breeds);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getBreeds();
  }, []);

  return (
    <div>
      {loading === false && (
        <form className="Lexend flex justify-end items-center gap-2">
          <label htmlFor="breed" className="font-bold">
            Breed
          </label>
          <select
            id="breed"
            name="breed"
            className="bg-blue-100 rounded-xl px-2 py-1 border-r-8 border-blue-100"
          >
            {breeds.map((breed) => {
              return <option value={breed}>{breed}</option>;
            })}
          </select>
          <label htmlFor="sort" className="font-bold">
            Sort
          </label>
          <select
            id="sort"
            name="sort"
            className="bg-blue-100 rounded-xl px-2 py-1 border-r-8 border-blue-100"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </form>
      )}
    </div>
  );
}

export default Search;
