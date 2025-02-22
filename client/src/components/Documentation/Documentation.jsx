import React from 'react';
import { Link } from 'react-router-dom';

const Documentation = () => {
    return (
        <div>
            {/* Header Section */}
            <header className="bg-indigo-500 text-white text-center py-12">
                <h1 className="text-4xl font-bold">Event Management Documentation</h1>
                <p className="mt-2">Learn how to create, manage, and enroll in events effortlessly.</p>
                <div className="mt-6">
                    <input 
                        type="text" 
                        placeholder="Search the docs..." 
                        className="px-4 py-2 rounded-full w-1/2 max-w-md"
                    />
                </div>
            </header>

            {/* Main Content Section */}
            <main className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Getting Started */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-play-circle text-indigo-500 text-2xl"></i>
                                <h2 className="ml-4 text-xl font-bold">Getting Started</h2>
                            </div>
                            <p>Learn the basics of our event management system and set up your account to begin organizing events.</p>
                            <Link to="/docs/getting-started" className="text-indigo-500 font-semibold hover:underline">Read More</Link>
                        </div>

                        {/* Creating Events */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-calendar-plus text-indigo-500 text-2xl"></i>
                                <h2 className="ml-4 text-xl font-bold">Creating Events</h2>
                            </div>
                            <p>Step-by-step guide to creating events, customizing details, and inviting participants.</p>
                            <Link to="/docs/creating-events" className="text-indigo-500 font-semibold hover:underline">Read More</Link>
                        </div>

                        {/* Enrolling in Events */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-user-check text-indigo-500 text-2xl"></i>
                                <h2 className="ml-4 text-xl font-bold">Enrolling in Events</h2>
                            </div>
                            <p>Learn how to browse available events and enroll as a participant in just a few clicks.</p>
                            <Link to="/docs/enrolling-events" className="text-indigo-500 font-semibold hover:underline">Read More</Link>
                        </div>

                        {/* Managing Your Events */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-tasks text-indigo-500 text-2xl"></i>
                                <h2 className="ml-4 text-xl font-bold">Managing Your Events</h2>
                            </div>
                            <p>Update event details, track registrations, and handle logistics with ease.</p>
                            <Link to="/docs/managing-events" className="text-indigo-500 font-semibold hover:underline">Read More</Link>
                        </div>

                        {/* Integrating with Tools */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-plug text-indigo-500 text-2xl"></i>
                                <h2 className="ml-4 text-xl font-bold">Integrating with Tools</h2>
                            </div>
                            <p>Discover how to integrate the platform with popular tools like Google Calendar and Zapier.</p>
                            <Link to="/docs/integrations" className="text-indigo-500 font-semibold hover:underline">Read More</Link>
                        </div>

                        {/* FAQs */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-question-circle text-indigo-500 text-2xl"></i>
                                <h2 className="ml-4 text-xl font-bold">FAQs</h2>
                            </div>
                            <p>Have questions? Check out our frequently asked questions for quick solutions.</p>
                            <Link to="/docs/faqs" className="text-indigo-500 font-semibold hover:underline">Read More</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Documentation;