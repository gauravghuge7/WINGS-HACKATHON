/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import "./TrendingEvents.css";

const TrendingEvents = () => {
  // Example event data with working image URLs
  const events = [
    {
      id: 1,
      title: "Tech Innovators Conference 2025",
      date: "March 15, 2025",
      location: "San Francisco, CA",
      image: "https://via.placeholder.com/400x250.png?text=Tech+Innovators+Conference",
      description: "Join the brightest minds in tech for a day of innovation and networking.",
    },
    {
      id: 2,
      title: "Art & Design Expo",
      date: "April 5, 2025",
      location: "New York, NY",
      image: "https://via.placeholder.com/400x250.png?text=Art+%26+Design+Expo",
      description: "Explore the latest in art and design from top creators worldwide.",
    },
    {
      id: 3,
      title: "Global Business Summit",
      date: "May 20, 2025",
      location: "London, UK",
      image: "https://via.placeholder.com/400x250.png?text=Global+Business+Summit",
      description: "A premier event for business leaders to discuss global strategies.",
    },
    {
      id: 4,
      title: "Music Fest 2025",
      date: "June 10, 2025",
      location: "Austin, TX",
      image: "https://via.placeholder.com/400x250.png?text=Music+Fest+2025",
      description: "Experience an unforgettable day filled with music, food, and fun.",
    },
    {
      id: 5,
      title: "Startup Pitch Day",
      date: "July 8, 2025",
      location: "Seattle, WA",
      image: "https://via.placeholder.com/400x250.png?text=Startup+Pitch+Day",
      description: "Watch startups pitch their ideas to investors and industry leaders.",
    },
    {
      id: 6,
      title: "Health & Wellness Fair",
      date: "August 25, 2025",
      location: "Los Angeles, CA",
      image: "https://via.placeholder.com/400x250.png?text=Health+%26+Wellness+Fair",
      description: "Discover the latest trends in health, fitness, and mental wellness.",
    },
  ];

  // Ref for the scrollable container
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Automatic scrolling function for horizontal scroll
    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 3;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0; // Reset to the start when reaching the end
        }
      }
    };

    const intervalId = setInterval(scroll, 20); // Adjust speed here

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="p-6 md:p-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Trending Events</h1>
      <div className="relative">
        {/* Scrollable container for events */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-y-auto max-h-[500px] space-x-6 scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-[300px] max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                <p className="text-gray-700 mt-2 text-sm">{event.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingEvents;
