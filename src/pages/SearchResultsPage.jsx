// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { findData } from "../data/mockData";
import StarRating from "../components/StarRating"; // Assuming you have this
import Pagination from "../components/Pagination"; // Assuming you have this

const ITEMS_PER_PAGE = 6; // Number of results per page

const legendItems = [
  {
    label: "Tài liệu",
    colorClass: "bg-white",
    borderClass: "border border-gray-300",
  }, // Add border for white
  { label: "Môn học", colorClass: "bg-yellow-100", borderClass: "" },
  { label: "Ngành học", colorClass: "bg-green-100", borderClass: "" },
];

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "all"; // Get filter param, default to 'all'

  const [filteredResults, setFilteredResults] = useState([]); // Results *after* type filter
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    // 1. Get all potential results based on query
    const combinedResults = findData(query);

    // 2. Apply the type filter based on the URL parameter
    let resultsToDisplay = [];
    if (filter === "subject") {
      resultsToDisplay = combinedResults.filter(
        (item) => item.resultType === "subject"
      );
    } else if (filter === "major") {
      resultsToDisplay = combinedResults.filter(
        (item) => item.resultType === "major"
      );
    } else {
      // filter === 'all' or default
      resultsToDisplay = combinedResults;
    }

    setFilteredResults(resultsToDisplay); // Store the finally filtered results
    setCurrentPage(1); // Reset to page 1 on new search/filter
    setLoading(false);
  }, [query, filter]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredResults.slice(startIndex, endIndex);
  // --- End Pagination Logic ---

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Optional: Scroll to top on page change
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Đang load...</div>;
  }

  const noResultsMessage = () => {
    if (filter === "subject") return `No subjects found matching "${query}".`;
    if (filter === "major") return `No majors found matching "${query}".`;
    return `No results found for "${query}".`; // Default/All
  };

  const hasResults = filteredResults.length > 0;

  // Helper to get link based on item type
  const getLinkForItem = (item) => {
    switch (item.resultType) {
      case "document":
        return `/document/${item.id}`;
      case "subject":
        return `/subject/${item.id}`;
      case "major":
        return `/major/${item.id}`;
      default:
        return "#"; // Should not happen
    }
  };

  // Helper to get style based on item type
  const getStyleForItem = (itemType) => {
    switch (itemType) {
      case "document":
        return "bg-white";
      case "subject":
        return "bg-yellow-100";
      case "major":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* --- Top Section Wrapper (Title + Legend) --- */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        {" "}
        {/* Added gap-4 */}
        {/* Left Side (Title + Filter Info) */}
        <div className="mb-0">
          {" "}
          {/* Removed sm:mb-0 */}
          {/* ... Title and filter info ... */}
          <h2 className="text-2xl font-semibold mb-1">
            Kết quả tìm kiếm cho "{query}"
          </h2>
          <p className="text-sm text-gray-500">
            Lọc theo:{" "}
            <span className="font-medium capitalize">
              {filter === "all" ? "Tất cả" : filter}
            </span>
          </p>
        </div>
        {/* MODIFIED: Right Side (Legend) */}
        {/* Use padding, bg-white for standout, keep border/shadow */}
        <div className="border border-gray-200 rounded-md p-3 bg-white shadow-sm">
          {/* Removed Title or keep it if desired: <h4 className="font-semibold mb-2 text-gray-700">Chú thích</h4> */}
          {/* Changed to horizontal layout using flex, gap and wrap */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legendItems.map((item) => (
              <div key={item.label} className="flex items-center space-x-1.5">
                {" "}
                {/* Reduced space slightly */}
                <span
                  // Increased swatch size
                  className={`inline-block w-4 h-4 rounded-sm ${item.colorClass} ${item.borderClass}`}
                  aria-hidden="true"
                ></span>
                {/* Increased text size */}
                <span className="text-gray-700 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* End MODIFIED Legend */}
      </div>
      {/* --- End Top Section Wrapper --- */}

      {!hasResults ? (
        // Use dynamic no results message
        <p>{noResultsMessage()}</p>
      ) : (
        <>
          <ul className="space-y-4">
            {/* Map over currentItems (paginated subset of filteredResults) */}
            {currentItems.map((item) => (
              <li
                key={`${item.resultType}-${item.id}`}
                className={`p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow ${getStyleForItem(
                  item.resultType
                )}`}
              >
                <Link to={getLinkForItem(item)} className="block">
                  {/* Render content based on type */}
                  {item.resultType === "document" && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-600">
                          {item.name}
                        </span>
                        {item.stars != null && (
                          <StarRating rating={item.stars} />
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        Loại: Tài liệu | Phân loại: {item.category}
                      </span>
                    </>
                  )}
                  {item.resultType === "subject" && (
                    <>
                      <span className="font-medium text-yellow-800">
                        {item.code} - {item.name}
                      </span>
                      <br />
                      <span className="text-sm text-gray-600">
                        Loại: Môn học | Phân loại: {item.category}
                      </span>
                    </>
                  )}
                  {item.resultType === "major" && (
                    <>
                      <span className="font-medium text-green-800">
                        {item.code} - {item.name}
                      </span>
                      <br />
                      <span className="text-sm text-gray-600">
                        Loại: Chuyên ngành
                      </span>
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
