import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocumentById, getSubjectById } from '../data/mockData';
import PdfPreview from '../components/PdfPreview';
import ReviewSection from '../components/ReviewSection';
import TipsSection from '../components/TipsSection';
import StarRating from '../components/StarRating';
import Modal from '../components/Modal'; // 1. Import your Modal component

const DocumentDetailPage = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [subject, setSubject] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [tips, setTips] = useState([]);
    const [activeTab, setActiveTab] = useState('reviews');
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false); // 2. State for download confirmation modal

    useEffect(() => {
        const docData = getDocumentById(id);
        if (docData) {
            setDocument(docData);
            const initialReviews = docData.reviews?.map(review => ({
                ...review,
                likes: review.likes || 0,
            })) || [];
            setReviews(initialReviews);
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

    const handleAddReview = (newReview) => {
        const reviewWithId = { ...newReview, id: `dr-${Date.now()}` };
        setReviews(prevReviews => [...prevReviews, reviewWithId]);
    };

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

    const handleAddTip = (newTip) => {
        const tipWithId = { ...newTip, id: `dt-${Date.now()}` };
        setTips(prevTips => [...prevTips, tipWithId]);
        console.log(`Added tip:`, tipWithId);
    };

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

    // 3. Renamed original handleDownload to open the modal
    const handleDownloadClick = () => {
        if (!document || !document.pdfUrl) {
            console.error("Document or PDF URL is missing for download attempt.");
            // Optionally, you could show an error message to the user here
            return;
        }
        setIsDownloadModalOpen(true); // Open the confirmation modal
    };

    // 4. Function to execute the actual download
    const executeDownload = () => {
        if (!document || !document.pdfUrl) return; // Should be caught by handleDownloadClick, but good for safety

        const link = window.document.createElement('a');
        link.href = document.pdfUrl;
        const filename = document.name ? `${document.name.replace(/[/\\?%*:|"<>]/g, '-')}.pdf` : 'document.pdf';
        link.setAttribute('download', filename);
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
        setIsDownloadModalOpen(false); // Close modal after initiating download
    };

    // 5. Function to close the download modal
    const handleCloseDownloadModal = () => {
        setIsDownloadModalOpen(false);
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
                    onClick={handleDownloadClick} // 6. Update onClick to open modal
                    disabled={!document.pdfUrl}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Download tài liệu
                </button>
            </div>

            {/* Tabbed Interface (Reviews and Tips) */}
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

                {activeTab === 'reviews' && (
                    <ReviewSection
                        reviews={reviews}
                        onAddReview={handleAddReview}
                        onLikeReview={handleLikeDocReview}
                        entityType="document"
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

            {/* 7. Download Confirmation Modal */}
            <Modal isOpen={isDownloadModalOpen} onClose={handleCloseDownloadModal}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Xác nhận tải xuống</h2>
                <p className="mb-6 text-gray-700">
                    Bạn có chắc chắn muốn tải xuống tài liệu: <br />
                    <strong className="font-medium text-gray-900">{document.name || 'tài liệu này'}</strong>?
                </p>
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleCloseDownloadModal}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={executeDownload}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Tải xuống
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default DocumentDetailPage;