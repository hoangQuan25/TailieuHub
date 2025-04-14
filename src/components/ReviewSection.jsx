// src/components/ReviewSection.jsx
import React, { useState } from 'react'; // Import useState
import Modal from './Modal';
import Pagination from './Pagination'; // Import Pagination component

const REVIEWS_PER_PAGE = 5; // Number of reviews per page

const ReviewSection = ({ reviews = [], onAddReview, entityType }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewStars, setNewReviewStars] = useState(0);

    // --- Pagination State ---
    const [currentReviewPage, setCurrentReviewPage] = useState(1);
    // --- End Pagination State ---

    const handleAddReviewClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewReviewText('');
        setNewReviewStars(0);
    };

    const handleSubmitReview = () => {
        // Basic validation
        if (entityType === 'document' && newReviewStars === 0) {
            alert('Vui lòng chọn số sao đánh giá.'); // Translate if needed
            return;
        }
         if (!newReviewText.trim()) {
             alert('Vui lòng nhập nội dung đánh giá.'); // Translate if needed
             return;
         }

        const reviewData = {
            user: 'CurrentUser', // Mock user
            comment: newReviewText,
            date: new Date().toISOString().split('T')[0],
            ...(entityType === 'document' && { stars: newReviewStars })
        };
        onAddReview(reviewData); // Pass data up to parent

        // Reset form and close modal (parent will update 'reviews' prop)
        // Optionally: Calculate and navigate to the last page after adding.
        // For simplicity now, we'll let the parent update trigger re-render.
        handleCloseModal();
    };

    // --- Pagination Logic ---
    const totalReviewPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
    const startIndex = (currentReviewPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    // Slice the reviews array to get only items for the current page
    const currentReviews = reviews.slice(startIndex, endIndex);

    const handleReviewPageChange = (page) => {
        if (page >= 1 && page <= totalReviewPages) {
            setCurrentReviewPage(page);
        }
    };
    // --- End Pagination Logic ---

    return (
        <div className="mt-8 pt-6 border-t border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Đánh giá ({reviews.length})</h3> {/* Show total count */}

            {reviews.length === 0 ? (
                <p className="text-gray-600 mb-6">Chưa có đánh giá nào.</p> // Adjusted margin
            ) : (
                <> {/* Use fragment */}
                    {/* List of reviews for the current page */}
                    <ul className="space-y-4 mb-6">
                         {/* Map over currentReviews instead of all reviews */}
                        {currentReviews.map((review, index) => (
                            <li key={review.id || `${startIndex + index}`} className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50">
                                {entityType === 'document' && review.stars != null && ( // Check stars exist
                                    <p className="text-yellow-500 font-bold mb-1"> {/* Added margin */}
                                        Rating: {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)} {/* Simple full/empty stars */}
                                    </p>
                                )}
                                <p className="font-semibold">{review.user} <span className="text-sm text-gray-500 font-normal">- {review.date}</span></p>
                                <p className="mt-1 text-gray-700">{review.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination Controls - Render if more than one page */}
                    {totalReviewPages > 1 && (
                         <Pagination
                             currentPage={currentReviewPage}
                             totalPages={totalReviewPages}
                             onPageChange={handleReviewPageChange}
                         />
                    )}
                </>
            )}

            {/* Add Review Button */}
            <button
                onClick={handleAddReviewClick}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" // Adjusted margin
            >
                Thêm đánh giá {/* Translated */}
            </button>

            {/* Add Review Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-lg font-medium mb-4">Viết đánh giá của bạn</h2> {/* Translated */}
                {entityType === 'document' && (
                     <div className="mb-4">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá:</label> {/* Translated */}
                         <div className="flex space-x-1">
                             {[1, 2, 3, 4, 5].map(star => (
                                 <button
                                     key={star}
                                     type="button" // Add type="button"
                                     onClick={() => setNewReviewStars(star)}
                                     className={`text-2xl ${newReviewStars >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
                                     aria-label={`Rate ${star} stars`}
                                 >
                                     ★ {/* Use solid star for selection */}
                                 </button>
                             ))}
                         </div>
                     </div>
                )}
                <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder={entityType === 'document' ? "Chia sẻ cảm nghĩ về tài liệu này..." : "Chia sẻ kinh nghiệm về môn học này..."} // Translated
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end space-x-2">
                     <button
                        type="button" // Add type="button"
                        onClick={handleCloseModal}
                         className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                     >
                         Hủy {/* Translated */}
                     </button>
                     <button
                        type="button" // Add type="button"
                        onClick={handleSubmitReview}
                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                         Gửi đánh giá {/* Translated */}
                     </button>
                </div>
            </Modal>
        </div>
    );
};

export default ReviewSection;