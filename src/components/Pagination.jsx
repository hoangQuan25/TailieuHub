// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null; // Don't show pagination if only one page

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

    // Basic number buttons (optional, can get complex)
    // const pageNumbers = [];
    // for (let i = 1; i <= totalPages; i++) {
    //     pageNumbers.push(i);
    // }

    return (
        <div className="flex justify-center items-center space-x-4 mt-6">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
                Previous
            </button>
            <span className="text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            {/* Optional: Render page number buttons here */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;