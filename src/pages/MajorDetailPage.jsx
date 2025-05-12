// src/pages/MajorDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMajorById, getSubjectsByIds } from '../data/mockData';
import ReviewSection from '../components/ReviewSection'; // Import ReviewSection

const MajorDetailPage = () => {
    
    const { id } = useParams();
    console.log("🚀 Entering MajorDetailPage, id =", id);
    const [major, setMajor] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [reviews, setReviews] = useState([]); // Add state for major reviews

    useEffect(() => {
        const majData = getMajorById(id);
        if (majData) {
            setMajor(majData);

            // Fetch related subjects
            const subjData = getSubjectsByIds(majData.subjects || []);
            setSubjects(subjData);

            // Fetch and initialize reviews for the major
            // Ensure reviews have 'likes' property, initialize if missing
            const initialReviews = majData.reviews?.map(review => ({
                ...review,
                likes: review.likes || 0 // Initialize likes to 0 if not present
            })) || [];
            setReviews(initialReviews); // Set the reviews state

        } else {
            setMajor(null);
            setSubjects([]);
            setReviews([]); // Reset reviews if major not found
        }
    }, [id]);

    // Handler for adding a NEW review for the Major
    const handleAddReview = (newReview) => {
        console.log("Adding major review:", newReview);
        const reviewWithId = { ...newReview, id: `mr-${Date.now()}` }; // 'mr' prefix for major review ID
        setReviews(prevReviews => [...prevReviews, reviewWithId]);
        // TODO: Backend call to save the review
    };

    // Handler for LIKING a Major's review
    const handleLikeReview = (reviewId) => {
        setReviews(prevReviews =>
            prevReviews.map(review => {
                if (review.id === reviewId) {
                    return { ...review, likes: (review.likes || 0) + 1 };
                }
                return review;
            })
        );
        // TODO: Backend call to update like count
        // TODO: Add logic to prevent multiple likes from the same user
        console.log(`Liked major review ID: ${reviewId}`);
    };

    console.log("MajorDetailPage ➡️ handleLikeReview is", handleLikeReview);

    if (!major) {
        return <div className="container mx-auto p-4">Không tìm thấy chuyên ngành.</div>;
    }

    // Group subjects by category (logic remains the same)
    const subjectsByCategory = subjects.reduce((acc, subject) => {
        const category = subject.category || 'Uncategorized'; // Use Vietnamese categories from mockData if available later
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(subject);
        return acc;
    }, {});

    // Use actual Vietnamese categories from mockData.js if available and map them
    // For now, using the existing hardcoded list for sorting demonstration
     const categoryOrderFromData = [
         "Đại cương",
         "Cơ sở ngành",
         "Chuyên ngành",
         "Ngoại ngữ",
         "Thể chất",
         "Quốc phòng",
         "Môn bổ trợ",
         "Thực tập",
         "Đồ án",
         "Uncategorized" // Fallback
     ];
    const sortedCategories = Object.keys(subjectsByCategory).sort((a, b) => {
        // Handle potential discrepancies between actual category names and the order list
        const indexA = categoryOrderFromData.indexOf(a);
        const indexB = categoryOrderFromData.indexOf(b);
        // Put categories not found in the order list at the end
        if (indexA === -1 && indexB === -1) return a.localeCompare(b); // Sort alphabetically if both unknown
        if (indexA === -1) return 1; // a is unknown, put it after b
        if (indexB === -1) return -1; // b is unknown, put it after a
        return indexA - indexB; // Sort based on defined order
    });

    console.log("✅ MajorDetailPage: passing onLikeReview =", handleLikeReview);
    return (
        <div className="container mx-auto p-6">
            {/* Major Info */}
            <h2 className="text-3xl font-bold mb-1">{major.code} - {major.name}</h2>
            <p className="text-gray-700 mb-6">{major.description}</p>

            {/* Subjects List */}
            <h3 className="text-xl font-semibold mb-4 border-t pt-4">Môn học thuộc ngành</h3>
            {subjects.length > 0 ? (
                 <div className="space-y-6 mb-8"> {/* Added margin-bottom */}
                     {sortedCategories.map(category => (
                         subjectsByCategory[category] && subjectsByCategory[category].length > 0 && (
                            <div key={category}>
                                <h4 className="text-lg font-medium mb-2 text-gray-800">{category}</h4>
                                <ul className="space-y-2 pl-4">
                                    {subjectsByCategory[category].map(sub => (
                                        <li key={sub.id} className="p-2 border-l-4 border-blue-200 bg-gray-50 hover:bg-blue-50">
                                            <Link to={`/subject/${sub.id}`} className="text-blue-600 hover:underline">
                                                {sub.code} - {sub.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                         )
                     ))}
                 </div>
            ) : (
                 <p className="text-gray-500 mb-8">Tạm thời chưa có môn nào thuộc ngành này.</p> /* Added margin-bottom */
            )}
             {console.log("Passing to ReviewSection onLikeReview:", handleLikeReview)}
            {/* --- Review Section for the Major --- */}
            <ReviewSection
                reviews={reviews}
                onAddReview={handleAddReview}
                onLikeReview={handleLikeReview}
                entityType="major"
            />
            {/* --- End Review Section --- */}

        </div>
    );
};

export default MajorDetailPage;