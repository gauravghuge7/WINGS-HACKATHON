/* eslint-disable no-unused-vars */
import React from "react";
import "./MovingCards.css"; // Import custom CSS for animation

const MovingCards = () => {
  const cardsData = [
    {
      title: "Event Planning",
      description:
        "Organize and manage events with ease. Track everything from planning to execution.",
      bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
    },
    {
      title: "Ticket Management",
      description:
        "Handle ticket sales and registration, offering multiple pricing tiers and attendee tracking.",
      bgColor: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      title: "Venue Coordination",
      description:
        "Coordinate with venues for optimal layouts, schedules, and accommodations.",
      bgColor: "bg-gradient-to-r from-purple-400 to-purple-600",
    },
    {
      title: "Event Analytics",
      description:
        "Analyze event success with comprehensive reports and metrics to improve future events.",
      bgColor: "bg-gradient-to-r from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="flex gap-8 justify-center py-16 px-8 sm:px-16 overflow-hidden relative">
      <div className="moving-cards-wrapper flex animate-slide">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`${
              card.bgColor
            } p-6 rounded-xl shadow-lg w-72 hover:scale-105 transform transition-all duration-300 ease-in-out mx-4 flex flex-col justify-between space-y-4`}
          >
            <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
            <p className="text-white">{card.description}</p>
            <div className="mt-4 text-white text-lg font-semibold">Learn More →</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingCards;
