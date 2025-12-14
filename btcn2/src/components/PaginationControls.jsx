import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";

/**
 * PaginationControls - A reusable pagination component
 * 
 * @param {Object} props
 * @param {number} props.currentPage - The current active page (1-indexed)
 * @param {number} props.totalPages - The total number of pages
 * @param {function} props.onPageChange - Callback function when page changes, receives new page number
 */
export function PaginationControls({ currentPage, totalPages, onPageChange }) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4">
            <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Page {currentPage} of {totalPages}
            </span>

            <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default PaginationControls;
