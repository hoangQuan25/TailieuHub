// src/pages/SubjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectById, getDocumentsByIds } from '../data/mockData';
import Pagination from '../components/Pagination';
import StarRating from '../components/StarRating';
import ReviewSection from '../components/ReviewSection';

const DOCS_PER_PAGE = 10; // How many documents to show per page

const SubjectDetailPage = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [reviews, setReviews] = useState([]); // Local state for reviews
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        // Fetch subject data
        const subjData = getSubjectById(id);
        if (subjData) {
            setSubject(subjData);
            setReviews(subjData.reviews || []); // Initialize subject reviews
            // Fetch related documents
            const docData = getDocumentsByIds(subjData.documents || []);
            setDocuments(docData);
        } else {
            setSubject(null);
            setDocuments([]);
        }
         setCurrentPage(1); // Reset page when subject changes
    }, [id]);

     const handleAddReview = (newReview) => {
         // In a real app, POST this review to the backend associated with the subject
         console.log("Adding subject review:", newReview);
         const reviewWithId = { ...newReview, id: `sr-${Date.now()}` }; // Mock ID generation
         // Update local state optimistically
         setReviews(prevReviews => [...prevReviews, reviewWithId]);
     };


    if (!subject) {
        return <div className="container mx-auto p-4">Không tìm thấy môn học.</div>;
    }

    // Pagination logic
    const totalPages = Math.ceil(documents.length / DOCS_PER_PAGE);
    const startIndex = (currentPage - 1) * DOCS_PER_PAGE;
    const currentDocuments = documents.slice(startIndex, startIndex + DOCS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderStars = (rating) => {
         if (!rating) return <span className="text-gray-400"> (N/A)</span>;
         const fullStars = Math.floor(rating);
         const halfStar = rating % 1 >= 0.5; // Adjust as needed
         const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
         return (
             <span className="text-yellow-500 ml-2">
                 {'⭐'.repeat(fullStars)}
                 {/* {halfStar && '🌗'} */}
                 {'☆'.repeat(emptyStars)}
                 ({rating.toFixed(1)})
             </span>
         );
     }


    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-1">{subject.code} - {subject.name}</h2>
            <p className="text-lg text-gray-600 mb-4">Phân loại: {subject.category}</p>
            <p className="text-gray-700 mb-6">{subject.description}</p>

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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

             {/* Review Section for the Subject */}
             <ReviewSection
                reviews={reviews}
                onAddReview={handleAddReview}
                entityType="subject"
             />
        </div>
    );
};

export default SubjectDetailPage;