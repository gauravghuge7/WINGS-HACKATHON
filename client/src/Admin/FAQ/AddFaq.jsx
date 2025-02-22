import React, { useState, useEffect } from "react";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";

const AddFaq = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);

  const { data, error, loading, fetchData, sendFormData } = useSendFormData();


  const fetchFaqs = async () => {
    try {
      const response = await fetchData("/api/admin/faqs");
     
    } 
    catch (error) {
      setError(error.message);
    }
  };



  useEffect(() => {
    fetchFaqs();
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!question.trim() || !answer.trim()) {
      setError("Both question and answer are required.");
      return;
    }

    const faqData = { question, answer };

    try {
      
      const response = await sendFormData("/api/admin/add-faq", faqData);

      

      setSuccess("FAQ added successfully!");
      setQuestion("");
      setAnswer("");
      fetchFaqs();
    } 
    catch (error) {
      setError(error.message);
    }
  };



  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">

      <h2 className="text-xl font-bold mb-4">Add FAQ</h2>
      
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Answer:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add FAQ
        </button>
      </form>
      
      <h2 className="text-xl font-bold mt-6 mb-4">All FAQs</h2>
      <ul className="list-disc pl-5">
        {faqs.map((faq, index) => (
          <li key={index} className="mb-2">
            <strong>{faq.question}</strong>: {faq.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddFaq;
