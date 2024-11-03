import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  console.log('currentPage', currentPage);
  // Handle page click
  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    onPageChange(selectedPage);
  };

  return (
    <nav aria-label="Page navigation example" className="my-1">
      <ReactPaginate
        previousLabel={
          <svg
            className="w-2.5 h-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        }
        nextLabel={
          <svg
            className="w-2.5 h-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        }
        breakLabel="..."
        pageCount={lastPage}
        marginPagesDisplayed={4}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex items-center -space-x-px h-8 text-sm"
        pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight border text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        activeClassName="pagination-active"
        previousClassName={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border ${
          currentPage === 1
            ? 'text-gray-300 bg-gray-200 cursor-not-allowed'
            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        } rounded-s-lg`}
        nextClassName={`flex items-center justify-center px-3 h-8 leading-tight border ${
          currentPage === lastPage
            ? 'text-gray-300 bg-gray-200 cursor-not-allowed'
            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        } rounded-e-lg`}
        disabledClassName="cursor-not-allowed opacity-50"
      />
    </nav>
  );
};

export default Pagination;
