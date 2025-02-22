import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import ShowCurrentDateEvents from "./ShowCurrentDateEvents";

const AdminCalendar = ({ selectedDate: initialSelectedDate }) => {
  // Memoize the initial date and its validity
  const initialDate = useMemo(() => new Date(initialSelectedDate), [initialSelectedDate]);
  const isValidDate = useMemo(() => !isNaN(initialDate.getTime()), [initialDate]);

  // State for the selected date and current time
  const [date, setDate] = useState(isValidDate ? initialDate : new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Memoize the calendar change handler
  const handleDateChange = useCallback((newDate) => {
    setDate(newDate);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Admin Calendar</h1>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 bg-white shadow-lg rounded-xl"
        >
          <Calendar
            onChange={handleDateChange} // Use stable callback
            value={date}
            className="rounded-lg border"
          />
        </motion.div>

        {/* Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg"
        >
          <Clock
            value={currentTime}
            size={300}
            renderNumbers={true}
            className="react-clock"
          />
        </motion.div>
      </div>

      {/* Show Events for Selected Date */}
      <ShowCurrentDateEvents date={date} />
    </div>
  );
};

export default React.memo(AdminCalendar); // Memoize the entire component