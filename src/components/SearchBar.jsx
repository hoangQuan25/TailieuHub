// src/components/SearchBar.jsx
import React from 'react'; // Removed useState
// Removed useNavigate
import { FaSearch } from 'react-icons/fa';

// Accept value and onChange props from parent
const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {

    // handleSearch logic is removed - will be handled by parent form's onSubmit

    return (
        <div className="relative w-full">
            {/* Form submission is now handled by the parent HomePage form */}
            {/* <form onSubmit={handleSearch} className="flex"> ... </form> */}

            <input
                type="text"
                value={value} // Use value prop
                onChange={onChange} // Use onChange prop
                placeholder={placeholder}
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
            {/* Icon is now purely visual within the input area,
                or could be part of a button IF the parent form needs a submit button */}
            <span
                aria-hidden="true" // Hide decorative icon from screen readers
                className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-400"
            >
                <FaSearch />
            </span>
        </div>
    );
};

export default SearchBar;