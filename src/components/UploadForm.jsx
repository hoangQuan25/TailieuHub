// src/components/UploadForm.jsx
import React, { useState, useEffect } from 'react';
import { majors, subjects as allSubjects } from '../data/mockData'; // Import data
import { toast } from 'react-toastify'; // Import toast

// Define categories directly here or import them if defined elsewhere
const documentCategories = ['Curriculum', 'Slide', 'Reference Book', 'Exercise', 'Test'];

// Props:
// - onClose: Function to close the modal
const UploadForm = ({ onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentName, setDocumentName] = useState('');
    const [selectedMajorId, setSelectedMajorId] = useState('');
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Update available subjects when major changes
    useEffect(() => {
        if (selectedMajorId) {
            const major = majors.find(m => m.id === selectedMajorId);
            const subjectIds = major?.subjects || [];
            const filteredSubjects = allSubjects.filter(s => subjectIds.includes(s.id));
            setAvailableSubjects(filteredSubjects);
            setSelectedSubjectId(''); // Reset subject selection when major changes
        } else {
            setAvailableSubjects([]); // No major selected, no subjects available
            setSelectedSubjectId('');
        }
    }, [selectedMajorId]);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Basic validation (in a real app, add more)
        if (!selectedFile || !documentName || !selectedMajorId || !selectedSubjectId || !selectedCategory) {
            toast.error("Please fill in all fields and select a file.");
            return;
        }

        // --- Mock Upload Logic ---
        console.log("Simulating upload with:", {
            fileName: selectedFile.name,
            documentName,
            majorId: selectedMajorId,
            subjectId: selectedSubjectId,
            category: selectedCategory,
        });
        // In a real app, you would use FormData and fetch/axios to send to backend here

        // Simulate success
        toast.success("Uploaded successfully! Admin team will handle this real quick");
        onClose(); // Close the modal after simulated success
        // --- End Mock Upload Logic ---
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Upload Document</h2>

            {/* File Input */}
            <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                    Choose File <span className="text-red-500">*</span>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    required
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {selectedFile && <p className="text-xs text-gray-500 mt-1">Selected: {selectedFile.name}</p>}
            </div>

            {/* Document Name */}
            <div>
                <label htmlFor="doc-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Document Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="doc-name"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    required
                    placeholder="e.g., Chapter 1 Slides, Midterm 2024"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Major Dropdown */}
            <div>
                <label htmlFor="major-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Major <span className="text-red-500">*</span>
                </label>
                <select
                    id="major-select"
                    value={selectedMajorId}
                    onChange={(e) => setSelectedMajorId(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="" disabled>-- Select Major --</option>
                    {majors.map((major) => (
                        <option key={major.id} value={major.id}>
                            {major.code} - {major.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Subject Dropdown (depends on Major) */}
            <div>
                <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                </label>
                <select
                    id="subject-select"
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    required
                    disabled={!selectedMajorId || availableSubjects.length === 0} // Disable if no major or no subjects
                    className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
                >
                    <option value="" disabled>-- Select Subject --</option>
                    {availableSubjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                            {subject.code} - {subject.name}
                        </option>
                    ))}
                    {selectedMajorId && availableSubjects.length === 0 && (
                         <option value="" disabled>No subjects found for selected major</option>
                    )}
                </select>
            </div>

            {/* Category Dropdown */}
            <div>
                <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                </label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="" disabled>-- Select Category --</option>
                    {documentCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button" // Important: type="button" to prevent form submission
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Upload
                </button>
            </div>
        </form>
    );
};

export default UploadForm;