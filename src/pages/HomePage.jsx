// src/pages/HomePage.jsx
import React from 'react';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center p-8"> {/* Adjust min-height based on header height */}
             <h1 className="text-5xl font-bold mb-4 text-blue-700">TailieuHub</h1>
             <p className="text-xl text-gray-600 mb-8">Find and share documents for your university subjects.</p>
             <div className="w-full max-w-xl">
                 <SearchBar large={true} />
             </div>
        </div>
    );
};

export default HomePage;