// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import container
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import DocumentDetailPage from './pages/DocumentDetailPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import MajorDetailPage from './pages/MajorDetailPage';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchResultsPage />} />
                        <Route path="/document/:id" element={<DocumentDetailPage />} />
                        <Route path="/subject/:id" element={<SubjectDetailPage />} />
                        <Route path="/major/:id" element={<MajorDetailPage />} />
                        {/* Add other routes like Login, Upload, etc. later */}
                        <Route path="*" element={<div className="p-4">Page Not Found</div>} /> {/* Basic 404 */}
                    </Routes>
                </main>
                <ToastContainer
                     position="top-right"
                     autoClose={3000} // Close after 3 seconds
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light" // Or "dark" or "colored"
                />
            </div>
        </Router>
    );
}

export default App;