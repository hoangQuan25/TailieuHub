// src/components/UploadForm.jsx
import React, { useState } from "react"; // Removed useEffect
// Import only what's needed: allSubjects and documentCategories
import { subjects as allSubjects, documentCategories } from "../data/mockData";
import { toast } from "react-toastify";

// Props:
// - onClose: Function to close the modal
const UploadForm = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  // Removed selectedMajorId and availableSubjects state
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Removed useEffect for filtering subjects

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Updated validation: Removed selectedMajorId check
    if (
      !selectedFile ||
      !documentName ||
      !selectedSubjectId ||
      !selectedCategory
    ) {
      toast.error("Vui lòng điền đủ các trường và chọn file."); // Translated error
      return;
    }

    // --- Mock Upload Logic ---
    // Updated console log: Removed majorId
    console.log("Simulating upload with:", {
      fileName: selectedFile.name,
      documentName,
      subjectId: selectedSubjectId,
      category: selectedCategory,
    });
    // In a real app, you would use FormData and fetch/axios to send to backend here

    // Simulate success
    toast.success("Tải lên thành công! Đội ngũ quản trị viên sẽ xử lý sớm."); // Translated success
    onClose(); // Close the modal after simulated success
    // --- End Mock Upload Logic ---
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload tài liệu
      </h2>

      {/* File Input (remains the same) */}
      <div>
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
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {selectedFile && (
          <p className="text-xs text-gray-500 mt-1">
            Đã chọn: {selectedFile.name}
          </p>
        )}
      </div>

      {/* Document Name (remains the same) */}
      <div>
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
          placeholder="Ví dụ: Slide Chương 1, Đề giữa kỳ 2024" // Translated placeholder
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* REMOVED Major Dropdown */}

      {/* UPDATED Subject Dropdown */}
      <div>
        <label
          htmlFor="subject-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Môn học <span className="text-red-500">*</span>
        </label>
        <select
          id="subject-select"
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          required
          // Removed disabled attribute logic
          className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            -- Chọn môn học --
          </option>
          {/* Populate directly with all subjects */}
          {allSubjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.code} - {subject.name}
            </option>
          ))}
          {/* Removed conditional "No subjects found" option */}
        </select>
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
          {documentCategories.map(
            (
              category // Assuming you imported the Vietnamese categories
            ) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
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
