import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  ArrowLeft, Lock, Unlock } from "lucide-react";

import { toast, ToastContainer } from "react-toastify";
import CurrentEventDetail from "./CurrentEventDetail";
import CurrentEventDashboard from './CurrentEventDashboard';
import useReactApi from "../../hooks/useReactApi/useReactApi";

const ViewEventDetails = () => {
      const { eventId } = useParams(); // Get eventId from URL params
      const [event, setEvent] = useState(null);
      const { loading, fetchData, sendFormData } = useReactApi();
      const navigate = useNavigate();
      const [activeTab, setActiveTab] = useState('details'); // Default to 'details' tab


      // Fetch event details from API
      const fetchEventDetails = async () => {
            try {
                  const { data, error, success } = await fetchData(`/api/v1/admin/events/viewEventDetails/${eventId}`);

                  if (error) {
                        console.log(error);
                        toast.error(error);
                        return;
                  }

                  toast.success(success);
                  setEvent(data.data);
            } catch (err) {
                  console.log(err);
            }
      };

      // Block/Unblock Event
      const toggleBlockEvent = async () => {
            try {
                  const { data, error, success } = await sendFormData(`/api/v1/admin/block-event`, {
                        eventId: eventId
                  });

                  if (error) {
                        toast.error(error);
                        return;
                  }

                  toast.success(success);
                  fetchEventDetails();
            } 
            catch (err) {
                  console.log(err);
            }
      };

      const unblockEvent = async () => {
            try {
                  const { data, error, success } = await sendFormData(`/api/v1/admin/unblock-event`, {
                        eventId: eventId
                  });

                  if (error) {
                        toast.error(error);
                        return;
                  }

                  toast.success(success);
                  fetchEventDetails();
            } 
            catch (err) {
                  console.log(err);
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
      if (!event) {
            return <div className="text-center py-8">No event found.</div>;
      }

      return (
            <> 
                  {/* Back Button */}
                  <button
                        className="flex border ml-8 border-gray-300 items-center gap-2 text-gray-600  hover:text-gray-800 transition-colors duration-300 mb-6"
                        onClick={() => navigate(-1)}
                  >
                  <ArrowLeft size={24} />
                  <span>Back</span>
                  </button>
                  <div className="flex">
      
                        
                  

                        {/* Main Content */}
                        <div className="flex-1"> {/* flex-1 allows this div to take up remaining space */}
                        {/* Render the active tab */}
                        {activeTab === 'details' && <CurrentEventDetail event={event} />}
                        {activeTab === 'dashboard' && <CurrentEventDashboard event={event} />}
                        </div>

                        {/* Sidebar on the Right */}
                        <div className="w-64 bg-green-50 p-6 gap-8 border-l border-green-200">
                        <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
                        onClick={() => event.eventBlocked ? unblockEvent() : toggleBlockEvent()}
                        >
                        {event.eventBlocked ? <Unlock size={18} /> : <Lock size={18} />}
                        {event.eventBlocked ? "Unblock Event" : "Block Event"}
                        </button>

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
            </>
      );
};

export default ViewEventDetails;