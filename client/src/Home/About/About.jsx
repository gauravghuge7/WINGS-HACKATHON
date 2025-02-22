/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center bg-[#f5f0eb] min-h ">
      

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl m-40">
        {/* Left Section */}
        <div className="flex-1 bg-black flex items-center justify-center p-5 relative ">
          <img
            src="https://media.istockphoto.com/id/810529310/photo/presenting-some-of-her-top-ideas-to-the-team.jpg?b=1&s=612x612&w=0&k=20&c=LdWUyZoIDJMBJ1Ektyuh_3oJ_IemAoYWVCPCzVeq77I="
            alt="A person in a coat standing in a modern, artistic display with the word 'TRUE' in the background."
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-[#f5f0eb] text-black p-5">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-5">
            About us.
          </h1>
          <p className="text-lg leading-relaxed mb-5">
            Focused on excellence for our clients, we are well established, with a reputation for great service and a high-quality finish.
          </p>
          <p className="text-lg leading-relaxed mb-5">
            With our roots in high end production, TRUE works on a wide spectrum of projects, with top international event organisers and designers. We delight in diversity, from luxury brand experiences to ambitious, large-scale live events.
          </p>
          <p className="text-lg leading-relaxed">
            The magic happens at TRUE HQ - a 3,000m² manufacturing facility in Billericay, Essex. A large, flexible space reconfigured for every project, creating the optimum work environment with plenty of room to test-build your project prior to installation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
