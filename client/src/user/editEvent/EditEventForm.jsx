/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
import gsap from "gsap";
// import "react-quill/dist/quill.snow.css";
import useSendFormData from "../../Hooks/useReactApi/useReactApi";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  });

  const navigate = useNavigate();
  const [eventDescription, seteventDescription] = useState("");
  const { 
    sendFormData, error } = useSendFormData();
  const user = useSelector((state) => state?.UserReducer?.userData);
  const [fields, setFields] = useState([]);  // for custom form builder
  const { id } = useParams();
  const eventId = id;

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
    const fetchEventData = async () => {
        let response = await axios.get(`http://localhost:5000/api/v1/event/${eventId}`);
        setFormData(response?.data?.data);
        setFields(response?.data?.data?.eventCustomFormData);
        seteventDescription(response?.data?.data?.eventDescription);
    }

    fetchEventData();

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.eventDescription = eventDescription;
    formData.eventOrganiser = user?._id;

    // insert custom fields data
    formData.eventCustomFormData = fields;
    
      const res = await axios.put(`http://localhost:5000/api/v1/event/update/${eventId}`, formData);
      
      if(res.status === 200) {
        toast.success("Event Updated successfully");
        navigate(`/user/event/${eventId}`);
      } else {
        toast.error("Error updating event");
      }
  
    
  };
       
    const addField = (type) => {
      setFields([...fields, { type, id: Date.now(), heading: "", options: [""], required: false }]);
    };

    const removeField = (id) => {
      setFields(fields.filter((field) => field.id !== id));
    };

    const updateField = (id, fieldName, value) => {
      setFields(fields.map(field =>
        field.id === id ? { ...field, [fieldName]: value } : field
      ));
    };

    const updateOption = (fieldId, index, value) => {
      setFields(fields.map(field =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.map((option, idx) => idx === index ? value : option)
            }
          : field
      ));
    };
  
    const addOption = (fieldId) => {
      setFields(fields.map(field =>
        field.id === fieldId
          ? { ...field, options: [...field.options, ""] }
          : field
      ));
    };
  
    const removeOption = (fieldId, index) => {
      setFields(fields.map(field =>
        field.id === fieldId
          ? { ...field, options: field.options.filter((_, idx) => idx !== index) }
          : field
      ));
    };
  
    const toggleRequired = (id) => {
      setFields(fields.map(field =>
        field.id === id ? { ...field, required: !field.required } : field
      ));
    };


  return (
    <div className="container mx-auto p-6 bg-gradient-to-b from-gray-100 to-blue-100 min-h-screen">
      <h1 className="text-2xl text-center text-gray-800 font-bold mb-4">Update Event</h1>
      <form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold">Event Name</label>
            <input type="text" name="eventTitle" value={formData.eventTitle} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="font-bold">Organizer Name</label>
            <input type="text" name="eventOrganiser" value={user?.userFirstName+" "+user?.userLastName} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="font-bold">Event Subject</label>
            <input type="text" name="eventSubject" value={formData.eventSubject} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">Event Type</label>
            <input type="text" name="eventType" value={formData.eventType} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">Event Location</label>
            <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">Registration Last Date</label>
            <input type="date" name="eventRegistrationLastDate" value={formData.eventRegistrationLastDate} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">User Capacity</label>
            <input type="number" name="eventUserCapacity" value={formData.eventUserCapacity} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">Event Date</label>
            <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">Event Time</label>
            <input type="time" name="eventTime" value={formData.eventTime} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">Event Duration</label>
            <input type="text" name="eventDuration" value={formData.eventDuration} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">Team Members</label>
            <input type="number" name="eventTeamMembers" value={formData.eventTeamMembers} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="font-bold">Contact Details</label>
            <input type="text" name="eventContactDetails" value={formData.eventContactDetails} onChange={handleInputChange} className="w-full p-2 border rounded" />
          </div>
        </div>
        <div className="mt-4">
          <label className="font-bold">Event Description</label>
          {/* <ReactQuill value={eventDescription} onChange={seteventDescription} className="bg-white border rounded-md" /> */}
        </div>
      </form>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Create Your Custom Form
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("text")}>Add Text</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("radio")}>Add Radio</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("checkbox")}>Add Checkbox</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("dropdown")}>Add Dropdown</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("textarea")}>Add Textarea</button>
        </div>

        <form className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-600 font-medium">
                  {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                </label>
                <button className="text-red-500 font-medium" onClick={() => removeField(field.id)}>Remove</button>
              </div>




              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter heading"
                value={field.heading}
                onChange={(e) => updateField(field.id, "heading", e.target.value)}
              />

              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={() => toggleRequired(field.id)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Required</span>
              </div>

              {["radio", "checkbox", "dropdown"].includes(field.type) && (
                <div className="mt-3 space-y-2">
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(field.id, index, e.target.value)}
                      />
                      <button className="text-red-500" type="button" onClick={() => removeOption(field.id, index)}>X</button>
                    </div>
                  ))}
                  <button className="text-blue-500 text-sm font-medium" type="button" onClick={() => addOption(field.id)}>+ Add Option</button>
                </div>
              )}

            </div>
          ))}
        </form>

        {/* <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 font-medium" onClick={submitForm}>
          Submit Form
        </button> */}
      </div>
    </div>


        {/* custom Form Builder end */}


        <button type="submit" onClick={handleSubmit} className="mt-4 w-full bg-green-500 text-white py-2 rounded">Update Event</button>
      {/* <CustomFormBuilder /> */}

      <ToastContainer />
    </div>
  );
};

export default EventForm;











