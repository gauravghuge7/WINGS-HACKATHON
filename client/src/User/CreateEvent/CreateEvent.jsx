import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import gsap from "gsap";
import "react-quill/dist/quill.snow.css";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateEvent.css";

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventOrganiser: "",
    eventSubject: "",
    eventType: "",
    eventLocation: "",
    eventRegistrationLastDate: "",
    eventUserCapacity: "",
    eventDate: "",
    eventDuration: "",
    eventTime: "",
    eventContactDetails: "",
    eventTeamMembers: "",
    eventDescription: "",
    eventBanner: null,
    eventLogo: null,
  });

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    scheduling: false,
    media: false,
    customForm: false,
  });

  const userData = JSON.parse(localStorage?.getItem('data') || {});
  const [eventDescription, setEventDescription] = useState("");
  const { sendFormData, error } = useSendFormData();
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.UserReducer?.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const icons = document.querySelectorAll(".floating-icon");
    icons.forEach((icon) => {
      gsap.to(icon, {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });
  }, []);

  useEffect(() => {
    if (formData.eventTitle.trim().length > 3) {
      fetchAiSuggestions(formData.eventTitle);
    }
  }, [formData.eventTitle]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData?._id) {
      toast.error("User not found");
      return;
    }

    formData.eventDescription = eventDescription;
    formData.eventOrganiser = userData?._id;
    formData.eventCustomFormData = fields;

    try {
      let res = await sendFormData("http://localhost:5000/api/v1/event/create", formData);

      if (res?.data?.statusCode == 200) {
        toast.success("Event created successfully");
        navigate("/latestEvents");
      } else {
        console.log(res?.error);
        toast.error(res?.error);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  const handleImplement = () => {
    setEventDescription(aiSuggestions);
    setAiSuggestions(null);
  };

  const fetchAiSuggestions = async (eventTitle) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user-event/api/generate-description", {
        inputText: eventTitle,
      });
      setAiSuggestions(response?.data?.description?.trim());
    } catch (error) {
      console.log("error => ", error);
    }
    setLoading(false);
  };

  // Custom Form Builder
  const [fields, setFields] = useState([]);
  const addField = (type) => {
    setFields([...fields, { type, id: Date.now(), heading: "", options: [""], required: false }]);
  };
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };
  const updateField = (id, fieldName, value) => {
    setFields(fields.map(field => field.id === id ? { ...field, [fieldName]: value } : field));
  };
  const updateOption = (fieldId, index, value) => {
    setFields(fields.map(field => field.id === fieldId ? { ...field, options: field.options.map((option, idx) => idx === index ? value : option) } : field));
  };
  const addOption = (fieldId) => {
    setFields(fields.map(field => field.id === fieldId ? { ...field, options: [...field.options, ""] } : field));
  };
  const removeOption = (fieldId, index) => {
    setFields(fields.map(field => field.id === fieldId ? { ...field, options: field.options.filter((_, idx) => idx !== index) } : field));
  };
  const toggleRequired = (id) => {
    setFields(fields.map(field => field.id === id ? { ...field, required: !field.required } : field));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="container mx-auto p-6 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* Basic Information Section */}
        <div className="bg-gray-900 rounded-lg shadow-lg">
          <button
            type="button"
            onClick={() => toggleSection('basic')}
            className="w-full p-4 text-left font-semibold bg-gray-800 rounded-t-lg flex justify-between items-center"
          >
            Basic Information
            <span>{expandedSections.basic ? '▲' : '▼'}</span>
          </button>
          {expandedSections.basic && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Event Name</label>
                <input
                  type="text"
                  name="eventTitle"
                  value={formData.eventTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Organizer Name</label>
                <input
                  type="text"
                  name="eventOrganiser"
                  value={user?.userFirstName + " " + user?.userLastName}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Event Subject</label>
                <input
                  type="text"
                  name="eventSubject"
                  value={formData.eventSubject}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Event Type</label>
                <input
                  type="text"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">Event Description</label>
                <ReactQuill
                  value={eventDescription}
                  onChange={setEventDescription}
                  className="bg-gray-800 border border-gray-700 rounded text-white"
                />
                {aiSuggestions && (
                  <div className="mt-4 bg-gray-800 p-4 rounded border-l-4 border-blue-500">
                    <p className="italic text-gray-300 whitespace-pre-line">{aiSuggestions}</p>
                    <div className="mt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={handleImplement}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded"
                      >
                        Use
                      </button>
                      <button
                        type="button"
                        onClick={() => setAiSuggestions(null)}
                        className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-4 rounded"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Scheduling Details Section */}
        <div className="bg-gray-900 rounded-lg shadow-lg">
          <button
            type="button"
            onClick={() => toggleSection('scheduling')}
            className="w-full p-4 text-left font-semibold bg-gray-800 rounded-t-lg flex justify-between items-center"
          >
            Scheduling Details
            <span>{expandedSections.scheduling ? '▲' : '▼'}</span>
          </button>
          {expandedSections.scheduling && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Event Location</label>
                <input
                  type="text"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Registration Last Date</label>
                <input
                  type="date"
                  name="eventRegistrationLastDate"
                  value={formData.eventRegistrationLastDate}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">User Capacity</label>
                <input
                  type="number"
                  name="eventUserCapacity"
                  value={formData.eventUserCapacity}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Event Time</label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Event Duration</label>
                <input
                  type="text"
                  name="eventDuration"
                  value={formData.eventDuration}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Team Members</label>
                <input
                  type="number"
                  name="eventTeamMembers"
                  value={formData.eventTeamMembers}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Contact Details</label>
                <input
                  type="text"
                  name="eventContactDetails"
                  value={formData.eventContactDetails}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Media Uploads Section */}
        <div className="bg-gray-900 rounded-lg shadow-lg">
          <button
            type="button"
            onClick={() => toggleSection('media')}
            className="w-full p-4 text-left font-semibold bg-gray-800 rounded-t-lg flex justify-between items-center"
          >
            Media Uploads
            <span>{expandedSections.media ? '▲' : '▼'}</span>
          </button>
          {expandedSections.media && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Event Banner</label>
                <input
                  type="file"
                  name="eventBanner"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-300"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Event Logo</label>
                <input
                  type="file"
                  name="eventLogo"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* Custom Form Builder Section */}
        <div className="bg-gray-900 rounded-lg shadow-lg">
          <button
            type="button"
            onClick={() => toggleSection('customForm')}
            className="w-full p-4 text-left font-semibold bg-gray-800 rounded-t-lg flex justify-between items-center"
          >
            Custom Registration Form
            <span>{expandedSections.customForm ? '▲' : '▼'}</span>
          </button>
          {expandedSections.customForm && (
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {["text", "radio", "checkbox", "dropdown", "textarea"].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addField(type)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    Add {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">{field.type.charAt(0).toUpperCase() + field.type.slice(1)}</span>
                      <button
                        type="button"
                        onClick={() => removeField(field.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-blue-500 mb-3"
                      placeholder="Enter heading"
                      value={field.heading}
                      onChange={(e) => updateField(field.id, "heading", e.target.value)}
                    />
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={() => toggleRequired(field.id)}
                        className="mr-2"
                      />
                      <span className="text-sm">Required</span>
                    </div>
                    {["radio", "checkbox", "dropdown"].includes(field.type) && (
                      <div className="space-y-2">
                        {field.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                              placeholder={`Option ${index + 1}`}
                              value={option}
                              onChange={(e) => updateOption(field.id, index, e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(field.id, index)}
                              className="text-red-400 hover:text-red-500"
                            >
                              X
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addOption(field.id)}
                          className="text-blue-400 hover:text-blue-500 text-sm"
                        >
                          + Add Option
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EventForm;