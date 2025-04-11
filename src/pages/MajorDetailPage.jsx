// src/pages/MajorDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMajorById, getSubjectsByIds } from '../data/mockData';

const MajorDetailPage = () => {
    const { id } = useParams();
    const [major, setMajor] = useState(null);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Fetch major data
        const majData = getMajorById(id);
        if (majData) {
            setMajor(majData);
            // Fetch related subjects
            const subjData = getSubjectsByIds(majData.subjects || []);
            setSubjects(subjData);
        } else {
            setMajor(null);
            setSubjects([]);
        }
    }, [id]);

    if (!major) {
        return <div className="container mx-auto p-4">Major not found.</div>;
    }

    // Group subjects by category
    const subjectsByCategory = subjects.reduce((acc, subject) => {
        const category = subject.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(subject);
        return acc;
    }, {});

    // Define category order if needed
    const categoryOrder = ['General Education', 'Major Subject', 'Supportive', 'Language Subject', 'Physical', 'Uncategorized'];
    const sortedCategories = Object.keys(subjectsByCategory).sort((a, b) => {
        return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
    });


    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-1">{major.code} - {major.name}</h2>
            <p className="text-gray-700 mb-6">{major.description}</p>

            <h3 className="text-xl font-semibold mb-4 border-t pt-4">Subjects</h3>
            {sortedCategories.length > 0 ? (
                <div className="space-y-6">
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
                <p className="text-gray-500">No subjects listed for this major yet.</p>
            )}
        </div>
    );
};

export default MajorDetailPage;