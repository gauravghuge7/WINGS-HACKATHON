import { useState, useEffect } from "react";
import { socket } from "../../../main";
import NotificationsIcon from "@mui/icons-material/Notifications"; // Import the Material Icon

const NotificationButton = () => {
  const [status, setStatus] = useState("default"); // Track notification permission status
  const [showPopup, setShowPopup] = useState(false); // Show popup if notifications are blocked
  const [notifications, setNotifications] = useState([]); // Store received notifications

  // Check notification permission status on component mount
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setStatus("granted");
      } else if (Notification.permission === "denied") {
        setStatus("blocked");
      }
    }
  }, []);

  // Listen for real-time notifications from the socket
  useEffect(() => {

    const handleReceiveNotification = (data) => {
      console.log("data :", data);
      setNotifications((prev) => [...prev, data?.response]); // Add new notification to the list

      // Show browser notification if permission is granted
      if (Notification.permission === "granted") {
        new Notification("New Notification", {
          body: data?.response?.message,
          icon: "https://example.com/icon.png", // Optional: Add an icon
        });
      }
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
          setShowPopup(true); // Show popup
          setTimeout(() => setShowPopup(false), 6000); // Hide after 6 seconds
        }
      });
    }
  };

  // Handle click on a notification
  const handleNotificationClick = (link) => {
    if (link) {
      window.open(link, "_blank"); // Open the link in a new tab
    }
  };

  return (
    <div className="relative">
      {/* Enable Notifications Button */}
      {(status === "default" || status === "denied" || status === "") && (
        <button
          onClick={handleEnableNotifications}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            status === "granted"
              ? "bg-gray-300 text-gray-700 cursor-default"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={status === "granted"}
        >
          {status === "granted" ? "Notifications Enabled" : "Enable Notifications"}
        </button>
      )}

      {/* Popup for Blocked Notifications */}
      {showPopup && (
        <div className="absolute left-0 mt-2 w-64 p-3 bg-red-100 text-red-600 border border-red-400 rounded-md shadow-md">
          <p>⚠️ Notifications are blocked.</p>
          <p>Manually enable them:</p>
          <ol className="list-decimal list-inside text-sm">
            <li>Click the **🔒 Lock icon** next to the URL</li>
            <li>Find **Notifications**</li>
            <li>Set to **Allow** and refresh</li>
          </ol>
        </div>
      )}

      {/* Display Received Notifications */}
      {status === "granted" && (
        <div className="mt-4">
          <NotificationsIcon className="text-blue-600 mr-2" /> {/* Material Icon */}
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={() => handleNotificationClick(notification.link)}
              >
                <div className="flex items-center">
                  
                  <div>
                    <p className="font-medium">{notification.message}</p>
                    {notification.link && (
                      <p className="text-sm text-blue-500 hover:underline">Click to view more</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;