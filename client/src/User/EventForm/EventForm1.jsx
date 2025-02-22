import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom"; 
import "react-quill/dist/quill.snow.css";

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventCategory: "", // Added the new "eventCategory" field
    organizerName: "",
    eligibility: "",
    startDate: "",
    endDate: "",
    description: "",
    prizes: "",
    contactEmail: "",
    contactNumber: "",
  });
  const [aboutOpportunity, setAboutOpportunity] = useState("");
  const [error, setError] = useState("");
  const MIN_WORD_LIMIT = 500;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const wordCount = aboutOpportunity.trim().split(/\s+/).length;
    if (wordCount < MIN_WORD_LIMIT) {
      setError(`Please enter at least ${MIN_WORD_LIMIT} words in the "About Opportunity" section.`);
      return;
    }
    setError("");
    console.log("Form Data Submitted:", { ...formData, aboutOpportunity });
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Form Header */}
      <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">List Your Opportunity</h1>
        <p className="text-sm text-gray-600">
          Fill in the details of the opportunity you are listing. Include rules, eligibility,
          process, format, etc., to get the opportunity approved.
        </p>
      </div>

      {/* Form Body */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 mt-6 max-w-4xl mx-auto space-y-6"
      >
        {/* Event Details Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Event Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                placeholder="Enter event name"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <input
                type="text"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                placeholder="Enter event type"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Category</label>
              <select
                name="eventCategory" // Name for the new field
                value={formData.eventCategory}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select Category</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
                <option value="Competition">Competition</option>
                <option value="Webinar">Webinar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Organizer Name</label>
              <input
                type="text"
                name="organizerName"
                value={formData.organizerName}
                onChange={handleInputChange}
                placeholder="Enter organizer name"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Eligibility</label>
              <input
                type="text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                placeholder="Enter eligibility criteria"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Dates Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Prizes and Rules Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Prizes & Rules</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prizes</label>
            <input
              type="text"
              name="prizes"
              value={formData.prizes}
              onChange={handleInputChange}
              placeholder="Enter prize details"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* About Opportunity Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">About Opportunity</h2>
          <ReactQuill
            value={aboutOpportunity}
            onChange={setAboutOpportunity}
            className="bg-white border rounded-md"
          />
          <p className="text-sm text-gray-500 mt-2">Minimum Word Limit: 500</p>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="Enter contact email"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Enter contact number"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
