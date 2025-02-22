/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";


import axios from "axios";
import { Bookmark, BookmarkCheck, Search, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


let userData = {};
try {
  userData = JSON.parse(localStorage?.getItem("data")) || {};
} catch (error) {
  console.error("Error parsing user data from localStorage", error);
}

const UserBookMarkEvents = () => {
  const [search, setSearch] = useState("");
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBookMarkedEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user-event/bookmarked-events/${userData._id}`
        );

        if (res.status === 200) {
          setBookmarkedEvents(res?.data?.data || []);
          toast.success("Bookmarked events loaded successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch bookmarked events");
      }
    };

    getBookMarkedEvents();
  }, []);

  const handleRemoveBookmark = async (id) => {
    try {
      const res = await axios.post(
          `http://localhost:5000/api/v1/user-event/unbookmark/${id}`,
        { userId: userData?._id }
      );

      if (res.status === 200) {
        setBookmarkedEvents(bookmarkedEvents.filter((event) => event._id !== id));
        toast.success("Unbookmarked successfully");
        setShowModal(false);
      } else {
        toast.error("Error unbookmarking event");
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast.error("Failed to unbookmark event");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="mb-6 flex items-center border rounded-lg p-3 shadow-md bg-white">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search bookmarked events..."
          className="ml-2 w-full p-2 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bookmarked Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedEvents
          .filter((event) =>
            event?.eventTitle?.toLowerCase().includes(search?.toLowerCase())
          )
          .map((event) => (
            <div
              key={event._id}
              className="bg-white p-4 rounded-xl shadow-md border relative transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => {
                setSelectedEvent(event);
                setShowModal(true);
              }}
            >
              <h3 className="text-lg font-semibold">{event.eventTitle}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {event.eventDescription ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: event.eventDescription }}
                  />
                ) : (
                  "No description available"
                )}
              </p>
              <div className="absolute top-3 right-3 flex space-x-2">
                <BookmarkCheck className="text-blue-500 cursor-pointer" />
                <Bookmark
                  className="text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveBookmark(event._id);
                  }}
                />
              </div>
            </div>
          ))}
      </div>

      {/* Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">{selectedEvent.eventTitle}</h2>
            <div
              className="mt-3 text-gray-600"
              dangerouslySetInnerHTML={{ __html: selectedEvent.eventDescription }}
            />
            <div className="mt-5 flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                onClick={() => handleRemoveBookmark(selectedEvent._id)}
              >
                Unbookmark
              </button>
              <a
                href={`http://localhost:5173/user/event/${selectedEvent._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
              >
                Visit Event
              </a>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserBookMarkEvents;