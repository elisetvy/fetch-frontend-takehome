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
  const pages = [];
  const totalPages = Math.ceil(totalDogs / dogsPerPage);

  let pageCap = currentPage + 10;

  if (pageCap > totalPages) {
    pageCap = totalPages;
  }

  for (let i = currentPage; i < pageCap; i++) {
    pages.push(i);
  }
  console.log(totalDogs);

  return (
    <div className="mt-10 flex flex-wrap gap-2 md:gap-10 justify-center">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            value={page}
            onClick={() => setCurrentPage(page)}
            className="bg-blue-100 h-12 w-12 px-2 py-2 font-bold rounded-xl"
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
