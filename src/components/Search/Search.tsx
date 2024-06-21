import { ChangeEvent } from "react";

import { SearchParams, SearchProps } from "../interfaces";

/** Allows user to filter dogs by breed and sort alphabetically. */

function Search({ breeds, setFilters, setCurrentPage }: SearchProps) {
  /** Updates filters with user's choice(s) and resets current page to 1. */
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
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
        setFilters((prev: SearchParams) => ({
          sort: prev.sort,
          breeds: [value],
          from: 0,
        }));
      }
    } else {
      setCurrentPage(1);
      setFilters((prev: SearchParams) => ({
        ...prev,
        sort: `name:${value}`,
        from: 0,
      }));
    }
  }

  return (
    <div>
      <form className="Lexend bg-purple text-slate-100 px-2 py-2 rounded-full w-full flex flex-col items-center gap-2 sm:flex-row justify-end">
        <label htmlFor="breeds" className="font-bold">
          Breed
        </label>
        <select
          id="breeds"
          name="breeds"
          onChange={handleChange}
          className="bg-slate-100 text-purple rounded-xl px-2 py-1 border-r-8 border-slate-100 w-3/4 sm:w-fit"
        >
          <option value="all">All Breeds</option>
          {breeds.map((breed: string, index) => {
            return (
              <option value={breed} key={index}>
                {breed}
              </option>
            );
          })}
        </select>
        <label htmlFor="sort" className="font-bold">
          Sort
        </label>
        <select
          id="sort"
          name="sort"
          onChange={handleChange}
          className="bg-slate-100 text-purple rounded-xl px-2 py-1 border-r-8 border-slate-100 w-3/4 sm:w-fit"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </form>
    </div>
  );
}

export default Search;
