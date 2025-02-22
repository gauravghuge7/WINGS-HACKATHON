import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import useSendFormData from './../../Hooks/useSendFormData/useSendFormData';
import CurrentEventDashboard from './CurrentEventDashboard';
import CurrentEventDetail from './CurrentEventDetails';


const UserDashboard = () => {
    const { eventId } = useParams(); // Get eventId from URL params
    const [event, setEvent] = useState(null);
    const [userDashboard, setUserDashboard] = useState(null);
    const { loading, fetchData } = useSendFormData();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('details'); // Default to 'details' tab

    // Fetch event details from API
    const fetchEventDetails = async () => {
        try {
            const { data, error } = await fetchData(`/api/v1/user/profile/getUserDashboard`);

            if (error) {
                console.log(error);
                toast.error(error);
                return;
            }

            toast.success("Event details fetched successfully");

            // Set event and userDashboard data
            setEvent(data.events.find((e) => e._id === eventId)); // Find the specific event by eventId
            setUserDashboard(data.userDashboard);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch event details");
        }
    };

    // Fetch event details on mount
    useEffect(() => {
        fetchEventDetails();
    }, [eventId]);

    // Render loading state
    if (loading) {
        return <div className="text-center py-8">Loading event details...</div>;
    }

    // Render error state
    if (!event || !userDashboard) {
        return <div className="text-center py-8">No event or user data found.</div>;
    }

    return (
        <>
            {/* Back Button */}
            <button
                className="flex border ml-8 border-gray-300 items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 mb-6"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft size={24} />
                <span>Back</span>
            </button>

            <div className="flex">
                {/* Main Content */}
                <div className="flex-1"> {/* flex-1 allows this div to take up remaining space */}
                    {/* Render the active tab */}
                    {activeTab === 'details' && (
                        <CurrentEventDetail
                            event={event}
                            userDashboard={userDashboard}
                        />
                    )}
                    {activeTab === 'dashboard' && (
                        <CurrentEventDashboard
                            event={event}
                            userDashboard={userDashboard}
                        />
                    )}
                </div>

                {/* Sidebar on the Right */}
                <div className="w-64 bg-green-50 p-6 gap-8 border-l border-green-200">
                    {/* Button to switch to Details tab */}
                    <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 mt-4"
                        onClick={() => setActiveTab('details')}
                    >
                        Details
                    </button>

                    {/* Button to switch to Dashboard tab */}
                    <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 mt-4"
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </button>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </>
    );
};

export default UserDashboard;