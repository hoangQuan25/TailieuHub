// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const [query, setQuery] = useState('');
    const [searchFilter, setSearchFilter] = useState('all'); // 'all', 'subject', 'major', 'document'
    const navigate = useNavigate(); // Initialize navigate

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (query.trim()) {
            // Navigate with query and filter parameters
            navigate(`/search?q=${encodeURIComponent(query.trim())}&filter=${searchFilter}`);
        } else {
             // Optional: handle empty query submission (e.g., show error, do nothing)
             console.log("Search query is empty");
        }
    };

    // Helper function for button styling
    const getButtonClass = (filterType) => {
        const baseClass = "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out";
        if (searchFilter === filterType) {
            return `${baseClass} bg-blue-600 text-white shadow-sm`; // Active style
        } else {
            return `${baseClass} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50`; // Inactive style
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center p-8"> {/* Adjust min-height */}
             <h1 className="text-5xl font-bold mb-4 text-blue-700">TailieuHub</h1>
             <p className="text-xl text-gray-600 mb-8">Tìm kiếm và chia sẻ tài liệu của bạn.</p>

             {/* Form wraps SearchBar and filters */}
             <form onSubmit={handleSearchSubmit} className="w-full max-w-xl">
                 <SearchBar
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     placeholder="Search documents, subjects, majors..."
                 />

                {/* Filter Options */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                     <span className="text-gray-600 text-sm font-medium">Hoặc tìm kiếm theo:</span>
                     <button
                         type="button" // Important: Prevent form submission on click
                         onClick={() => setSearchFilter('subject')}
                         className={getButtonClass('subject')}
                     >
                         Môn học
                     </button>
                     <button
                         type="button" // Important: Prevent form submission on click
                         onClick={() => setSearchFilter('major')}
                         className={getButtonClass('major')}
                     >
                         Chuyên ngành
                     </button>
                     {/* ADDED: Button for document filter */}
                     <button
                         type="button"
                         onClick={() => setSearchFilter('document')}
                         className={getButtonClass('document')}
                     >
                         Tài liệu
                     </button>
                      {/* Optional: Add an "All" button to reset filter */}
                      <button
                         type="button"
                         onClick={() => setSearchFilter('all')}
                         className={getButtonClass('all')}
                     >
                         Tất cả
                     </button>
                 </div>

                 {/* Hidden submit button allows pressing Enter in input to submit form */}
                 <button type="submit" className="hidden">Submit</button>
             </form>
        </div>
    );
};

export default HomePage;