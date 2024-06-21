import { PaginationProps } from "../interfaces";
import { DOGS_PER_PAGE, BUTTONS_PER_PAGE } from "../constants";

/** Renders buttons to navigate between pages. */

function Pagination({
  currentPage,
  setCurrentPage,
  totalDogs,
}: PaginationProps) {
  const totalPages = Math.ceil(totalDogs / DOGS_PER_PAGE);
  const startingPage =
    currentPage % BUTTONS_PER_PAGE === 0
      ? Math.floor(currentPage / BUTTONS_PER_PAGE) * BUTTONS_PER_PAGE -
        BUTTONS_PER_PAGE
      : Math.floor(currentPage / BUTTONS_PER_PAGE) * BUTTONS_PER_PAGE;
  const maxPageIncremenets = Math.ceil(totalPages / BUTTONS_PER_PAGE) - 1;
  const lastStartingPage = maxPageIncremenets * BUTTONS_PER_PAGE + 1;

  const pages = [];
  const pagesToLoop =
    startingPage + BUTTONS_PER_PAGE > totalPages
      ? totalPages
      : startingPage + BUTTONS_PER_PAGE;

  for (let i = startingPage + 1; i <= pagesToLoop; i++) {
    pages.push(i);
  }

  function decrement() {
    setCurrentPage(startingPage + 1 - BUTTONS_PER_PAGE);
  }

  function increment() {
    setCurrentPage(startingPage + 1 + BUTTONS_PER_PAGE);
  }

  return (
    <div className="mt-10 flex flex-wrap gap-4 justify-center">
      <button
        onClick={decrement}
        className={`${
          startingPage === 0 ? "bg-slate-100" : "bg-orange"
        } h-12 w-12 px-2 py-2 font-bold rounded-xl`}
        disabled={startingPage === 0}
      >
        ⟨
      </button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            value={page}
            onClick={() => setCurrentPage(page)}
            className={`${
              page === currentPage
                ? "bg-purple text-white"
                : "bg-orange-lighter hover:bg-[#ff9900]"
            } h-12 w-12 px-2 py-2 font-bold rounded-xl`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={increment}
        className={`${
          startingPage + 1 === lastStartingPage ? "bg-slate-100" : "bg-orange"
        } h-12 w-12 px-2 py-2 font-bold rounded-xl`}
        disabled={startingPage + 1 === lastStartingPage}
      >
        ⟩
      </button>
    </div>
  );
}

export default Pagination;
