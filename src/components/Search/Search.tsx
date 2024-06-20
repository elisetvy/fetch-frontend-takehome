import { DOGS_PER_PAGE } from "../constants";

function Search({ breeds, setFilters, setCurrentPage }) {
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

  return (
    <div className="">
      <form className="Lexend bg-slate-100 px-2 py-2 rounded-full w-full flex flex-col items-center gap-2 sm:flex-row justify-end">
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
          {breeds.map((breed: string) => {
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
    </div>
  );
}

export default Search;
