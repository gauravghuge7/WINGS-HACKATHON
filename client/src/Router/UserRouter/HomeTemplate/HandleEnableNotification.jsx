import { useState, useEffect } from "react";
import { socket } from "../../../main";
import NotificationsIcon from "@mui/icons-material/Notifications"; // Material Icon for bell

const NotificationButton = () => {
  const [status, setStatus] = useState("default"); // Track notification permission status
  const [showDropdown, setShowDropdown] = useState(false); // Toggle notification dropdown
  const [notifications, setNotifications] = useState([]); // Store received notifications

  // Check notification permission status on component mount
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setStatus("granted");
      } 
      else if (Notification.permission === "denied") {
        setStatus("blocked");
      }
    }
  }, []);

  // Listen for real-time notifications from the socket
  useEffect(() => {
    const handleReceiveNotification = (data) => {

      console.log("data => ", data)
    
      new Notification("New Notification", {
        body: data?.message,
        icon: "https://example.com/icon.png", // Optional: Add an icon
      });
      
      setNotifications((prev) => [...prev, data?.message]); // Add new notification to the list
    };

    socket.on("receiveNotification", handleReceiveNotification);

    // Clean up the event listener
    return () => {
      socket.off("receiveNotification", handleReceiveNotification);
    };
  }, []);

  // Handle enabling notifications
  const handleEnableNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setStatus("granted");
        } else if (permission === "denied") {
          setStatus("blocked");
          setShowDropdown(true); // Show dropdown with instructions
          setTimeout(() => setShowDropdown(false), 6000); // Hide after 6 seconds
        }
      });
    }
  };

  // Handle click on a notification
  const handleNotificationClick = (link) => {
    if (link) {
      window.open(link, "_blank"); // Open the link in a new tab
    }
    setShowDropdown(false); // Close dropdown after clicking
  };

  // Toggle notification dropdown
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="relative flex items-center space-x-3">
      {/* Enable Notifications Button (Visible only if not granted) */}
      {status !== "granted" && (
        <button
          onClick={handleEnableNotifications}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 border border-blue-600 shadow-md transition duration-300"
        >
          Enable Notifications
        </button>
      )}

      {/* Bell Icon Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 border border-gray-700 shadow-md transition duration-300 focus:outline-none"
      >
        <NotificationsIcon fontSize="large" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border border-gray-900">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Dropdown (YouTube-like) */}
      {showDropdown && (
        <div className="absolute right-0 mt-24 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {
           notifications.length > 0 ? (
            <ul className="divide-y divide-gray-800">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="p-4 text-gray-300 hover:bg-gray-800 cursor-pointer transition duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <NotificationsIcon className="text-blue-400 flex-shrink-0" />
  
                    <p className="text-sm text-blue-400 font-medium">{notification}</p>
          
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-gray-400 text-sm text-center">
              No notifications yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;