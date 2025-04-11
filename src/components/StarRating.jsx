// src/components/StarRating.jsx
import React from 'react';

// Props:
// - rating: The numerical rating (e.g., 4.2, 3.8, 4.5)
// - showRatingNumber: (Optional) Boolean to show the number like (4.5) next to stars
const StarRating = ({ rating, showRatingNumber = true }) => {
    // Handle invalid, null, or out-of-range ratings gracefully
    if (rating == null || typeof rating !== 'number' || rating < 0 || rating > 5) {
        return <span className="text-gray-400 text-sm">(N/A)</span>;
    }

    // Round the rating to the nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;

    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0; // Check if there's a .5 remainder
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Unicode characters for stars
    // Ensure your font/browser supports these well.
    // You might prefer an SVG icon library (like Heroicons or Font Awesome) for better control.
    const fullStarChar = '★'; // Solid star (U+2605)
    const halfStarChar = '★'; // Use solid star for half too, but clip it with CSS later if needed, or find a better character like '◐' (U+25D0) or ' பாதி' text if desperate. Let's start simple.
    const emptyStarChar = '☆'; // Outline star (U+2606)

    // Style for half star using inline style for simplicity here
    // A better approach might be dedicated CSS classes
    const halfStarStyle = {
        position: 'relative',
        display: 'inline-block',
        color: 'rgb(234 179 8)', // text-yellow-500
    };
     const halfStarInnerStyle = {
         position: 'absolute',
         top: 0,
         left: 0,
         width: '50%', // Show only the left half
         overflow: 'hidden',
         color: 'rgb(234 179 8)', // text-yellow-500
     };
     const halfStarBackgroundStyle = {
         color: 'rgb(156 163 175)', // text-gray-400 (color for the empty part)
     }


    return (
        <span className="inline-flex items-center" aria-label={`Rating: ${roundedRating} out of 5 stars`}>
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="text-yellow-500 text-lg">{fullStarChar}</span>
            ))}

            {/* Half Star - using CSS clipping simulation */}
            {hasHalfStar && (
                <span key="half" style={halfStarStyle} className="text-lg">
                     {/* Background empty star */}
                    <span style={halfStarBackgroundStyle}>{emptyStarChar}</span>
                     {/* Foreground clipped solid star */}
                    <span style={halfStarInnerStyle}>{fullStarChar}</span>
                </span>
            )}

            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="text-gray-400 text-lg">{emptyStarChar}</span>
            ))}

            {/* Optional: Display the original rating number */}
            {showRatingNumber && (
                <span className="text-gray-600 text-sm ml-1">({rating.toFixed(1)})</span>
            )}
        </span>
    );
};

export default StarRating;