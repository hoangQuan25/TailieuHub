// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ large = false }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents, subjects, majors..."
                className={`flex-grow ${large ? 'p-3 text-lg' : 'p-2'} border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black`} // Added text-black
            />
            <button
                type="submit"
                className={`${large ? 'p-3 text-lg' : 'p-2'} bg-blue-500 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;