import React, { useState } from 'react';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // FAQ data
  const faqs = [
    {
      question: "Why can't I save my event?",
      answer: "Ensure all required fields (marked with *) are filled. Check your internet connection,&nbsp;and try again."
    },
    {
      question: "How do I add participants?",
      answer: "In the 'Invite Participants' section, manually enter email addresses,&nbsp;or upload a CSV file with participant details."
    },
    {
      question: "Can I edit an event after publishing?",
      answer: "Yes, go to 'My Events,' select the event,&nbsp;and click 'Edit' to update details. Save changes to update the live event."
    },
    {
      question: "What image sizes are recommended?",
      answer: "For banners, use 1200x400px. For logos, use 300x300px. Both should be under 5MB in JPEG&nbsp;or PNG format."
    },
  ];

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-900 text-center py-12 shadow-lg">
        <h1 className="text-4xl font-bold">Event Creation Documentation</h1>
        <p className="mt-2 text-gray-400">Everything you need to know about creating events.</p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search the docs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full w-1/2 max-w-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Creating Events Section */}
          <section className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <i className="fas fa-calendar-plus text-blue-500 text-2xl"></i>
              <h2 className="ml-4 text-xl font-bold">Creating Events</h2>
            </div>
            <p className="text-gray-400 mb-4">Step-by-step guide to creating events, customizing details,&nbsp;and inviting participants.</p>
            {searchTerm === "" || "creating events".includes(searchTerm.toLowerCase()) ? (
              <div className="space-y-4 text-gray-300">
                <h3 className="text-lg font-semibold">How to Create an Event</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    <span className="font-medium">Log In:</span> Access your account using your credentials on the login page.
                  </li>
                  <li>
                    <span className="font-medium">Navigate to Events:</span> From the dashboard, click on the "Create Event" button in the sidebar&nbsp;or top navigation.
                  </li>
                  <li>
                    <span className="font-medium">Fill Event Details:</span>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li><span className="font-medium">Event Name:</span> Enter a descriptive title (e.g., "Tech Conference 2025").</li>
                      <li><span className="font-medium">Date &amp; Time:</span> Select the event date&nbsp;and start time using the date picker.</li>
                      <li><span className="font-medium">Location:</span> Specify if it’s online (e.g., Zoom link)&nbsp;or offline (e.g., "123 Tech St, City").</li>
                      <li><span className="font-medium">Description:</span> Add details about the event using the rich text editor.</li>
                      <li><span className="font-medium">Banner &amp; Logo:</span> Upload an attractive banner&nbsp;and logo (JPEG/PNG, max 5MB each).</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium">Set Capacity:</span> Define the maximum number of participants (optional).
                  </li>
                  <li>
                    <span className="font-medium">Custom Registration Form:</span> Add fields like "Name," "Email,"&nbsp;or custom questions (e.g., "T-shirt size") using the form builder.
                  </li>
                  <li>
                    <span className="font-medium">Invite Participants:</span> Enter email addresses manually,&nbsp;or import a CSV list to send invites.
                  </li>
                  <li>
                    <span className="font-medium">Publish:</span> Review all details, then click "Submit" to make the event live. You’ll get a confirmation toast.
                  </li>
                </ol>
                <h3 className="text-lg font-semibold">Tips</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use clear, concise titles to attract attendees.</li>
                  <li>Add a compelling banner image (recommended: 1200x400px).</li>
                  <li>Test the registration form before publishing.</li>
                </ul>
                <h3 className="text-lg font-semibold">Troubleshooting</h3>
                <p className="text-gray-400">If the event doesn’t save, check required fields (marked with *),&nbsp;or network connectivity.</p>
              </div>
            ) : (
              <p className="text-gray-400">No matching content found for "{searchTerm}" in Creating Events.</p>
            )}
          </section>

          {/* FAQs Section */}
          <section className="mt-8 bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <i className="fas fa-question-circle text-blue-500 text-2xl"></i>
              <h2 className="ml-4 text-xl font-bold">FAQs</h2>
            </div>
            <p className="text-gray-400 mb-4">Common questions about creating events.</p>
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4 text-gray-300">
                {filteredFaqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No FAQs found matching "{searchTerm}".</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Documentation;