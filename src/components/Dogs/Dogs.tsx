import { useState, useEffect } from "react";

import Search from "../Search/Search";
import Dog from "../Dog/Dog";
import Pagination from "../Pagination/Pagination";

import { Dog as DogType } from "../interfaces";
import { DOGS_PER_PAGE } from "../constants";

import Api from "../api";

function Dogs({ setFavorites }: (id: string) => void) {
  const [breeds, setBreeds] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [filters, setFilters] = useState({ sort: "name:asc", from: 0 });
  const [dogs, setDogs] = useState([]);
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

  function changePage(newPage: number) {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      from: (newPage - 1) * DOGS_PER_PAGE,
    }));
  }

  return (
    <div className="mt-10 max-h-screen overflow-scroll">
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Search
            breeds={breeds}
            setFilters={setFilters}
            setCurrentPage={setCurrentPage}
          />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
            {dogs.map((d: DogType) => {
              return <Dog dog={d} setFavorites={setFavorites} />;
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={changePage}
            totalDogs={totalDogs}
          ></Pagination>
        </>
      )}
    </div>
  );
}

export default Dogs;
