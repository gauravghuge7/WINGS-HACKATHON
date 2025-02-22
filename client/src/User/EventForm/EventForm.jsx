import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "",
  });
  
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.eventTitle.trim().length > 3) {
      fetchAiSuggestions(formData.eventTitle);
    }
  }, [formData.eventTitle]);

  const fetchAiSuggestions = async (eventTitle) => {
    setLoading(true);
    try {
      const response = await axios.post("https://api.openai.com/v1/completions", {
        model: "text-davinci-003",
        prompt: `Generate an engaging event description and relevant form fields for the event titled: ${eventTitle}`,
        max_tokens: 150,
      }, {
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          "Content-Type": "application/json",
        },
      });
      
      setAiSuggestions(response.data.choices[0].text.trim());
    } catch (error) {
      toast.error("Error fetching AI suggestions");
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImplement = () => {
    setFormData((prev) => ({ ...prev, eventDescription: aiSuggestions }));
    setAiSuggestions(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Your Event</h1>
      <form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <label className="font-bold">Event Name</label>
        <input
          type="text"
          name="eventTitle"
          value={formData.eventTitle}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />

        <label className="font-bold mt-4">Event Description</label>
        <ReactQuill value={formData.eventDescription} onChange={(value) => setFormData({ ...formData, eventDescription: value })} className="bg-white border rounded-md" />

        {aiSuggestions && (
          <div className="mt-4 bg-gray-200 p-4 rounded-md opacity-75">
            <p>{aiSuggestions}</p>
            <button onClick={handleImplement} className="mr-2 bg-green-500 text-white py-1 px-4 rounded">Implement</button>
            <button onClick={() => setAiSuggestions(null)} className="bg-red-500 text-white py-1 px-4 rounded">Remove</button>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default EventForm;
