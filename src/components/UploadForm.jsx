// src/components/UploadForm.jsx
import React, { useState, useRef, useEffect } from "react"; // Added useRef, useEffect
import { subjects as allSubjects, documentCategories } from "../data/mockData";
import { toast } from "react-toastify";

const removeDiacritics = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase();
};

const UploadForm = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  // State for the text typed into the subject input
  const [subjectSearchQuery, setSubjectSearchQuery] = useState("");
  // State for the list of matching subject suggestions
  const [subjectSuggestions, setSubjectSuggestions] = useState([]);
  // State to hold the ID of the *selected* subject from suggestions
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  // State to control visibility of the suggestions dropdown
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const subjectInputRef = useRef(null); // Ref for focus/blur handling if needed

  const handleFileChange = (event) => {
    // ... (remains the same) ...
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // --- Subject Autocomplete Logic ---
  const handleSubjectInputChange = (event) => {
    const query = event.target.value;
    setSubjectSearchQuery(query);
    setSelectedSubjectId(""); // Clear selection if user types again

    if (query.trim().length > 0) {
      // Normalize the search query
      const normalizedQuery = removeDiacritics(query);

      // Filter subjects using normalized query and normalized data
      const filtered = allSubjects.filter(
        (subject) =>
          removeDiacritics(subject.name).includes(normalizedQuery) ||
          removeDiacritics(subject.code).includes(normalizedQuery)
      );
      setSubjectSuggestions(filtered.slice(0, 10)); // Limit suggestions
      setShowSuggestions(true);
    } else {
      setSubjectSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (subject) => {
    setSubjectSearchQuery(`${subject.code} - ${subject.name}`); // Show selected in input
    setSelectedSubjectId(subject.id); // Set the actual selected ID
    setSubjectSuggestions([]); // Clear suggestions
    setShowSuggestions(false); // Hide suggestions
  };

  // Hide suggestions when clicking outside - using onMouseDown on suggestions helps
  // A more robust solution might use a dedicated hook or library
  const handleBlur = (e) => {
    // Delay hiding slightly to allow click on suggestion to register
    setTimeout(() => {
      // Check if the focus is moving to a suggestion item (less reliable)
      // or just hide unconditionally for simplicity in mock
      setShowSuggestions(false);
    }, 150); // 150ms delay
  };
  // --- End Subject Autocomplete Logic ---

  const handleSubmit = (event) => {
    event.preventDefault();
    // Updated validation: Check selectedSubjectId is set (meaning a suggestion was clicked)
    if (
      !selectedFile ||
      !documentName ||
      !selectedSubjectId ||
      !selectedCategory
    ) {
      // Make error message more specific if subject is the issue
      let errorMsg = "Vui lòng điền đủ các trường và chọn file.";
      if (!selectedSubjectId && subjectSearchQuery) {
        errorMsg = "Vui lòng chọn một môn học từ danh sách gợi ý.";
      } else if (!selectedSubjectId) {
        errorMsg = "Vui lòng tìm và chọn một môn học.";
      }
      toast.error(errorMsg);
      return;
    }

    console.log("Simulating upload with:", {
      // ... (same logging) ...
      fileName: selectedFile.name,
      documentName,
      subjectId: selectedSubjectId,
      category: selectedCategory,
    });

    toast.success("Tải lên thành công! Đội ngũ quản trị viên sẽ xử lý sớm.");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload tài liệu
      </h2>

      {/* File Input */}
      <div>
        {/* ... (File input label and input remain the same) ... */}
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Chọn File <span className="text-red-500">*</span>
        </label>
        <input
          id="file-upload"
          type="file"
          required
          onChange={handleFileChange} /* ... classes ... */
        />
        {selectedFile && (
          <p className="text-xs text-gray-500 mt-1">
            Đã chọn: {selectedFile.name}
          </p>
        )}
      </div>

      {/* Document Name */}
      <div>
        {/* ... (Document name label and input remain the same) ... */}
        <label
          htmlFor="doc-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tên tài liệu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="doc-name"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          required
          placeholder="Ví dụ: Slide Chương 1, Đề giữa kỳ 2024" /* ... classes ... */
        />
      </div>

      {/* UPDATED Subject Autocomplete Input */}
      <div className="relative" ref={subjectInputRef}>
        {" "}
        {/* Added relative positioning and ref */}
        <label
          htmlFor="subject-search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Môn học <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject-search"
          placeholder="Nhập mã hoặc tên môn học để tìm..." // New placeholder
          value={subjectSearchQuery}
          onChange={handleSubjectInputChange}
          onBlur={handleBlur} // Hide suggestions on blur (with delay)
          // Optional: onFocus={() => setShowSuggestions(true)} // Show suggestions on focus if desired
          autoComplete="off" // Prevent browser autocomplete interference
          className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* Suggestions Dropdown */}
        {showSuggestions && subjectSuggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-20">
            {subjectSuggestions.map((subject) => (
              <li
                key={subject.id}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                // Use onMouseDown to handle click before blur hides the list
                onMouseDown={() => handleSuggestionClick(subject)}
              >
                {subject.code} - {subject.name}
              </li>
            ))}
          </ul>
        )}
        {/* Optional: Show message when typing but no matches */}
        {showSuggestions &&
          subjectSearchQuery &&
          subjectSuggestions.length === 0 && (
            <div className="absolute left-0 right-0 mt-1 p-3 bg-white border border-gray-300 rounded-md shadow-lg z-20 text-sm text-gray-500">
              Không tìm thấy môn học nào.
            </div>
          )}
      </div>

      {/* Category Dropdown (remains the same) */}
      <div>
        <label
          htmlFor="category-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phân loại <span className="text-red-500">*</span>
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            -- Chọn phân loại --
          </option>
          {documentCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons (remain the same) */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Hủy {/* Translated */}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Tải lên {/* Translated */}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
