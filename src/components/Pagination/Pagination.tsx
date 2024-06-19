interface PaginationProps {
  currentPage: number;
  setCurrentPage: (number: number) => void;
  totalDogs: number;
  dogsPerPage: number;
}

function Pagination({
  currentPage,
  setCurrentPage,
  totalDogs,
  dogsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalDogs / dogsPerPage);
  const buttonsPerPage = 5;
  const startingPage =
    Math.floor(currentPage / buttonsPerPage) * buttonsPerPage;
  const maxPageIncremenets = Math.ceil(totalPages / buttonsPerPage) - 1;
  const lastStartingPage = maxPageIncremenets * buttonsPerPage + 1;

  const pages = [];
  const pagesToLoop =
    startingPage + buttonsPerPage > totalPages
      ? totalPages
      : startingPage + buttonsPerPage;

  for (let i = startingPage + 1; i <= pagesToLoop; i++) {
    pages.push(i);
  }

  function decrement() {
    setCurrentPage(startingPage - buttonsPerPage);
  }

  function increment() {
    setCurrentPage(startingPage + buttonsPerPage);
  }

  return (
    <div className="mt-10 flex flex-wrap gap-4 justify-center border-2 border-green-400">
      <button
        onClick={decrement}
        className={`${
          startingPage === 0 ? "bg-slate-100" : "bg-red-100"
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
              page === currentPage ? "bg-blue-300" : "bg-blue-100"
            } h-12 w-12 px-2 py-2 font-bold rounded-xl`}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={increment}
        className={`${
          startingPage + 1 === lastStartingPage ? "bg-slate-100" : "bg-red-100"
        } h-12 w-12 px-2 py-2 font-bold rounded-xl`}
        disabled={startingPage + 1 === lastStartingPage}
      >
        ⟩
      </button>
    </div>
  );
}

export default Pagination;
