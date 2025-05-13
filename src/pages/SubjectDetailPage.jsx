// src/pages/SubjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectById, getDocumentsByIds } from '../data/mockData';
import Pagination from '../components/Pagination';
import StarRating from '../components/StarRating';
import ReviewSection from '../components/ReviewSection';
import TipsSection from '../components/TipsSection'; // Import TipsSection

const DOCS_PER_PAGE = 10;

const SubjectDetailPage = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [tips, setTips] = useState([]); // New state for tips
    const [currentPage, setCurrentPage] = useState(1); // Document pagination
    const [activeTab, setActiveTab] = useState('reviews'); // State for active tab

    useEffect(() => {
        const subjData = getSubjectById(id);
        if (subjData) {
            setSubject(subjData);

            // Initialize subject reviews
            const initialReviews = subjData.reviews?.map(review => ({
                ...review,
                likes: review.likes || 0,
            })) || [];
            setReviews(initialReviews);

            // Initialize subject tips
            const initialTips = subjData.tips?.map(tip => ({
                ...tip,
                likes: tip.likes || 0,
            })) || [];
            setTips(initialTips);

            // Fetch related documents
            const docData = getDocumentsByIds(subjData.documents || []);
            setDocuments(docData);
        } else {
            setSubject(null);
            setDocuments([]);
            setReviews([]);
            setTips([]); // Reset tips if subject not found
        }
        setCurrentPage(1); // Reset document pagination
    }, [id]);

    // Handler for adding a new review
    const handleAddReview = (newReview) => {
        const reviewDataWithLikes = { ...newReview, likes: 0 };
        const reviewWithId = { ...reviewDataWithLikes, id: `sr-${Date.now()}` };
        setReviews(prevReviews => [...prevReviews, reviewWithId]);
        console.log('Added subject review:', reviewWithId);
    };

    // Handler for liking a review
    const handleLikeReview = (reviewId) => {
        setReviews(prevReviews =>
            prevReviews.map(review => {
                if (review.id === reviewId) {
                    return { ...review, likes: (review.likes || 0) + 1 };
                }
                return review;
            })
        );
        console.log(`Liked subject review ID: ${reviewId}`);
    };

    // Handler for adding a new tip
    const handleAddTip = (newTip) => {
        const tipWithId = { ...newTip, id: `st-${Date.now()}` };
        setTips(prevTips => [...prevTips, tipWithId]);
        console.log('Added subject tip:', tipWithId);
    };

    // Handler for liking a tip
    const handleLikeTip = (tipId) => {
        setTips(prevTips =>
            prevTips.map(tip => {
                if (tip.id === tipId) {
                    return { ...tip, likes: (tip.likes || 0) + 1 };
                }
                return tip;
            })
        );
        console.log(`Liked subject tip ID: ${tipId}`);
    };

    if (!subject) {
        return <div className="container mx-auto p-4">Không tìm thấy môn học.</div>;
    }

    // Document Pagination logic
    const totalPages = Math.ceil(documents.length / DOCS_PER_PAGE);
    const startIndex = (currentPage - 1) * DOCS_PER_PAGE;
    const currentDocuments = documents.slice(startIndex, startIndex + DOCS_PER_PAGE);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                                <StarRating rating={doc.stars} />
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 mb-6">Tạm thời chưa có tài liệu nào thuộc môn này.</p>
            )}

            {/* Document Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            {/* Tabbed Interface */}
            <div className="mt-8">
                <div className="flex border-b border-gray-300">
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-4 py-2 font-semibold ${activeTab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        Đánh giá ({reviews.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('tips')}
                        className={`px-4 py-2 font-semibold ${activeTab === 'tips' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                        Mẹo học ({tips.length})
                    </button>
                </div>

                {/* Render Active Tab Content */}
                {activeTab === 'reviews' && (
                    <ReviewSection
                        reviews={reviews}
                        onAddReview={handleAddReview}
                        onLikeReview={handleLikeReview}
                        entityType="subject"
                    />
                )}
                {activeTab === 'tips' && (
                    <TipsSection
                        tips={tips}
                        onAddTip={handleAddTip}
                        onLikeTip={handleLikeTip}
                    />
                )}
            </div>
        </div>
    );
};

export default SubjectDetailPage;