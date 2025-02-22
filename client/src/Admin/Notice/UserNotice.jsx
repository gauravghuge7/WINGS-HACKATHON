import React, { useState } from "react";
import { motion } from "framer-motion";

const UserNotice = () => {
  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([]);

  const handleSendNotice = () => {
    if (notice.trim() === "") return;
    setNotices([{ message: notice, date: new Date().toLocaleString() }, ...notices]);
    setNotice("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Send Notice</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your notice..."
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          className="border p-3 rounded w-full shadow-md"
        />
        <button
          onClick={handleSendNotice}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Notices</h2>
        {notices.length > 0 ? (
          <div className="space-y-4">
            {notices.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white shadow-md rounded-lg border-l-4 border-blue-500"
              >
                <p className="text-lg">{item.message}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notices sent yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserNotice;