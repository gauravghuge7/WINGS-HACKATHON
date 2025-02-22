import React from "react";  
const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
     
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

      <main className="p-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      
        <div className="bg-white shadow-lg rounded-lg p-6 backdrop-blur-lg bg-opacity-90 animate-slideInLeft">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Let&apos;s Start a Conversation</h2>
          <p className="text-gray-600">Ask how we can help you:</p>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-700">✔️ See our platform in action</li>
            <li className="text-gray-700">✔️ Request a personalized demo</li>
            <li className="text-gray-700">✔️ Join <a href="#" className="text-blue-500 hover:underline">Event Wallah</a></li>
          </ul>
        </div>

        
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

      
      
    </div>
  );
};

export default ContactUs;