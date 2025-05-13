// src/pages/DocumentDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocumentById, getSubjectById } from '../data/mockData';
import PdfPreview from '../components/PdfPreview';
import ReviewSection from '../components/ReviewSection';
import TipsSection from '../components/TipsSection';
import StarRating from '../components/StarRating';

const DocumentDetailPage = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [subject, setSubject] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [tips, setTips] = useState([]); // New state for tips
    const [activeTab, setActiveTab] = useState('reviews'); // State for active tab

    useEffect(() => {
        const docData = getDocumentById(id);
        if (docData) {
            setDocument(docData);
            // Initialize reviews
            const initialReviews = docData.reviews?.map(review => ({
                ...review,
                likes: review.likes || 0,
            })) || [];
            setReviews(initialReviews);
            // Initialize tips
            const initialTips = docData.tips?.map(tip => ({
                ...tip,
                likes: tip.likes || 0,
            })) || [];
            setTips(initialTips);
            const subjData = getSubjectById(docData.subjectId);
            setSubject(subjData);
        } else {
            setDocument(null);
            setSubject(null);
            setReviews([]);
            setTips([]);
        }
    }, [id]);

    // Handler for adding a new review
    const handleAddReview = (newReview) => {
        const reviewWithId = { ...newReview, id: `dr-${Date.now()}` };
        setReviews(prevReviews => [...prevReviews, reviewWithId]);
    };

    // Handler for liking a review
    const handleLikeDocReview = (reviewId) => {
        setReviews(prevReviews =>
            prevReviews.map(review => {
                if (review.id === reviewId) {
                    return { ...review, likes: (review.likes || 0) + 1 };
                }
                return review;
            })
        );
        console.log(`Liked review ID: ${reviewId}`);
    };

    // Handler for adding a new tip
    const handleAddTip = (newTip) => {
        const tipWithId = { ...newTip, id: `dt-${Date.now()}` };
        setTips(prevTips => [...prevTips, tipWithId]);
        console.log(`Added tip:`, tipWithId);
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
        console.log(`Liked tip ID: ${tipId}`);
    };

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
                <div><strong>Đánh giá TB:</strong> <StarRating rating={document.stars} /></div>
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


                {activeTab === 'tips' && (
                    <TipsSection
                        tips={tips}
                        onAddTip={handleAddTip}
                        onLikeTip={handleLikeTip}
                    />
                )}
                                {/* Render Active Tab Content */}
                {activeTab === 'reviews' && (
                    <ReviewSection
                        reviews={reviews}
                        onAddReview={handleAddReview}
                        onLikeReview={handleLikeDocReview}
                        entityType="document"
                    />
                )}
            </div>
        </div>
    );
};

export default DocumentDetailPage;