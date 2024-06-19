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
  const pages = [];

  for (let i = startingPage + 1; i <= startingPage + buttonsPerPage; i++) {
    pages.push(i);
  }
  console.log("starting page = ", startingPage);
  console.log(pages, "PAGES ARE");

  function decrement() {
    setCurrentPage(startingPage - buttonsPerPage);
  }

  function increment() {
    setCurrentPage(startingPage + buttonsPerPage);
  }

  // const pages = [];
  // const totalPages = Math.ceil(totalDogs / dogsPerPage);

  // let pageCap = currentPage + 5;

  // if (pageCap > totalPages) {
  //   pageCap = totalPages;
  // }

  // for (let i = currentPage; i < pageCap; i++) {
  //   pages.push(i);
  // }

  return (
    <div className="mt-10 flex flex-wrap gap-4 justify-center border-2 border-green-400">
      <button
        onClick={decrement}
        className="bg-red-100 h-12 w-12 px-2 py-2 font-bold rounded-xl"
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
        className="bg-red-100 h-12 w-12 px-2 py-2 font-bold rounded-xl"
      >
        ⟩
      </button>
    </div>
  );
}

export default Pagination;
