import React from "react";

const Pagination = ({
  currentPage,     // 0-based
  totalPages,
  onPageChange,
  maxVisible = 5,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(0, currentPage - half);
    let end = Math.min(totalPages - 1, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(0, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center mt-6">
      <div className="inline-flex items-center gap-1 bg-white border rounded-lg shadow-sm px-2 py-1">

        {/* PREVIOUS */}
        <button
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition
            ${
              currentPage === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          ◀
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition
              ${
                page === currentPage
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {page + 1}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition
            ${
              currentPage === totalPages - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Pagination;
