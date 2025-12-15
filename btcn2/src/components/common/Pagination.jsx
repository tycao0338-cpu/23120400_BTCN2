import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

/**
 * Pagination - Reusable pagination component
 * - Professional style với page numbers, ellipsis, first/last buttons
 * - Hiển thị thông tin "Showing X to Y of Z"
 * - Dark mode support
 *
 * @param {number} currentPage - Trang hiện tại
 * @param {number} totalPages - Tổng số trang
 * @param {number} totalItems - Tổng số items
 * @param {number} itemsPerPage - Số items mỗi trang
 * @param {function} onPageChange - Callback khi chuyển trang
 * @param {string} itemLabel - Label cho items (e.g., "results", "reviews")
 */
export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  itemLabel = "results",
}) {
  // Don't render if only 1 page
  if (!totalPages || totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Calculate showing range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {/* Page Info */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-700 dark:text-white">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-700 dark:text-white">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-700 dark:text-white">
          {totalItems}
        </span>{" "}
        {itemLabel}
      </p>

      {/* Pagination Buttons */}
      <nav className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage <= 1}
          className="p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="First page"
        >
          <ChevronsLeft
            size={18}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>

        {/* Previous */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Previous page"
        >
          <ChevronLeft size={18} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-2">
          {(() => {
            const pages = [];
            const total = totalPages;
            const current = currentPage;

            // Always show first page
            if (current > 3) {
              pages.push(
                <button
                  key={1}
                  onClick={() => goToPage(1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-medium transition-all"
                >
                  1
                </button>
              );
              if (current > 4) {
                pages.push(
                  <span key="start-ellipsis" className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
            }

            // Pages around current
            for (
              let i = Math.max(1, current - 2);
              i <= Math.min(total, current + 2);
              i++
            ) {
              pages.push(
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    i === current
                      ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg"
                      : "border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {i}
                </button>
              );
            }

            // Always show last page
            if (current < total - 2) {
              if (current < total - 3) {
                pages.push(
                  <span key="end-ellipsis" className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              pages.push(
                <button
                  key={total}
                  onClick={() => goToPage(total)}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-medium transition-all"
                >
                  {total}
                </button>
              );
            }

            return pages;
          })()}
        </div>

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Next page"
        >
          <ChevronRight
            size={18}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>

        {/* Last Page */}
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Last page"
        >
          <ChevronsRight
            size={18}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
