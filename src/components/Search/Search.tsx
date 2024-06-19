import { useState, useEffect } from "react";

import Dog from "../Dog/Dog";

import { Dog as DogType } from "../interfaces";
import Api from "../api";

function Search() {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({ sort: "asc" });

  useEffect(() => {
    async function getBreeds() {
      try {
        const breeds = await Api.getBreeds();
        setBreeds(breeds);

        const searchResults = await Api.searchDogs();
        const ids = await searchResults.resultIds;
        const dogs = await Api.fetchDogs(ids);
        setDogs(dogs);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getBreeds();
  }, []);

  useEffect(() => {
    async function getSearchResults() {
      try {
        console.log("FILTERS ARE", filters);
        const searchResults = await Api.searchDogs(filters);
        const ids = await searchResults.resultIds;
        const dogs = await Api.fetchDogs(ids);
        setDogs(dogs);
      } catch (err) {
        console.log(err);
      }
    }

    getSearchResults();
  }, [filters]);

  async function handleChange(e) {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: `breed:${e.target.value}`,
    }));
  }

  return (
    <div>
      {loading === false && (
        <form className="Lexend flex justify-end items-center gap-2">
          {/* <label htmlFor="breed" className="font-bold">
            Breed
          </label>
          <select
            id="breed"
            name="breed"
            value={filters.breed}
            onChange={handleChange}
            className="bg-blue-100 rounded-xl px-2 py-1 border-r-8 border-blue-100"
          >
            <option value="all" selected>
              All Breeds
            </option>
            {breeds.map((breed) => {
              return <option value={breed}>{breed}</option>;
            })}
          </select> */}
          <label htmlFor="sort" className="font-bold">
            Sort
          </label>
          <select
            id="sort"
            name="sort"
            onChange={handleChange}
            className="bg-blue-100 rounded-xl px-2 py-1 border-r-8 border-blue-100"
          >
            <option value="asc" selected>
              Ascending
            </option>
            <option value="desc">Descending</option>
          </select>
        </form>
      )}
      {loading === false && (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
          {dogs.map((d: DogType) => {
            return <Dog dog={d} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
