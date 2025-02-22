
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { Users, ThumbsUp, CalendarDays, MapPin, Clock } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const CurrentEventDashboard = ({ event }) => {
  if (!event) {
    return <div className="text-center py-8">No event data available.</div>;
  }

  // Validate and calculate counts
  const registeredUsersCount = Array.isArray(event.eventRegistedUsers) ? event.eventRegistedUsers.filter(Boolean).length : 0;
  const likesCount = Array.isArray(event.eventLikes) ? event.eventLikes.filter(Boolean).length : 0;
  const bookmarksCount = Array.isArray(event.bookmarkedBy) ? event.bookmarkedBy.filter(Boolean).length : 0;
  const sharesCount = Array.isArray(event.eventShares) ? event.eventShares.filter(Boolean).length : 0;

  // Data for the bar chart (Registered Users vs Capacity)
  const barChartData = {
    labels: ["Registered Users", "Event Capacity"],
    datasets: [
      {
        label: "Count",
        data: [registeredUsersCount, event.eventUserCapacity || 0],
        backgroundColor: ["#4ade80", "#60a5fa"],
        borderColor: ["#16a34a", "#2563eb"],
        borderWidth: 1,
      },
    ],
  };

  // Data for the pie chart (Registered Users by Category)
  const pieChartData = {
    labels: ["Category A", "Category B", "Category C"],
    datasets: [
      {
        label: "Registered Users",
        data: [30, 50, 20], // Replace with actual data
        backgroundColor: ["#4ade80", "#60a5fa", "#f87171"],
        borderColor: ["#16a34a", "#2563eb", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  // Data for the line chart (Registrations Over Time)
  const lineChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"], // Replace with actual dates
    datasets: [
      {
        label: "Registrations",
        data: [10, 30, 50, 70, 90], // Replace with actual data
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Data for the doughnut chart (Engagement Metrics)
  const doughnutChartData = {
    labels: ["Likes", "Bookmarks", "Shares"],
    datasets: [
      {
        label: "Engagement",
        data: [likesCount, bookmarksCount, sharesCount],
        backgroundColor: ["#4ade80", "#60a5fa", "#f87171"],
        borderColor: ["#16a34a", "#2563eb", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  // Data for the horizontal bar chart (Event Metrics Comparison)
  const horizontalBarChartData = {
    labels: ["Registrations", "Capacity", "Attendance"],
    datasets: [
      {
        label: "Count",
        data: [registeredUsersCount, event.eventUserCapacity || 0, 80], // Replace attendance with actual data
        backgroundColor: ["#4ade80", "#60a5fa", "#f87171"],
        borderColor: ["#16a34a", "#2563eb", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{event.eventTitle} Dashboard</h1>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Registered Users */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <Users size={20} className="text-green-600" />
            <h2 className="text-xl font-semibold">Registered Users</h2>
          </div>
          <p className="text-2xl font-bold">{registeredUsersCount}</p>
        </div>

        {/* Event Capacity */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <Users size={20} className="text-blue-600" />
            <h2 className="text-xl font-semibold">Event Capacity</h2>
          </div>
          <p className="text-2xl font-bold">{event.eventUserCapacity || 0}</p>
        </div>

        {/* Likes */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <ThumbsUp size={20} className="text-red-600" />
            <h2 className="text-xl font-semibold">Likes</h2>
          </div>
          <p className="text-2xl font-bold">{likesCount}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Registered Users vs Capacity</h2>
        <div className="h-64">
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Registered Users by Category</h2>
        <div className="h-64">
          <Pie data={pieChartData} options={chartOptions} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Registrations Over Time</h2>
        <div className="h-64">
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Engagement Metrics</h2>
        <div className="h-64">
          <Doughnut data={doughnutChartData} options={chartOptions} />
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Metrics Comparison</h2>
        <div className="h-64">
          <Bar
            data={horizontalBarChartData}
            options={{
              ...chartOptions,
              indexAxis: 'y', // Make the bar chart horizontal
            }}
          />
        </div>
      </div>

      {/* Event Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>

        {/* Event Date */}
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <CalendarDays size={20} className="text-green-600" />
          <p>{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : "N/A"}</p>
        </div>

        {/* Event Time */}
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <Clock size={20} className="text-green-600" />
          <p>{event.eventTime || "N/A"}</p>
        </div>

        {/* Event Location */}
        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <MapPin size={20} className="text-green-600" />
          <p>{event.eventLocation || "N/A"}</p>
        </div>
      </div>

      {/* Comments/Reviews */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments/Reviews</h2>
        <ul className="space-y-4">
          {Array.isArray(event.eventReviews) && event.eventReviews.length > 0 ? (
            event.eventReviews.map((review, index) => (
              <li key={index} className="text-gray-700">
                <p>{review}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No reviews available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CurrentEventDashboard;