import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from "../../Redux/AdminReducer/AdminReducer";

const ShowAllEvents = () => {
  const { loading, fetchData } = useSendFormData();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 20;
  const [eventsData, setEventsData] = useState([]);

  const redux_events = useSelector(state => state.adminReducer.events); // Updated selector

  console.log(redux_events);

  useEffect(() => {
    setEventsData(redux_events);
    
  }, [redux_events]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return eventsData
      ?.filter((event) => {
        const matchesSearch = event?.eventTitle?.toLowerCase()?.includes(search?.toLowerCase());
        const matchesCategory = category === "All" || event?.category === category;
        return matchesSearch && matchesCategory;
      })
      ?.sort((a, b) => new Date(a?.eventDate) - new Date(b?.eventDate));
  }, [eventsData, search, category]);

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents?.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents?.length / eventsPerPage);

  


  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Upcoming Events</h1>

      {/* Search and Category Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {Array.from(new Set(eventsData.map((event) => event.category))).map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Event Cards */}
      <div className="flex flex-wrap gap-8 justify-center">
        {currentEvents.map((event) => (
          <div
            key={event._id} // Use event._id instead of event.id
            className="shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 w-[30%] "
          >
            <div className="p-8 bg-green-50 hover:bg-green-100 transition-colors duration-300">
              <div className="flex flex-col justify-between items-start gap-4">
                {/* Event Title */}
                <h5 className="text-2xl font-bold text-gray-900">{event.eventTitle}</h5>

                {/* Event Subject */}
                <p className="text-lg text-gray-700">{event.eventSubject}</p>

                {/* Event Date with Icon */}
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays size={16} className="text-green-600" />
                  <span className="text-sm">{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>

                {/* Event Category Badge */}
                {
                  event.eventCategory &&
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-full">
                    {event.eventCategory}
                  </span>
                }

                {/* View Details Button */}
                <button
                  className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
                  onClick={() => navigate(`/admin/view-event-details/${event._id}`)} // Use event._id
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-dark mx-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-dark mx-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowAllEvents;