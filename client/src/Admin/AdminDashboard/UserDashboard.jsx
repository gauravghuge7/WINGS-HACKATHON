import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { toast } from "react-toastify";
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const UserDashboard = () => {
      
      const { fetchData, loading } = useSendFormData();
      const [data, setData] = useState();

      // Mock API function to fetch user insights (replace with your actual API call)
      const fetchUserInsights = async () => {
            
            const {data, error, success } = await fetchData("/api/v1/admin/getUserInsights");
      
            if(error) {
                  console.log(error);
                  return;
            }
            
            console.log(data);
            toast.success(success);
            setData(data?.data);

      };
    

      useEffect(() => {
        fetchUserInsights();
      },[]);


      if (loading) return <div className="text-center">Loading...</div>;
      

      // Data for the bar chart
      const chartData = {
      labels: ["Active Users", "Blocked Users", "Registered for Events"],
      datasets: [
            {
            label: "User Insights",
            data: [data?.activeUsers, data?.blockedUsers, data?.registeredUsers],
            backgroundColor: ["#4ade80", "#f87171", "#60a5fa"],
            borderColor: ["#4ade80", "#f87171", "#60a5fa"],
            borderWidth: 1,
            },
      ],
      };

      const chartOptions = {
      responsive: true,
      plugins: {
            legend: {
            position: "top",
            },
            title: {
            display: true,
            text: "User Insights Overview",
            },
      },
      };

      return (
      <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Active Users</h2>
            <p className="text-2xl font-bold text-green-500">{data?.activeUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Blocked Users</h2>
            <p className="text-2xl font-bold text-red-500">{data?.blockedUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Registered for Events</h2>
            <p className="text-2xl font-bold text-blue-500">{data?.registeredUsers}</p>
            </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Insights Overview</h2>
            <Bar data={chartData} options={chartOptions} />
            </div>
      </div>
      );
};

export default UserDashboard;