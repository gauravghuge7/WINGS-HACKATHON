import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { toast, ToastContainer } from "react-toastify";

const BlockedEvents = () => {
  const dispatch = useDispatch();
  const { sendFormData, fetchData } = useSendFormData();
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6; // Number of events per page

  // Fetch all events from Redux
  const allEvents = useSelector((state) => state.adminReducer.events);

  // Filter blocked events
  const blockedEvents = useMemo(() => {
    return allEvents.filter((event) => event.eventBlocked === true);
  }, [allEvents]);

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = blockedEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(blockedEvents.length / eventsPerPage);

  // Function to unblock an event
  const handleUnblockEvent = useCallback(
    async (eventId) => {
      try {
        const {data, error, success} = await sendFormData(`/api/v1/admin/unblock-event`, {
          eventId: eventId
        });

        if (error) {
          setError(error);
          return;
        }

        toast.success(success);

      } 
      catch (error) {
        setError(error.message);
      }
    },
    [dispatch, fetchData]
  );

  
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Blocked Events</h2>
      {error && <p className="text-red-500">{error}</p>}
      {blockedEvents.length === 0 ? (
        <p>No blocked events found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentEvents.map((event) => (
              <div key={event._id} className="bg-white shadow-md rounded p-4">
                <h3 className="text-lg font-semibold">{event.eventTitle}</h3>
                <p className="text-gray-600">{event.eventDescription}</p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-red-500 font-bold">Blocked</p>
                <button
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  onClick={() => handleUnblockEvent(event._id)}
                >
                  Unblock Event
                </button>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span className="mx-4 self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlockedEvents;