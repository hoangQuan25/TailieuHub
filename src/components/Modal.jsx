import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Using react-icons for a close icon

const Modal = ({ isOpen, onClose, children }) => {
    // Effect to handle Escape key press for closing the modal
    useEffect(() => {
        const handleEscKeyPress = (event) => {
            if (event.key === 'Escape') {
                onClose(); // Call the onClose function passed via props
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKeyPress);
            // Optional: Prevent background scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Restore background scroll when modal is closed
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to remove event listener and restore scroll
        return () => {
            document.removeEventListener('keydown', handleEscKeyPress);
            // Ensure scroll is restored if modal is open and component unmounts
            if (isOpen) {
                 document.body.style.overflow = 'unset';
            }
        };
    }, [isOpen, onClose]); // Re-run effect if isOpen or onClose changes

    // If the modal is not open, render nothing
    if (!isOpen) {
        return null;
    }

    return (
        // Backdrop: Covers the entire screen
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out"
            onClick={onClose} // Close modal if backdrop is clicked
        >
            {/* Modal Panel: The actual modal content box */}
            <div
                className="relative w-full max-w-lg transform rounded-xl bg-white p-6 text-left shadow-xl transition-all sm:p-8"
                onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside the panel
            >
                {/* Close Button (Top Right) */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1 transition-colors"
                    aria-label="Close modal"
                >
                    <AiOutlineClose className="h-5 w-5" />
                </button>

                {/* Modal Content: Rendered via children prop */}
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;