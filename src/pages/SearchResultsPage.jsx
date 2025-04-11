// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { findData } from '../data/mockData'; // Import your data fetching logic

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState({ documents: [], subjects: [], majors: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulate fetching data
        const fetchedResults = findData(query);
        setResults(fetchedResults);
        setLoading(false);
        // In a real app, you'd fetch from an API here based on 'query'
    }, [query]);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <span className="text-yellow-500">
                {'⭐'.repeat(fullStars)}
                {/* Add half star logic if needed */}
                {'☆'.repeat(emptyStars)} {/* Using outline star for empty */}
                 ({rating.toFixed(1)})
            </span>
        );
    }

    if (loading) {
        return <div className="container mx-auto p-4">Loading results...</div>;
    }

    const hasResults = results.documents.length > 0 || results.subjects.length > 0 || results.majors.length > 0;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Search Results for "{query}"</h2>

            {!hasResults ? (
                <p>No results found.</p>
            ) : (
                <ul className="space-y-4">
                    {/* Documents */}
                    {results.documents.map(doc => (
                        <li key={doc.id} className="p-4 border rounded-md shadow-sm bg-white hover:shadow-md transition-shadow">
                            <Link to={`/document/${doc.id}`} className="block">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-blue-600">{doc.name}</span>
                                    <StarRating rating={doc.stars} />
                                </div>
                                <span className="text-sm text-gray-500">Type: Document | Category: {doc.category}</span>
                            </Link>
                        </li>
                    ))}

                    {/* Subjects */}
                    {results.subjects.map(sub => (
                        <li key={sub.id} className="p-4 border rounded-md shadow-sm bg-yellow-100 hover:shadow-md transition-shadow">
                            <Link to={`/subject/${sub.id}`} className="block">
                                <span className="font-medium text-yellow-800">{sub.code} - {sub.name}</span>
                                <br />
                                <span className="text-sm text-gray-600">Type: Subject | Category: {sub.category}</span>
                            </Link>
                        </li>
                    ))}

                    {/* Majors */}
                    {results.majors.map(maj => (
                        <li key={maj.id} className="p-4 border rounded-md shadow-sm bg-green-100 hover:shadow-md transition-shadow">
                            <Link to={`/major/${maj.id}`} className="block">
                                 <span className="font-medium text-green-800">{maj.code} - {maj.name}</span>
                                 <br />
                                 <span className="text-sm text-gray-600">Type: Major</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResultsPage;