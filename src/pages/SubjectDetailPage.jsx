// src/pages/SubjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectById, getDocumentsByIds } from '../data/mockData';
import Pagination from '../components/Pagination';
import StarRating from '../components/StarRating';
import ReviewSection from '../components/ReviewSection'; // Already imported

const DOCS_PER_PAGE = 10;

const SubjectDetailPage = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [reviews, setReviews] = useState([]); // State for subject reviews exists
    const [currentPage, setCurrentPage] = useState(1); // State for document pagination

    useEffect(() => {
        const subjData = getSubjectById(id);
        if (subjData) {
            setSubject(subjData);

            // Initialize subject reviews, ensuring 'likes' property exists
            const initialReviews = subjData.reviews?.map(review => ({
                ...review,
                // --- CRITICAL: Make sure review IDs in mockData for subjects are UNIQUE ---
                likes: review.likes || 0 // Initialize likes if missing
            })) || [];
            setReviews(initialReviews); // Set the reviews state

            // Fetch related documents
            const docData = getDocumentsByIds(subjData.documents || []);
            setDocuments(docData);
        } else {
            setSubject(null);
            setDocuments([]);
            setReviews([]); // Reset reviews if subject not found
        }
        setCurrentPage(1); // Reset document pagination
    }, [id]);

    // Handler for adding a NEW review for the Subject
    const handleAddReview = (newReview) => {
        console.log("Adding subject review:", newReview);
         // Add likes: 0 to the new review data before creating ID
        const reviewDataWithLikes = { ...newReview, likes: 0 };
        const reviewWithId = { ...reviewDataWithLikes, id: `sr-${Date.now()}` }; // 'sr' prefix for subject review ID
        setReviews(prevReviews => [...prevReviews, reviewWithId]);
        // TODO: Backend call to save the review
    };

    // --- Handler for LIKING a Subject's review ---
    const handleLikeReview = (reviewId) => {
        setReviews(prevReviews =>
            prevReviews.map(review => {
                if (review.id === reviewId) {
                    // Ensure the ID being passed/checked is correct and unique
                    return { ...review, likes: (review.likes || 0) + 1 };
                }
                return review;
            })
        );
        // TODO: Backend call to update like count
        // TODO: Add logic to prevent multiple likes from the same user
        console.log(`Liked subject review ID: ${reviewId}`);
    };
    // --- End handler for liking ---

    if (!subject) {
        return <div className="container mx-auto p-4">Không tìm thấy môn học.</div>;
    }

    // Document Pagination logic (remains the same)
    const totalPages = Math.ceil(documents.length / DOCS_PER_PAGE);
    const startIndex = (currentPage - 1) * DOCS_PER_PAGE;
    const currentDocuments = documents.slice(startIndex, startIndex + DOCS_PER_PAGE);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // StarRating rendering logic (can be kept or removed if not used elsewhere)
    // const renderStars = (rating) => { /* ... */ };

    return (
        <div className="container mx-auto p-6">
            {/* Subject Info */}
            <h2 className="text-3xl font-bold mb-1">{subject.code} - {subject.name}</h2>
            <p className="text-lg text-gray-600 mb-4">Phân loại: {subject.category}</p>
            <p className="text-gray-700 mb-6">{subject.description}</p>

            {/* Document List */}
            <h3 className="text-xl font-semibold mb-4 border-t pt-4">Tài liệu của môn này</h3>
            {currentDocuments.length > 0 ? (
                <ul className="space-y-3 mb-6">
                    {currentDocuments.map(doc => (
                        <li key={doc.id} className="p-3 border rounded bg-white hover:bg-gray-50">
                            <Link to={`/document/${doc.id}`} className="flex justify-between items-center text-blue-600 hover:underline">
                                 <span>{doc.name} <span className="text-xs text-gray-500">({doc.category})</span></span>
                                 <StarRating rating={doc.stars} /> {/* Keep if you have StarRating component */}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 mb-6">Tạm thời chưa có tài liệu nào thuộc môn này.</p>
            )}

            {/* Document Pagination */}
             {totalPages > 1 && ( // Only show pagination if needed
                 <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={handlePageChange}
                 />
             )}


             {/* --- Review Section for the Subject --- */}
             <div className="mt-8"> {/* Add margin-top for separation */}
                <ReviewSection
                    reviews={reviews}
                    onAddReview={handleAddReview}
                    onLikeReview={handleLikeReview} // <-- Pass the like handler
                    entityType="subject" // Keep as subject (no stars in ReviewSection modal/list)
                />
             </div>
             {/* --- End Review Section --- */}
        </div>
    );
};

export default SubjectDetailPage;