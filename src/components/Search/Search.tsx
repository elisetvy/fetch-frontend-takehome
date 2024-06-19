import { useState, useEffect } from "react";

import Dog from "../Dog/Dog";
import Pagination from "../Pagination/Pagination";

import { Dog as DogType } from "../interfaces";
import Api from "../api";

function Search() {
  const [breeds, setBreeds] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [filters, setFilters] = useState({ sort: "name:asc", from: 0 });
  const [dogs, setDogs] = useState([]);
  const dogsPerPage = 24;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getDogs() {
      // Get all breeds on initial render only
      if (!breeds.length) {
        const breeds = await Api.getBreeds();
        setBreeds(breeds);
      }

      try {
        const searchResults = await Api.searchDogs(filters);
        const totalDogs = await searchResults.total;
        const ids = await searchResults.resultIds;
        const dogs = await Api.fetchDogs(ids);
        setTotalDogs(totalDogs);
        setDogs(dogs);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getDogs();
  }, [filters]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "breeds") {
      if (value === "all") {
        setCurrentPage(1);
        setFilters((prev) => ({
          sort: prev.sort,
          from: 0,
        }));
      } else {
        setCurrentPage(1);
        setFilters((prev) => ({
          ...prev,
          breeds: [value],
          from: 0,
        }));
      }
    } else {
      setCurrentPage(1);
      setFilters((prev) => ({
        ...prev,
        sort: `name:${value}`,
        from: 0,
      }));
    }
  }

  function changePage(newPage: number) {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      from: (newPage - 1) * dogsPerPage,
    }));
  }

  return (
    <div className="">
      {loading === false && (
        <form className="Lexend w-full flex flex-col items-center gap-2 sm:flex-row justify-end">
          <label htmlFor="breeds" className="font-bold">
            Breed
          </label>
          <select
            id="breeds"
            name="breeds"
            onChange={handleChange}
            className="bg-blue-100 rounded-xl px-2 py-1 border-r-8 border-blue-100 w-3/4 sm:w-fit"
          >
            <option value="all">All Breeds</option>
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
            onChange={handleChange}
            className="bg-blue-100 rounded-xl px-2 py-1 border-r-8 border-blue-100 w-3/4 sm:w-fit"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </form>
      )}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
        {dogs.map((d: DogType) => {
          return <Dog dog={d} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={changePage}
        totalDogs={totalDogs}
        dogsPerPage={dogsPerPage}
      ></Pagination>
    </div>
  );
}

export default Search;
