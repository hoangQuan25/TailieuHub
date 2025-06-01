// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { findData } from "../data/mockData";
import StarRating from "../components/StarRating"; // Assuming you have this
import Pagination from "../components/Pagination"; // Assuming you have this
import Modal from "../components/Modal";

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

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [documentToDownload, setDocumentToDownload] = useState(null);

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
    } else if (filter === "document") { // <-- ADDED THIS BLOCK
      resultsToDisplay = combinedResults.filter(
        (item) => item.resultType === "document"
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

  const handleOpenDownloadModal = (docItem) => {
    if (!docItem || !docItem.pdfUrl) {
      console.error(
        "Document item or PDF URL is missing for download.",
        docItem
      );
      // You could show a more user-friendly error, e.g., using a toast notification
      alert(
        "Không thể tải xuống: URL của tài liệu không hợp lệ hoặc không tồn tại."
      );
      return;
    }
    setDocumentToDownload(docItem);
    setIsDownloadModalOpen(true);
  };

  const handleCloseDownloadModal = () => {
    setIsDownloadModalOpen(false);
    setDocumentToDownload(null); // Clear the selected document
  };

  const executeDownload = () => {
    if (!documentToDownload || !documentToDownload.pdfUrl) {
      // This should ideally not happen if handleOpenDownloadModal has validated
      console.error("No document selected for download or PDF URL is missing.");
      handleCloseDownloadModal();
      return;
    }

    const link = window.document.createElement("a");
    link.href = documentToDownload.pdfUrl;
    // Sanitize filename, provide a default
    const filename = documentToDownload.name
      ? `${documentToDownload.name.replace(/[/\\?%*:|"<>]/g, "-")}.pdf`
      : "document.pdf";
    link.setAttribute("download", filename);
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    handleCloseDownloadModal(); // Close modal after download is initiated
  };

  if (loading) {
    return <div className="container mx-auto p-4">Đang load...</div>;
  }

  const noResultsMessage = () => {
    if (filter === "subject") return `No subjects found matching "${query}".`;
    if (filter === "major") return `No majors found matching "${query}".`;
    if (filter === "document") return `No documents found matching "${query}".`;
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
                    <div className="flex justify-between items-start gap-x-4">
                      {" "}
                      {/* Use items-start for better alignment if content wraps */}
                      <Link
                        to={getLinkForItem(item)}
                        className="flex-grow min-w-0"
                      >
                        {" "}
                        {/* Allow link to shrink if needed */}
                        <div className="flex justify-between items-center mb-0.5">
                          <span
                            className="font-medium text-blue-600 hover:underline truncate pr-2"
                            title={item.name}
                          >
                            {item.name}
                          </span>
                          {item.stars != null && (
                            <StarRating rating={item.stars} />
                          )}
                        </div>
                        <span className="text-sm text-gray-500 block">
                          Loại: Tài liệu | Phân loại: {item.category}
                        </span>
                      </Link>
                      {/* Download button for document type */}
                      {item.pdfUrl && ( // Only show button if pdfUrl actually exists
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleOpenDownloadModal(item);
                          }}
                          className="ml-auto flex-shrink-0 px-3 py-1.5 text-xs sm:text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 whitespace-nowrap"
                        >
                          Tải xuống
                        </button>
                      )}
                    </div>
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

      {documentToDownload && ( // Conditionally render Modal to ensure documentToDownload is not null
        <Modal isOpen={isDownloadModalOpen} onClose={handleCloseDownloadModal}>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Xác nhận tải xuống
          </h2>
          <p className="mb-6 text-gray-700">
            Bạn có chắc chắn muốn tải xuống tài liệu: <br />
            <strong className="font-medium text-gray-900 break-all">
              {documentToDownload.name || "tài liệu này"}
            </strong>
            ?
          </p>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCloseDownloadModal}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={executeDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Tải xuống
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SearchResultsPage;
