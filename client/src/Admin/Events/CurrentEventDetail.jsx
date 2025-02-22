import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CalendarDays, Clock, MapPin, Bookmark, ThumbsUp, User, Tag, Link, CheckCircle, XCircle } from "lucide-react";

const CurrentEventDetail = ({ event }) => {
  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <ToastContainer />

        {/* Event Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.eventTitle}</h1>

        {/* Event Category */}
        <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-full mb-6">
          {event.eventCategory || "General"}
        </span>

        {/* Event Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Date Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <CalendarDays size={20} className="text-green-600" />
              <h2 className="text-xl font-semibold">Date</h2>
            </div>
            <p>{new Date(event.eventDate).toLocaleDateString()}</p>
          </div>

          {/* Time Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <Clock size={20} className="text-green-600" />
              <h2 className="text-xl font-semibold">Time</h2>
            </div>
            <p>{event.eventTime}</p>
          </div>

          {/* Location Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <MapPin size={20} className="text-green-600" />
              <h2 className="text-xl font-semibold">Location</h2>
            </div>
            <p>{event.eventLocation}</p>
          </div>

          {/* Duration Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <Clock size={20} className="text-green-600" />
              <h2 className="text-xl font-semibold">Duration</h2>
            </div>
            <p>{event.eventDuration}</p>
          </div>

          {/* Event Status Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              {event.eventStatus === 'active' ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : (
                <XCircle size={20} className="text-red-600" />
              )}
              <h2 className="text-xl font-semibold">Status</h2>
            </div>
            <p className={`text-lg font-semibold ${event.eventStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              {event.eventStatus === 'active' ? 'Active' : 'Inactive'}
            </p>
          </div>

          {/* Organizer Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <User size={20} className="text-green-600" />
              <h2 className="text-xl font-semibold">Organizer</h2>
            </div>
            <p>{event.eventOrganizer || "N/A"}</p>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <div
            className="text-gray-700 prose"
            dangerouslySetInnerHTML={{ __html: event.eventDescription }}
          />
        </div>

        {/* Custom Form Data Card */}
        {event.eventCustomFormData && event.eventCustomFormData.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Custom Form Data</h2>
            <ul className="list-disc list-inside text-gray-700">
              {event.eventCustomFormData.map((data, index) => (
                <li key={index}>{JSON.stringify(data)}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Likes and Bookmarks Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Engagement</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-700">
              <ThumbsUp size={20} className="text-green-600" />
              <p>{event.eventLikes.filter(Boolean).length} Likes</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Bookmark size={20} className="text-green-600" />
              <p>{event.bookmarkedBy.filter(Boolean).length} Bookmarks</p>
            </div>
          </div>
        </div>

        {/* Registration Details Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Registration Details</h2>
          <p className="text-gray-700">
            Last Date to Register: {new Date(event.eventRegistrationLastDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            Registered Users: {event.eventRegistedUsers.filter(Boolean).length}
          </p>
        </div>

        {/* Reviews Card */}
        {event.eventReviews && event.eventReviews.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
            <ul className="list-disc list-inside text-gray-700">
              {event.eventReviews.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Insights */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Insights</h2>

          {/* Event Tags */}
          {event.eventTags && event.eventTags.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Tag size={20} className="text-green-600" />
                <h3 className="text-lg font-semibold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.eventTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Links */}
          {event.eventSocialMediaLinks && event.eventSocialMediaLinks.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Link size={20} className="text-green-600" />
                <h3 className="text-lg font-semibold">Social Media Links</h3>
              </div>
              <ul className="list-disc list-inside text-gray-700">
                {event.eventSocialMediaLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentEventDetail;