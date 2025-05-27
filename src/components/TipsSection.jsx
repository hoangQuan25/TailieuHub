// src/components/TipsSection.jsx
import React, { useState, useEffect } from 'react';
import { AiOutlineLike, AiOutlinePaperClip, AiOutlineCloseCircle } from 'react-icons/ai'; // Added icons
import Modal from './Modal'; // Assuming you have this generic Modal component
import Pagination from './Pagination'; // Assuming you have this

const TIPS_PER_PAGE = 5;
const MAX_IMAGES_PER_TIP = 10;
const MOCK_IMAGE_URLS = ['/meohoc1.jpeg', '/meohoc2.jpg']; // Your mock images in /public

const TipsSection = ({ tips = [], onAddTip, onLikeTip }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTipText, setNewTipText] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]); // To store File objects for UI feedback
    const [imagePreviews, setImagePreviews] = useState([]); // To store data URLs for preview
    const [currentPage, setCurrentPage] = useState(1);

    const handleAddTipClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewTipText('');
        setSelectedFiles([]);
        imagePreviews.forEach(url => URL.revokeObjectURL(url)); // Clean up preview URLs
        setImagePreviews([]);
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const totalFilesAfterAdd = selectedFiles.length + files.length;

        if (totalFilesAfterAdd > MAX_IMAGES_PER_TIP) {
            alert(`Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES_PER_TIP} hình ảnh.`);
            // Clear the file input to prevent re-adding the same oversized batch
            event.target.value = null;
            return;
        }

        // Store File objects (though we won't actually "upload" them in this mock)
        setSelectedFiles(prevFiles => [...prevFiles, ...files].slice(0, MAX_IMAGES_PER_TIP));

        // Create and store preview URLs
        const newPreviews = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews].slice(0, MAX_IMAGES_PER_TIP));
        
        // Clear the file input to allow selecting the same file again if removed then re-added
        event.target.value = null; 
    };

    const handleRemoveImage = (indexToRemove) => {
        URL.revokeObjectURL(imagePreviews[indexToRemove].url); // Clean up specific preview URL

        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
        setImagePreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmitTip = () => {
        if (!newTipText.trim() && selectedFiles.length === 0) {
            alert('Vui lòng nhập nội dung mẹo hoặc chọn hình ảnh.');
            return;
        }

        // For mocking: if images were selected, assign mock URLs
        const tipImagesData = [];
        if (selectedFiles.length > 0) {
            // Add up to the number of selected files, using available mock images
            for (let i = 0; i < selectedFiles.length && i < MOCK_IMAGE_URLS.length; i++) {
                tipImagesData.push(MOCK_IMAGE_URLS[i]);
            }
            // If more files were "selected" than mock images available, you might want to repeat or just cap it.
            // This example just caps at the number of available mock images.
        }

        const newTipData = {
            user: 'CurrentUser', // Mock user
            comment: newTipText,
            date: new Date().toISOString().split('T')[0],
            likes: 0,
            images: tipImagesData, // Add the array of mock image URLs
        };
        onAddTip(newTipData); // This function is passed from DocumentDetailPage
        handleCloseModal();
    };

    // Sorting and Pagination Logic (assuming similar to ReviewSection)
    const sortedTips = [...tips].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    const totalPages = Math.ceil(sortedTips.length / TIPS_PER_PAGE);
    const startIndex = (currentPage - 1) * TIPS_PER_PAGE;
    const currentTips = sortedTips.slice(startIndex, startIndex + TIPS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Mẹo học ({tips.length})</h3>

            {sortedTips.length === 0 ? (
                <p className="text-gray-600 mb-6">Chưa có mẹo học nào.</p>
            ) : (
                <>
                    <ul className="space-y-6 mb-6">
                        {currentTips.map((tip) => (
                            <li key={tip.id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                                <p className="font-semibold text-gray-800">{tip.user}
                                    <span className="text-sm text-gray-500 font-normal ml-2">- {tip.date}</span>
                                </p>
                                {tip.comment && <p className="mt-1.5 text-gray-700 whitespace-pre-wrap">{tip.comment}</p>}

                                {/* Display Images */}
                                {tip.images && tip.images.length > 0 && (
                                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                        {tip.images.map((imgUrl, index) => (
                                            <a key={index} href={imgUrl} target="_blank" rel="noopener noreferrer" className="block">
                                                <img
                                                    src={imgUrl}
                                                    alt={`Mẹo học ${tip.id} - ảnh ${index + 1}`}
                                                    className="w-full h-28 object-cover rounded-md border border-gray-300 hover:opacity-90 transition-opacity"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-3 flex items-center space-x-3">
                                    <button
                                        onClick={() => onLikeTip(tip.id)}
                                        className="group inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                                        aria-label="Like this tip"
                                    >
                                        <AiOutlineLike className="h-5 w-5 group-hover:text-blue-700 transition-colors" />
                                        <span>Thích</span>
                                    </button>
                                    <span className="text-sm text-gray-600">({tip.likes || 0} lượt thích)</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {totalPages > 1 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    )}
                </>
            )}

            <button
                onClick={handleAddTipClick}
                className="mt-6 px-5 py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            >
                Thêm mẹo học
            </button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-semibold mb-5 text-gray-800">Chia sẻ mẹo học của bạn</h2>
                <textarea
                    value={newTipText}
                    onChange={(e) => setNewTipText(e.target.value)}
                    placeholder="Nội dung mẹo học..."
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Image Upload Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thêm hình ảnh (tối đa {MAX_IMAGES_PER_TIP}):
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                    <div className="mb-5 p-3 border border-dashed border-gray-300 rounded-md">
                        <p className="text-sm text-gray-600 mb-2">Xem trước ({imagePreviews.length}/{MAX_IMAGES_PER_TIP}):</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group aspect-square">
                                    <img src={preview.url} alt={`Xem trước ${index + 1}`} title={preview.name} className="w-full h-full object-cover rounded-md border border-gray-200" />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md opacity-80 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-400"
                                        aria-label="Remove image"
                                    >
                                        <AiOutlineCloseCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmitTip}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Gửi mẹo
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default TipsSection;