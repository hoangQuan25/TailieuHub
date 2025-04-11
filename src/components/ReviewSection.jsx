// src/components/ReviewSection.jsx
import React, { useState } from 'react';
import Modal from './Modal'; // Assume Modal component exists

const ReviewSection = ({ reviews = [], onAddReview, entityType }) => { // entityType is 'document' or 'subject'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewStars, setNewReviewStars] = useState(0); // 0 means not rated yet for docs

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
            alert('Please select a star rating.');
            return;
        }
         if (!newReviewText.trim()) {
             alert('Please enter a review comment.');
             return;
         }

        const reviewData = {
            user: 'CurrentUser', // Replace with actual user later
            comment: newReviewText,
            date: new Date().toISOString().split('T')[0],
            ...(entityType === 'document' && { stars: newReviewStars }) // Only add stars for documents
        };
        onAddReview(reviewData); // Pass data up to parent
        handleCloseModal();
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
            ) : (
                <ul className="space-y-4 mb-6">
                    {reviews.map((review, index) => (
                        <li key={review.id || index} className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50">
                            {entityType === 'document' && review.stars && (
                                <p className="text-yellow-500 font-bold">Rating: {'⭐'.repeat(review.stars)}</p>
                            )}
                            <p className="font-semibold">{review.user} <span className="text-sm text-gray-500 font-normal">- {review.date}</span></p>
                            <p className="mt-1 text-gray-700">{review.comment}</p>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={handleAddReviewClick}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Add Review
            </button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-lg font-medium mb-4">Write your review</h2>
                {entityType === 'document' && (
                     <div className="mb-4">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
                         <div className="flex space-x-1">
                             {[1, 2, 3, 4, 5].map(star => (
                                 <button
                                     key={star}
                                     onClick={() => setNewReviewStars(star)}
                                     className={`text-2xl ${newReviewStars >= star ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
                                     aria-label={`Rate ${star} stars`}
                                 >
                                     ⭐
                                 </button>
                             ))}
                         </div>
                     </div>
                )}
                <textarea
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder={entityType === 'document' ? "Share your thoughts on this document..." : "Share your experience with this subject..."}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end space-x-2">
                     <button
                        onClick={handleCloseModal}
                         className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                     >
                         Cancel
                     </button>
                     <button
                        onClick={handleSubmitReview}
                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     >
                         Upload Review
                     </button>
                </div>
            </Modal>
        </div>
    );
};

export default ReviewSection;