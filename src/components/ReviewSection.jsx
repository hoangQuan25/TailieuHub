// src/components/ReviewSection.jsx
import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import Modal from './Modal';
import Pagination from './Pagination';

const REVIEWS_PER_PAGE = 5;

// Add onLikeReview to props
const ReviewSection = ({ reviews = [], onAddReview, entityType, onLikeReview }) => {
     console.log("🔍 onLikeReview is", onLikeReview);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewStars, setNewReviewStars] = useState(0);
    const [currentReviewPage, setCurrentReviewPage] = useState(1);

    const handleAddReviewClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewReviewText('');
        setNewReviewStars(0);
    };

    const handleSubmitReview = () => {
        if (entityType === 'document' && newReviewStars === 0) {
            alert('Vui lòng chọn số sao đánh giá.');
            return;
        }
        if (!newReviewText.trim()) {
            alert('Vui lòng nhập nội dung đánh giá.');
            return;
        }

        const reviewData = {
            user: 'CurrentUser', // Mock user
            comment: newReviewText,
            date: new Date().toISOString().split('T')[0],
            likes: 0, // Initialize likes for new reviews
            ...(entityType === 'document' && { stars: newReviewStars })
        };
        onAddReview(reviewData);
        handleCloseModal();
    };

    // --- Sorting Logic ---
    // Create a sorted copy of reviews based on likes (descending)
    const sortedReviews = [...reviews].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    // --- End Sorting Logic ---

    // --- Pagination Logic (use sortedReviews) ---
    const totalReviewPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE); // Use sorted length
    const startIndex = (currentReviewPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    // Slice the sortedReviews array for the current page
    const currentReviews = sortedReviews.slice(startIndex, endIndex);

    const handleReviewPageChange = (page) => {
        if (page >= 1 && page <= totalReviewPages) {
            setCurrentReviewPage(page);
        }
    };
    // --- End Pagination Logic ---

    return (
        <div className="mt-8 pt-6 border-t border-gray-300">
            {/* Show total count from original reviews array */}
            <h3 className="text-xl font-semibold mb-4">Đánh giá ({reviews.length})</h3>

            {sortedReviews.length === 0 ? ( // Check sortedReviews for emptiness
                <p className="text-gray-600 mb-6">Chưa có đánh giá nào.</p>
            ) : (
                <>
                    <ul className="space-y-4 mb-6">
                         {/* Map over currentReviews (which are sorted and paginated) */}
                        {currentReviews.map((review) => ( // Removed index as key is now mandatory via review.id
                            <li key={review.id} className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50">
                                {entityType === 'document' && review.stars != null && (
                                    <p className="text-yellow-500 font-bold mb-1">
                                        Rating: {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                                    </p>
                                )}
                                <p className="font-semibold">{review.user} <span className="text-sm text-gray-500 font-normal">- {review.date}</span></p>
                                <p className="mt-1 text-gray-700">{review.comment}</p>

                                {/* --- Like Button and Count --- */}
                                <div className="mt-2 flex items-center space-x-2">
                                    <button
                                        onClick={() => onLikeReview(review.id)}
                                        className="group inline-flex items-center justify-center space-x-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-150 ease-in-out transform hover:scale-105"
                                        aria-label="Like this review"
                                    >
                                        {/* You could add logic here to show AiFillLike if the review is already liked by the current user */}
                                        <AiOutlineLike className="h-5 w-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
                                        <span>Like</span>
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        ({review.likes || 0} likes) {/* Display likes count */}
                                    </span>
                                </div>
                                {/* --- End Like Button and Count --- */}
                            </li>
                        ))}
                    </ul>

                    {totalReviewPages > 1 && (
                         <Pagination
                             currentPage={currentReviewPage}
                             totalPages={totalReviewPages}
                             onPageChange={handleReviewPageChange}
                         />
                    )}
                </>
            )}

            <button
                onClick={handleAddReviewClick}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Thêm đánh giá
            </button>

            {/* Add Review Modal (remains the same) */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                 <h2 className="text-lg font-medium mb-4">Viết đánh giá của bạn</h2>
                 {entityType === 'document' && (
                     <div className="mb-4">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá:</label>
                         <div className="flex space-x-1">
                             {[1, 2, 3, 4, 5].map(star => (
                                 <button
                                     key={star}
                                     type="button"
                                     onClick={() => setNewReviewStars(star)}
                                     className={`text-2xl ${newReviewStars >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
                                     aria-label={`Rate ${star} stars`}
                                 >
                                     ★
                                 </button>
                             ))}
                         </div>
                     </div>
                 )}
                 <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder={entityType === 'document' ? "Chia sẻ cảm nghĩ về tài liệu này..." : "Chia sẻ kinh nghiệm về môn học này..."}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                 <div className="flex justify-end space-x-2">
                     <button
                        type="button"
                        onClick={handleCloseModal}
                         className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                     >
                         Hủy
                     </button>
                     <button
                        type="button"
                        onClick={handleSubmitReview}
                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                         Gửi đánh giá
                     </button>
                 </div>
            </Modal>
        </div>
    );
};

export default ReviewSection;