// src/components/TipsSection.jsx
import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import Modal from './Modal';
import Pagination from './Pagination';

const TIPS_PER_PAGE = 5;

const TipsSection = ({ tips = [], onAddTip, onLikeTip }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTipText, setNewTipText] = useState('');
    const [currentTipPage, setCurrentTipPage] = useState(1);

    const handleAddTipClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewTipText('');
    };

    const handleSubmitTip = () => {
        if (!newTipText.trim()) {
            alert('Vui lòng nhập nội dung mẹo học.');
            return;
        }

        const tipData = {
            user: 'CurrentUser', // Mock user
            comment: newTipText,
            date: new Date().toISOString().split('T')[0],
            likes: 0, // Initialize likes for new tips
        };
        onAddTip(tipData);
        handleCloseModal();
    };

    // Sorting Logic: Sort tips by likes (descending)
    const sortedTips = [...tips].sort((a, b) => (b.likes || 0) - (a.likes || 0));

    // Pagination Logic
    const totalTipPages = Math.ceil(sortedTips.length / TIPS_PER_PAGE);
    const startIndex = (currentTipPage - 1) * TIPS_PER_PAGE;
    const endIndex = startIndex + TIPS_PER_PAGE;
    const currentTips = sortedTips.slice(startIndex, endIndex);

    const handleTipPageChange = (page) => {
        if (page >= 1 && page <= totalTipPages) {
            setCurrentTipPage(page);
        }
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Mẹo học ({tips.length})</h3>

            {sortedTips.length === 0 ? (
                <p className="text-gray-600 mb-6">Chưa có mẹo học nào.</p>
            ) : (
                <>
                    <ul className="space-y-4 mb-6">
                        {currentTips.map((tip) => (
                            <li key={tip.id} className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50">
                                <p className="font-semibold">{tip.user} <span className="text-sm text-gray-500 font-normal">- {tip.date}</span></p>
                                <p className="mt-1 text-gray-700">{tip.comment}</p>
                                <div className="mt-2 flex items-center space-x-2">
                                    <button
                                        onClick={() => onLikeTip(tip.id)}
                                        className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                                        aria-label="Like this tip"
                                    >
                                        <AiOutlineLike className="mr-1" /> Like
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        ({tip.likes || 0} likes)
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {totalTipPages > 1 && (
                        <Pagination
                            currentPage={currentTipPage}
                            totalPages={totalTipPages}
                            onPageChange={handleTipPageChange}
                        />
                    )}
                </>
            )}

            <button
                onClick={handleAddTipClick}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Thêm mẹo học
            </button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-lg font-medium mb-4">Chia sẻ mẹo học của bạn</h2>
                <textarea
                    value={newTipText}
                    onChange={(e) => setNewTipText(e.target.value)}
                    placeholder="Chia sẻ mẹo học hữu ích cho tài liệu này..."
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmitTip}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Gửi mẹo học
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default TipsSection;