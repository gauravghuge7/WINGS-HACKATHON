import { useEffect, useState } from "react";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";

function Userdashboard() {
  const { loading, fetchData } = useSendFormData();
  const [eventData, setEventData] = useState(null);

  // Function to transform API data into the expected eventData structure
  const transformData = (apiData) => {
    const userEvents = apiData.userData[0].userEvents; // Get all user events

    // Assuming we want to display the first event in the dashboard
    const userEvent = userEvents[0];

    return {
      eventName: userEvent.eventTitle,
      activityCount: userEvent.eventRegistedUsers?.length || 0, // Number of registered users
      upcomingCount: userEvents.filter(
        (event) => new Date(event.eventDate) > new Date()
      ).length, // Count of upcoming events
      overdueCount: userEvents.filter(
        (event) => new Date(event.eventDate) < new Date()
      ).length, // Count of overdue events
      waitingCount: userEvents.filter(
        (event) => !event.eventRegistedUsers || event.eventRegistedUsers.length === 0
      ).length, // Count of events with no registrations
      tools: [
        { name: "Tool 1", count: 3 }, // Example tools, replace with actual data
        { name: "Tool 2", count: 5 },
      ],
      headcounts: {
        estimated: userEvent.eventUserCapacity || 0, // Estimated headcount
        actual: userEvent.eventRegistedUsers?.length || 0, // Actual headcount
        minimum: 100, // Example value, replace with actual logic
      },
      tags: ["Tag 1", "Tag 2", "Tag 3"], // Example tags, replace with actual data
      venue: {
        name: userEvent.eventLocation || "No location specified",
        address: "123 Example St, City, Country", // Example address, replace with actual data
        time: userEvent.eventTime || "No time specified",
      },
    };
  };

  // Fetch and transform user data
  const getUserData = async () => {
    try {
      const { data, error, success } = await fetchData("/api/v1/user/profile/getUserDashboard");
      console.log("data => ", data);
      console.log("error => ", error);
      console.log("success => ", success);

      if (error) {
        console.log("error => ", error);
        return;
      }

      // Transform the API data
      const transformedData = transformData(data.data);
      setEventData(transformedData);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getUserData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // No event data state
  if (!eventData) {
    return <div>No event data available</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Header Section */}
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{eventData.eventName}</h1>
          <p className="text-sm text-gray-500">Event Dashboard</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
          <button className="bg-gray-200 px-3 py-1 rounded">Export</button>
          <button className="bg-gray-200 px-3 py-1 rounded">Duplicate</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Circular Stats */}
        <div className="bg-white p-4 shadow rounded col-span-2">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: "Activity", value: eventData.activityCount, color: "green", icon: "📊" },
              { label: "Upcoming", value: eventData.upcomingCount, color: "blue", icon: "📅" },
              { label: "Overdue", value: eventData.overdueCount, color: "red", icon: "⚠️" },
              { label: "Waiting", value: eventData.waitingCount, color: "orange", icon: "⏳" },
            ].map((stat, index) => (
              <div key={index} className="">
                <div
                  className={`rounded-full w-16 h-16 mx-auto flex items-center justify-center bg-${stat.color}-200`}
                >
                  <span className={`text-${stat.color}-600 text-xl font-bold`}>
                    {stat.icon} {stat.value}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments & Tools */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Tools</h2>
          <ul className="text-sm space-y-2">
            {eventData.tools.map((tool, index) => (
              <li key={index} className="flex justify-between">
                <span>{tool.name}</span>
                <span className="bg-gray-200 text-xs px-2 py-1 rounded">{tool.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Headcounts & Tags */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Headcounts</h2>
          <div className="space-y-2">
            {[
              { label: "Estimated", value: eventData.headcounts.estimated },
              { label: "Actual", value: eventData.headcounts.actual },
              { label: "Minimum", value: eventData.headcounts.minimum },
            ].map((headcount, index) => (
              <div key={index} className="flex justify-between">
                <span>{headcount.label}</span>
                <span className="bg-gray-200 text-xs px-2 py-1 rounded">{headcount.value}</span>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-4">Tags</h2>
          <div className="flex space-x-2">
            {eventData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Venue Details */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-4">Venue Details</h2>
          <p className="text-sm text-gray-600">{eventData.venue.name}</p>
          <p className="text-sm text-gray-600 mt-2">{eventData.venue.address}</p>
          <p className="text-sm text-gray-600 mt-2">{eventData.venue.time}</p>
        </div>
      </div>
    </div>
  );
}

export default Userdashboard;