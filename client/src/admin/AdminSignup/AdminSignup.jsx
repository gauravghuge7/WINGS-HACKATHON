import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { Link,  useNavigate } from "react-router-dom";
import useReactApi from "../../hooks/useReactApi/useReactApi";

const AdminSignup = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { isLoading, sendFormData } = useReactApi();
  const [signupError, setSignupError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const {data, error, success } = await sendFormData("/api/v1/admin/register", formData);

      if(error) {
        setSignupError(error)
        return;
      }
  
      if(data?.success) {
        toast.success(success)

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: ""
        })

        /*** Redirect to login page after 3 seconds ***/
        setTimeout(() => {
          localStorage.setItem("eventAdmin", true);
          navigate("/adminLogin")
        }, 1000);
        
      }
    } 
    catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <ToastContainer />

      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold">Admin Signup</h1>
        </div>

        <p> {signupError &&  <span className="text-red-500">{signupError} </span> }</p>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="First name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         
         
          <div>
            <label className="block text-gray-400 text-sm mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600 transition duration-300"
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <Link 
            to="/adminLogin"
            className="text-blue-600 hover:underline"
          >
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminSignup;
