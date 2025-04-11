// src/components/Header.jsx
import React, { useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Modal from "./Modal"; // Import Modal
import UploadForm from "./UploadForm"; // Import UploadForm

const Header = () => {
  // State to control upload modal visibility
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      {" "}
      {/* Use Fragment to return multiple elements */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md relative z-10">
        {" "}
        {/* Add z-index */}
        <Link to="/" className="text-2xl font-bold">
          TailieuHub
        </Link>
        {/* Search Bar and Upload Button Container */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsUploadModalOpen(true)} // Open modal on click
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            title="Upload a document" // Tooltip
          >
            Upload your document
          </button>
          <div className="w-64 md:w-96">
            {" "}
            {/* Adjust width as needed */}
            <SearchBar />
          </div>
        </div>
      </header>
      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      >
        <UploadForm onClose={() => setIsUploadModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Header;
