// src/pages/DocumentDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocumentById, getSubjectById } from '../data/mockData';
import PdfPreview from '../components/PdfPreview';
import ReviewSection from '../components/ReviewSection';
import StarRating from '../components/StarRating';

const DocumentDetailPage = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [subject, setSubject] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // ... (fetching logic remains the same) ...
        const docData = getDocumentById(id);
        if (docData) {
            setDocument(docData);
            setReviews(docData.reviews || []);
            const subjData = getSubjectById(docData.subjectId);
            setSubject(subjData);
        } else {
            setDocument(null);
            setSubject(null);
            setReviews([]);
        }
    }, [id]);

    const handleAddReview = (newReview) => {
        // ... (review handling remains the same) ...
        console.log("Adding document review:", newReview);
        const reviewWithId = { ...newReview, id: `dr-${Date.now()}` };
        setReviews(prevReviews => [...prevReviews, reviewWithId]);
    };

    // --- Function to handle download ---
    const handleDownload = () => {
        if (!document || !document.pdfUrl) return;

        // Confirmation dialog
        if (window.confirm("Are you sure you want to download this file?")) {
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = document.pdfUrl; // Use the URL (currently '/dummy.pdf')

            // Suggest a filename (use document name, fallback to generic)
            const filename = document.name ? `${document.name.replace(/[/\\?%*:|"<>]/g, '-')}.pdf` : 'document.pdf';
            link.setAttribute('download', filename);

            // Append to page, click, then remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    // --- End download handler ---

    if (!document) {
        return <div className="container mx-auto p-4">Document not found.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            {/* ... (Document Title, Subject Link, Info Grid remain the same) ... */}
            <h2 className="text-3xl font-bold mb-2">{document.name}</h2>
             {subject && (
                  <p className="text-md text-gray-600 mb-4">
                      Part of subject: <Link to={`/subject/${subject.id}`} className="text-blue-600 hover:underline">{subject.code} - {subject.name}</Link>
                  </p>
             )}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-700">
                 <div><strong>Category:</strong> {document.category}</div>
                 <div><strong>Uploaded:</strong> {document.uploadedDate}</div>
                  <div><strong>Rating:</strong> <StarRating rating={document.stars} /></div>
             </div>


            {/* PDF Preview */}
            <PdfPreview pdfUrl={document.pdfUrl} />

            {/* --- Download Button --- */}
            <div className="mt-6 text-center">
                <button
                    onClick={handleDownload}
                    disabled={!document.pdfUrl} // Disable if no URL
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Download Document
                </button>
            </div>
            {/* --- End Download Button --- */}


            {/* Review Section */}
             <ReviewSection
                 reviews={reviews}
                 onAddReview={handleAddReview}
                 entityType="document"
             />
        </div>
    );
};

export default DocumentDetailPage;