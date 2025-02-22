import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useSelector } from "react-redux";

import useReactApi from "../../hooks/useReactApi/useReactApi";
import { toast } from 'react-toastify';

export default function EventDashboard() {

  const [redux_events, setRedux_events] = useState([]);


  const { fetchData, loading } = useReactApi();


  const fetchEvents = async () => {
    
    try {

      const { data, error, success } = await fetchData("/api/v1/admin/events/showAllEvents");
       
      if (error) {
        console.log(error);
        toast.error(error);
        return;
      }
       
      toast.success(success);
      setRedux_events(data?.data?.events);
    } 
    catch (error) {
      console.log(error);  
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);


  const currentDate = new Date();
  const eventStatusData = redux_events.reduce(
    (acc, event) => {
      const eventDate = new Date(event.eventDate);
      if (event.eventBlocked) {
        acc.blocked += 1;
      } else if (eventDate < currentDate) {
        acc.completed += 1;
      } else if (eventDate >= currentDate) {
        acc.upcoming += 1;
      }
      return acc;
    },
    { active: 0, upcoming: 0, completed: 0, blocked: 0 }
  );

  const eventData = [
    { name: "Active", value: eventStatusData.active, color: "#4CAF50" },
    { name: "Upcoming", value: eventStatusData.upcoming, color: "#FFC107" },
    { name: "Completed", value: eventStatusData.completed, color: "#F44336" },
    { name: "Blocked", value: eventStatusData.blocked, color: "#9E9E9E" },
  ];

  const engagementData = redux_events.reduce(
    (acc, event) => {
      acc.registrations += event.eventRegistedUsers?.length;
      acc.checkIns += event.eventCustomFormData.filter((form) => form.checkedIn).length;
      acc.feedback += event.eventReviews.length;
      acc.likes += event.eventLikes.length;
      acc.shares += event.eventShares.length;
      acc.bookmarks += event.bookmarkedBy.length;
      return acc;
    },
    { registrations: 0, checkIns: 0, feedback: 0, likes: 0, shares: 0, bookmarks: 0 }
  );

  const engagementChartData = [
    { name: "Registrations", count: engagementData.registrations, color: "#1E88E5" },
    { name: "Check-ins", count: engagementData.checkIns, color: "#43A047" },
    { name: "Feedback Given", count: engagementData.feedback, color: "#FB8C00" },
    { name: "Likes", count: engagementData.likes, color: "#E53935" },
    { name: "Shares", count: engagementData.shares, color: "#8E24AA" },
    { name: "Bookmarks", count: engagementData.bookmarks, color: "#FDD835" },
  ];

  const participationRate = engagementData.registrations > 0
    ? ((engagementData.checkIns / engagementData.registrations) * 100).toFixed(2)
    : 0;

  const feedbackSentiment = {
    positive: redux_events.reduce((acc, event) => acc + event.eventReviews.filter((review) => review.sentiment === "positive").length, 0),
    negative: redux_events.reduce((acc, event) => acc + event.eventReviews.filter((review) => review.sentiment === "negative").length, 0),
    neutral: redux_events.reduce((acc, event) => acc + event.eventReviews.filter((review) => review.sentiment === "neutral").length, 0),
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h6" className="mb-4 text-blue-700 font-bold">
            Event Engagement Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Bar dataKey="count">
                {engagementChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h6" className="mb-4 text-green-600 font-bold">
            Participation Rate
          </Typography>
          <Typography variant="h4" className="text-blue-500 font-extrabold">
            {participationRate}%
          </Typography>
          <Typography variant="body2">
            {engagementData.checkIns} check-ins out of {engagementData.registrations} registrations.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
