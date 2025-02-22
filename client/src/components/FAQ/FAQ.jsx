import React, { useState } from 'react';

const FAQPage = () => {


    // Array of FAQ questions and answers
    const faqs = [
        {
            question: "What is the Event Management System Portal?",
            answer: "The Event Management System Portal is a platform designed to simplify event planning, ticket sales, attendee management, and event analytics for organizers and attendees.",
        },
        {
            question: "How do I create an event using the portal?",
            answer: "To create an event, navigate to the 'Create Event' section, fill in your event details, set the date, time, and location, and publish it. You can also customize ticketing and registration settings.",
        },
        {
            question: "Can I manage ticket sales through the system?",
            answer: "Yes, the system allows you to manage ticket sales easily. Set ticket prices, offer discounts, and track sales analytics in real time from your dashboard.",
        },
        {
            question: "How do I track event registrations?",
            answer: "You can view all event registrations under the 'Registrations' tab in your dashboard. Filter by attendee type, date, or ticket category for detailed insights.",
        },
        {
            question: "Does the portal integrate with other tools?",
            answer: "Yes, our portal integrates seamlessly with popular tools like payment gateways, email marketing platforms, and analytics tools. Check our integrations page for a complete list.",
        },
        {
            question: "What support options are available?",
            answer: "We offer 24/7 customer support through live chat, email, and phone. Additionally, our help center provides guides and tutorials to assist you in using the portal efficiently.",
        },
        {
            question: "How do I get started?",
            answer: "Getting started is easy! Sign up for a free account, explore the dashboard, and start creating your first event. Our onboarding guide will walk you through every step.",
        },
    ];

    // State to track the open/close status of each FAQ
    const [openIndex, setOpenIndex] = useState(null);

    // Toggle the clicked FAQ
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="p-6 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <div className="space-y-4">
                {
                faqs.map((faq, index) => (

                    <div
                        key={index}
                        className="border-b border-gray-300 pb-2"
                    >
                        <div
                            onClick={() => toggleFAQ(index)}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <span className="text-lg font-semibold">{faq.question}</span>
                            <i
                                className={`fas ${
                                    openIndex === index ? "fa-chevron-up" : "fa-chevron-down"
                                }`}
                            ></i>
                        </div>
                        {openIndex === index && (
                            <div className="mt-2 text-gray-700">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default FAQPage;
