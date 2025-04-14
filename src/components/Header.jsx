// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react"; // Import useRef, useEffect
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import UploadForm from "./UploadForm";
import { FaBell } from "react-icons/fa"; // Import a bell icon

// Mock notifications (replace with real data/state management later)
const mockNotifications = [
  {
    id: 1,
    text: "Your review for MI1131 was approved.",
    date: "2025-04-11",
    read: false,
  },
  {
    id: 2,
    text: "New document 'AI Chapter 5' uploaded for IT3080.",
    date: "2025-04-10",
    read: false,
  },
  {
    id: 3,
    text: "Reminder: Midterm for IT2000 is next week.",
    date: "2025-04-09",
    read: true,
  },
  { id: 4, text: "Welcome to TailieuHub!", date: "2025-04-01", read: true },
];

const Header = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // State for notifications
  const notificationsRef = useRef(null); // Ref for click outside detection

  const [headerQuery, setHeaderQuery] = useState("");
  const navigate = useNavigate(); // Initialize navigate hook

  // --- Click Outside Handler for Notifications ---
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is outside the notification panel and not on the bell icon
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        // A bit more complex: need to ensure the bell icon itself wasn't clicked
        // For simplicity now, let's assume clicking anywhere outside closes it
        // A better implementation might involve checking event.target against the bell button ref too
        if (!event.target.closest("#notification-button")) {
          // Check if click target is NOT inside the bell button
          setIsNotificationsOpen(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationsRef]); // Dependency array includes the ref
  // --- End Click Outside Handler ---

  // --- Handler for submitting search from the header ---
  const handleHeaderSearchSubmit = (e) => {
    e.preventDefault();
    if (headerQuery.trim()) {
      // Navigate to search results page with the query and 'all' filter
      navigate(
        `/search?q=${encodeURIComponent(headerQuery.trim())}&filter=all`
      );
      // Optionally clear the header search bar after submit
      // setHeaderQuery('');
    }
  };

  const avatarUrl = "https://placehold.co/32x32/EBF4FF/76A9FA?text=HQ";

  return (
    <>
      {/* Use flex, items-center for vertical alignment */}
      <header className="bg-blue-600 text-white p-4 flex items-center shadow-md relative z-20">
        {/* Left Section (Logo) - Takes up available space or fixed width */}
        <div className="flex-1 flex justify-start">
          {" "}
          {/* Use flex-1 to push center/right */}
          <Link to="/" className="text-2xl font-bold">
            TailieuHub
          </Link>
        </div>

        {/* Center Section (Search Bar) - Allow it to take significant width */}
        <form
          onSubmit={handleHeaderSearchSubmit}
          className="w-full max-w-xl px-4"
        >
          <SearchBar
            value={headerQuery} // Pass state value
            onChange={(e) => setHeaderQuery(e.target.value)} // Update state on change
            placeholder="Tìm kiếm tài liệu..." // Example placeholder
          />
          {/* Hidden submit allows Enter key submission */}
          <button type="submit" className="hidden">
            Search
          </button>
        </form>

        {/* Right Section (Icons & Profile) - Takes up available space or fixed width */}
        <div className="flex-1 flex justify-end">
          {" "}
          {/* Use flex-1 */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {" "}
            {/* Adjust spacing as needed */}
            {/* Upload Button */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded text-sm"
              title="Upload a document"
            >
              Upload tài liệu của bạn!
              {/* Hide text on smaller screens if needed: <span className="hidden sm:inline ml-1">Document</span> */}
            </button>
            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notification-button"
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                className="text-white hover:text-gray-200 focus:outline-none relative p-1" // Adjusted padding
                title="Notifications"
              >
                <FaBell size={20} /> {/* Adjusted size */}
                {mockNotifications.some((n) => !n.read) && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-blue-600"></span> // Adjusted badge position/ring
                )}
              </button>
              {/* Notification Panel */}
              {isNotificationsOpen && (
                <div
                  ref={notificationsRef}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-30 border border-gray-200"
                >
                  {/* ... notification panel content ... */}
                  <div className="py-2 px-4 font-semibold text-gray-800 border-b">
                    Thông báo
                  </div>
                  <ul className="max-h-80 overflow-y-auto">
                    {mockNotifications.length > 0 ? (
                      mockNotifications.map((notif) => (
                        <li
                          key={notif.id}
                          className={`border-b border-gray-100 last:border-b-0 ${
                            !notif.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <a
                            href="#"
                            className="block px-4 py-3 hover:bg-gray-100"
                          >
                            <p
                              className={`text-sm ${
                                !notif.read ? "font-semibold" : ""
                              } text-gray-700`}
                            >
                              {notif.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notif.date}
                            </p>
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-gray-500">
                        Hông có thông báo mới.
                      </li>
                    )}
                  </ul>
                  <div className="py-2 px-4 text-center border-t">
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Xem tất cả
                    </a>
                  </div>
                </div>
              )}
            </div>
            {/* User Avatar and Name */}
            <div className="flex items-center cursor-pointer group">
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border-2 border-blue-400 group-hover:border-blue-200"
              />
              <span className="hidden lg:block text-sm font-medium group-hover:text-gray-200 ml-2">
                {" "}
                {/* Show name on large screens, added margin */}
                Hoàng Quân
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      >
        <UploadForm onClose={() => setIsUploadModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Header;
