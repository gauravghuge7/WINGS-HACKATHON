import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector } from "react-redux";

const ShowCurrentDateEvents = React.memo(({ date }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Access Redux state (if needed)
  const redux_events = useSelector(state => state.adminReducer.events); 
  console.log("redux_events => ", redux_events);

  // Validate the date and format it
  const selectedDate = useMemo(() => {
    const isValidDate = !isNaN(date.getTime());
    return isValidDate ? date.toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
  }, [date]);

  // Filter events for the selected date
  const events = useMemo(() => {
    if (!redux_events || !Array.isArray(redux_events)) return []; // Ensure redux_events is an array

    return redux_events.filter((event) => {
      const eventDate = new Date(event.eventDate).toISOString().split("T")[0]; // Extract date part
      return eventDate === selectedDate; // Compare with the selected date
    });
  }, [redux_events, selectedDate]);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Events on {selectedDate}</h2>
      {events.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {events.map((event) => (
            <div
              key={event._id} // Use event._id as the key
              className="p-4 bg-white shadow-md rounded-lg border-l-4 border-blue-500 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/admin/view-event-details/${event._id}`)} // Navigate to event details
            >
              <h3 className="text-xl font-semibold">{event.eventTitle}</h3>
              <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">
                {event.eventSubject || "Uncategorized"}
              </span>
              <p className="text-gray-600 mt-2">{event.eventType}</p>
              <p className="text-gray-600 mt-2">{event.eventDuration}</p>
              <p className="text-gray-600 mt-2">Location: {event.eventLocation}</p>
              <p className="text-gray-600 mt-2">Time: {event.eventTime}</p>
            </div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500 mt-4">No events for this date.</p>
      )}
    </div>
  );
});

export default ShowCurrentDateEvents;