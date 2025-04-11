// src/components/PdfPreview.jsx
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Import default styling
import 'react-pdf/dist/esm/Page/TextLayer.css';      // Import default styling


// --- IMPORTANT: pdf.js Worker Configuration ---
// This sets up where react-pdf should load the worker script from.
// It's needed to parse the PDF file off the main thread.
// Make sure the path is correct relative to your project setup (this works for Vite).
// You might need to install pdfjs-dist if not already a transitive dependency: npm install pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// --- End Worker Configuration ---


const PdfPreview = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [pagesToDisplay, setPagesToDisplay] = useState(0);
    const [loadError, setLoadError] = useState(false);

    function onDocumentLoadSuccess({ numPages: totalPages }) {
        setNumPages(totalPages);
        setLoadError(false); // Reset error on successful load
        // Determine pages to display: 2 if <= 20, 3 if > 20
        const displayCount = totalPages > 20 ? 3 : 2;
        // Ensure we don't try to display more pages than exist
        setPagesToDisplay(Math.min(displayCount, totalPages));
    }

    function onDocumentLoadError(error) {
         console.error('Failed to load PDF:', error);
         setLoadError(true);
         setNumPages(null); // Reset pages info on error
         setPagesToDisplay(0);
    }

    // Reset state when pdfUrl changes
    useEffect(() => {
        setNumPages(null);
        setPagesToDisplay(0);
        setLoadError(false);
    }, [pdfUrl]);


    return (
        <div className="mt-6 p-1 border border-gray-300 rounded bg-gray-50 min-h-[200px] flex flex-col items-center justify-center overflow-hidden">
            <h4 className="text-lg font-semibold mb-3 text-gray-800">Document Preview</h4>

            {!pdfUrl ? (
                 <p className="text-gray-500">No PDF URL provided.</p>
            ) : loadError ? (
                 <p className="text-red-600">Error loading PDF preview. The URL might be invalid or inaccessible.</p>
            ) : (
                <div className="w-full max-w-3xl">
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={<p className="text-gray-600 animate-pulse">Loading PDF preview...</p>}
                        error={<p className="text-red-600">Failed to load PDF document.</p>} // Fallback error message
                    >
                        {pagesToDisplay > 0 ? (
                            <>
                                <p className="text-center text-sm text-gray-600 mb-3">
                                    Showing first {pagesToDisplay} of {numPages} pages.
                                </p>
                                <div className="flex flex-col items-center space-y-2">
                                     {/* Render the determined number of pages */}
                                    {Array.from(new Array(pagesToDisplay), (el, index) => (
                                        <div key={`page_${index + 1}`} className="mb-2 shadow-md">
                                            <Page
                                                pageNumber={index + 1}
                                                width={600} // Adjust width as needed, or make it responsive
                                                renderAnnotationLayer={true} // Enable annotations if needed
                                                renderTextLayer={true} // Enable text selection
                                                loading={<p className="text-sm text-gray-500">Loading page {index + 1}...</p>}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            // Shown while loading or if there are 0 pages to display
                            !loadError && <p className="text-gray-500">Loading page information...</p>
                        )}
                    </Document>
                </div>
            )}
        </div>
    );
};

export default PdfPreview;