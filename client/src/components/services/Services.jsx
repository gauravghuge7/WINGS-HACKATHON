import React from "react";

const Services = () => {
    return (
      <div className=" mt-14 flex flex-col items-center bg-gray-100 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">For Event Services
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Design and execute with confidence in the new event landscape
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          
          
          {
            services.map((service, index) => {
  
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-4 transition-transform duration-300 hover:scale-110 hover:shadow-2xl relative overflow-hidden group"
              >
              <img
                src={service.image}
                alt={service.alt}
                className="w-full rounded-lg"
              />
              <h2 className="text-lg font-semibold text-gray-800 mt-4">
                {service.title}
                src=&quot;https://play.vidyard.com/XeyyXjwfq5CKxcZPy28VXj.jpg&quot;
                alt=&quot;Screenshot of Cvent Attendee Hub interface&quot;
                className=&quot;w-full rounded-lg&quot;
              </h2>
              <h2 className="text-lg font-bold text-gray-800 mt-4">
              MyWebsite Attendee Hub<sup>®</sup>
              </h2>
            
              
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                <p className="text-gray-700 text-center">{service.description}</p>
              </div>
            
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 flex items-center mt-3 transition-colors duration-300"
              >
                {service.linkText} <i className="fas fa-arrow-right ml-2"></i>
                Build the perfect event <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
            })
          }
            
  
        
  
          <div className="bg-white rounded-lg shadow-lg w-full p-5 m-20">
          <img src="/image1.jpg" alt="Description" className="w-64 h-64 object-cover" />

            <h2 className="text-lg font-bold text-gray-800 mt-4">
            MyWebsite Studio<sup>™</sup>
            </h2>
            <p className="text-gray-700 mt-2">
              Easily produce webinars, virtual content, and more
            </p>
            <a
              href="#"
              className="text-blue-500 hover:underline flex items-center mt-3"
            >
              Improve your video content <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
  
          <div className="bg-white rounded-lg shadow-lg w-full p-5 m-20">
            <img
              src="/image2.jpg"
              alt="Screenshot of Event Management interface"
              className="w-full rounded-lg"
            />
            <h2 className="text-lg font-bold text-gray-800 mt-4">
              Standup Shows<sup>™</sup>
            </h2>
            <p className="text-gray-700 mt-2">
              Manage your event from start to finish in one place
            </p>
            <a
              href="#"
              className="text-blue-500 hover:underline flex items-center mt-3"
            >
              Manage it all in one place{" "}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg w-full p-5 m-20">
            <img
              src="/image3.jpg"
              alt="Screenshot of Event Management interface"
              className="w-full rounded-lg"
            />
            <h2 className="text-lg font-bold text-gray-800 mt-4">
              Event Management<sup>™</sup>
            </h2>
            <p className="text-gray-700 mt-2">
              Manage your event from start to finish in one place
            </p>
            <a
              href="#"
              className="text-blue-500 hover:underline flex items-center mt-3"
            >
              Manage it all in one place{" "}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg w-full p-5 m-20">
            <img
              src="/image4.jpg"
              alt="Screenshot of Event Management interface"
              className="w-full rounded-lg"
            />
            <h2 className="text-lg font-bold text-gray-800 mt-4">
              Event Management<sup>™</sup>
            </h2>
            <p className="text-gray-700 mt-2">
              Manage your event from start to finish in one place
            </p>
            <a
              href="#"
              className="text-blue-500 hover:underline flex items-center mt-3"
            >
              Manage it all in one place{" "}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg w-full p-5 m-20">
            <img
              src="/image5.jpg"
              alt="Screenshot of Event Management interface"
              className="w-full rounded-lg"
            />
            <h2 className="text-lg font-bold text-gray-800 mt-4">
              Event Management<sup>™</sup>
            </h2>
            <p className="text-gray-700 mt-2">
              Manage your event from start to finish in one place
            </p>
            <a
              href="#"
              className="text-blue-500 hover:underline flex items-center mt-3"
            >
              Manage it all in one place{" "}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg w-full p-5 m-20">
            <img
              src="/image6.jpg"
              alt="Screenshot of Event Management interface"
              className="w-full rounded-lg"
            />
            <h2 className="text-lg font-bold text-gray-800 mt-4">
              Event Management<sup>™</sup>
            </h2>
            <p className="text-gray-700 mt-2">
              Manage your event from start to finish in one place
            </p>
            <a
              href="#"
              className="text-blue-500 hover:underline flex items-center mt-3"
            >
              Manage it all in one place{" "}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>

          
       
        </div>
        <div className="mt-10">
          <a
            href="#"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Elevate your events
          </a>
        </div>
      </div>
    );
  };
  
  
  
  const services = [
    {
      image: "https://placehold.co/300x200",
      alt: "Screenshot of Cvent Attendee Hub interface",
      title: "Cvent Attendee Hub®",
      description: "Build engaging in-person, virtual, and hybrid events",
      linkText: "Build the perfect event",
    },
    {
      image: "https://placehold.co/300x200",
      alt: "Screenshot of Cvent Studio interface",
      title: "Cvent Studio™",
      description: "Easily produce webinars, virtual content, and more",
      linkText: "Improve your video content",
    },
    {
      image: "https://placehold.co/300x200",
      alt: "Screenshot of Event Management interface",
      title: "Event Management™",
      description: "Manage your event from start to finish in one place",
      linkText: "Manage it all in one place",
    },
    {
      image: "https://placehold.co/300x200",
      alt: "Screenshot of Registration and Ticketing interface",
      title: "Registration & Ticketing",
      description: "Simplify event registration and ticketing process",
      linkText: "Streamline your registrations",
    },
    {
      image: "https://placehold.co/300x200",
      alt: "Screenshot of Venue Sourcing interface",
      title: "Venue Sourcing",
      description: "Find and book the perfect venue for your event",
      linkText: "Discover top venues",
    },
    {
      image: "https://placehold.co/300x200",
      alt: "Screenshot of Event Marketing interface",
      title: "Event Marketing",
      description: "Increase attendance with powerful marketing tools",
      linkText: "Enhance your event marketing",
    }
  ];
  
  export default Services; ;