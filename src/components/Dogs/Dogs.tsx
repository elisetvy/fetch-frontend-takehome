import { useState, useEffect } from "react";

import Search from "../Search/Search";
import Dog from "../Dog/Dog";
import Pagination from "../Pagination/Pagination";

import { Dog as DogType, DogsProps, SearchParams } from "../interfaces";
import { DOGS_PER_PAGE } from "../constants";

import Api from "../api";

/** Renders dogs list. Takes setFavorites function to pass to DogCard. */

function Dogs({ setFavorites }: DogsProps) {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [filters, setFilters] = useState<SearchParams>({
    sort: "breed:asc",
    from: 0,
  });
  const [dogs, setDogs] = useState<DogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  /** Gets all dogs on initial render and when filters change. */
  useEffect(() => {
    async function getDogs() {
      // Gets all breeds on initial render only
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

  /** Updates current page number and filters to trigger dogs rerender. */
  function changePage(newPage: number) {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      from: (newPage - 1) * DOGS_PER_PAGE,
    }));
  }

  return (
    <div className="h-full px-10">
      {loading ? (
        <div className="h-full flex justify-center items-center text-3xl font-bold text-purple">
          Loading...
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex-shrink-0">
            <Search
              breeds={breeds}
              setFilters={setFilters}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className="flex-grow mt-10 grid grid-cols-3 gap-6 px-6 overflow-scroll overflow-x-hidden">
            {dogs.map((d: DogType) => {
              return <Dog dog={d} key={d.id} setFavorites={setFavorites} />;
            })}
          </div>
          <div className="flex-shrink-0">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={changePage}
              totalDogs={totalDogs}
            ></Pagination>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dogs;
