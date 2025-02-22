import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useSendFormData from './../../Hooks/useSendFormData/useSendFormData';
import { toast, ToastContainer } from 'react-toastify';

function MyEvents() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const { fetchData } = useSendFormData();

    const getEvents = useCallback(async () => {
        try {
            const { data, error, success } = await fetchData("/api/v1/user/event/getAllUserEvents");

            if (error) {
                toast.error(error);
                setError(error);
                return;
            }

            toast.success(success);
            setEvents(data?.data?.events || []);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        return events.filter(event =>
            event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [events, searchTerm]);

    const paginatedEvents = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredEvents, currentPage, itemsPerPage]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredEvents.length / itemsPerPage);
    }, [filteredEvents, itemsPerPage]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    }, []);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {error && <span>{error}</span>}

                {paginatedEvents.map(event => (
                    <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img
                            src={event.imageUrl} // Add imageUrl to your event object if available
                            alt={event.eventTitle}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{event.eventTitle}</h2>
                            <p className="text-gray-600 text-sm mb-4" dangerouslySetInnerHTML={{ __html: event.eventDescription }}></p>
                            <p className="text-gray-500 text-xs">
                                Date: {new Date(event.eventDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-500 text-xs">
                                Time: {event.eventTime}
                            </p>
                            <p className="text-gray-500 text-xs">
                                Location: {event.eventLocation}
                            </p>
                            <Link
                                to={`/user/event/${event._id}`}
                                className="mt-4 inline-block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-4 py-2 rounded-md ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MyEvents;