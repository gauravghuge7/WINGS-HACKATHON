import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-80">
        <img
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Contact Us"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">Contact Us</h1>
          <p className="text-lg animate-fadeIn delay-200">We’d love to hear from you!</p>
        </div>
      </div>

      {/* Content Section */}
      <main className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 backdrop-blur-lg bg-opacity-90 animate-slideInLeft">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Let's Start a Conversation</h2>
          <p className="text-gray-600">Ask how we can help you:</p>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-700">✔️ See our platform in action</li>
            <li className="text-gray-700">✔️ Request a personalized demo</li>
            <li className="text-gray-700">✔️ Join <a href="#" className="text-blue-500 hover:underline">TUNE Academy</a></li>
          </ul>
        </div>

        {/* Right Section (Form) */}
        <div className="bg-white shadow-lg rounded-lg p-6 backdrop-blur-lg bg-opacity-90 animate-slideInRight">
          <p className="mb-4 text-gray-600">Please note: all fields are required.</p>
          <form className="space-y-4">
            <input type="text" placeholder="First Name" required className="w-full p-3 border rounded shadow-md" />
            <input type="text" placeholder="Last Name" required className="w-full p-3 border rounded shadow-md" />
            <input type="email" placeholder="Email" required className="w-full p-3 border rounded shadow-md" />
            <textarea placeholder="Message" required rows="5" className="w-full p-3 border rounded shadow-md"></textarea>
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
              Submit
            </button>
          </form>
        </div>
      </main>

      {/* Map Section */}
      <div className="p-6 max-w-6xl mx-auto animate-fadeIn delay-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Find Us Here</h2>
        <div className="overflow-hidden rounded-lg shadow-lg border border-gray-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.341500545344!2d75.32132862522559!3d19.867796731506726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9861a6d01f43%3A0x3a1b932d329091e9!2sGovernment%20College%20Of%20Engineering%2C%20Aurangabad!5e0!3m2!1sen!2sin!4v1739524628832!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;