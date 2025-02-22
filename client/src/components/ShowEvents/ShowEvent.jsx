import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ShowEvent = () => {
    
  const [events, setEvents] = useState([]);

 
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/v1/event/getAll');
            const data = await response.json();
            setEvents(data.data);
            
            console.log("eventData => ", data.data);
            if(data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Upcoming Events</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <div
                            key={event._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <span className="material-icons text-indigo-500">event</span>
                                    {event.eventTitle}
                                </h2>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <span className="material-icons text-indigo-500">calendar_today</span>
                                    {event.eventDate}
                                </p>
                                <p className="text-gray-600 flex items-center gap-2">
                                    <span className="material-icons text-indigo-500">location_on</span>
                                    {event.eventLocation}
                                </p>
                                <div className="mt-4">
                                    <Link
                                        to={`/user/event/${event._id}`}
                                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ShowEvent;
