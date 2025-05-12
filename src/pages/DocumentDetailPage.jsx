// src/pages/DocumentDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocumentById, getSubjectById } from '../data/mockData'; // Assuming mockData is updated or handled below
import PdfPreview from '../components/PdfPreview';
import ReviewSection from '../components/ReviewSection';
import StarRating from '../components/StarRating';

const DocumentDetailPage = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [subject, setSubject] = useState(null);
    const [reviews, setReviews] = useState([]); // State for reviews lives here

    useEffect(() => {
        const docData = getDocumentById(id);
        if (docData) {
            setDocument(docData);
            // Ensure reviews have 'likes' property, initialize if missing
            const initialReviews = docData.reviews?.map(review => ({
                ...review,
                likes: review.likes || 0 // Initialize likes to 0 if not present
            })) || [];
            setReviews(initialReviews);
            const subjData = getSubjectById(docData.subjectId);
            setSubject(subjData);
        } else {
            setDocument(null);
            setSubject(null);
            setReviews([]);
        }
    }, [id]);

    // Handler for adding a NEW review
    const handleAddReview = (newReview) => {
        console.log("Adding document review:", newReview);
        // Create a unique ID for the new review (example)
        const reviewWithId = { ...newReview, id: `dr-${Date.now()}` };
        // Add the new review to the state
        setReviews(prevReviews => [...prevReviews, reviewWithId]);
        // In a real app, you'd send this to the backend
    };

    // --- Handler for LIKING a review ---
    const handleLikeDocReview = (reviewId) => {
        setReviews(prevReviews =>
            prevReviews.map(review => {
                if (review.id === reviewId) {
                    // Increment likes count
                    return { ...review, likes: (review.likes || 0) + 1 };
                }
                return review;
            })
        );
        // In a real app, you'd send an update request to the backend
        // You might also add logic here to prevent multiple likes from the same user
        console.log(`Liked review ID: ${reviewId}`);
    };
    // --- End handler for liking ---

    const handleDownload = () => {
        if (!document || !document.pdfUrl) return;
        if (window.confirm("Are you sure you want to download this file?")) {
            const link = document.createElement('a');
            link.href = document.pdfUrl;
            const filename = document.name ? `${document.name.replace(/[/\\?%*:|"<>]/g, '-')}.pdf` : 'document.pdf';
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (!document) {
        return <div className="container mx-auto p-4">Hông tìm thấy tài liệu.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-2">{document.name}</h2>
             {subject && (
                  <p className="text-md text-gray-600 mb-4">
                      Tài liệu thuộc môn: <Link to={`/subject/${subject.id}`} className="text-blue-600 hover:underline">{subject.code} - {subject.name}</Link>
                  </p>
             )}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-700">
                 <div><strong>Phân loại:</strong> {document.category}</div>
                 <div><strong>Upload ngày:</strong> {document.uploadedDate}</div>
                  <div><strong>Đánh giá TB:</strong> <StarRating rating={document.stars} /></div> {/* Assuming doc.stars is average */}
             </div>

            <PdfPreview pdfUrl={document.pdfUrl} />

            <div className="mt-6 text-center">
                <button
                    onClick={handleDownload}
                    disabled={!document.pdfUrl}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Download tài liệu
                </button>
            </div>

            {/* Review Section - Pass reviews state and handlers */}
             <ReviewSection
                 reviews={reviews} // Pass the state managed here
                 onAddReview={handleAddReview} // Pass the add handler
                 onLikeReview={handleLikeDocReview} // Pass the like handler
                 entityType="document"
             />
        </div>
    );
};

export default DocumentDetailPage;