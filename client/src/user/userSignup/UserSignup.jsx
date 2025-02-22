/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import useReactApi from "../../hooks/useReactApi/useReactApi";

const UserSignup = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { loginWithPopup, isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const {  loading, sendFormData } = useReactApi();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formSendData = {
      userEmail: formData.email,
      userPassword: formData.password,
      userFirstName: formData.firstName,
      userLastName: formData.lastName,
    };

    try {

      console.log("formSendData => ", formSendData);

      const {data, error, success} = await sendFormData("/api/v1/user/register", { userData: formSendData });
   
      if (error) {
        toast.error(error);
        return;
      }
      
      toast.success(success);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/user/login");  
 
    } 
    catch (error) {
      console.log("error => ", error);
    }
  };

  // Handle Google signup
  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      await loginWithPopup({
        screen_hint: "signup",
        connection: "google-oauth2",
      });

      const response = await getIdTokenClaims();
      console.log("response => ", response);

      if (response && response.email) {
        const googleData = {
          email: response.email,
          name: response.name,
          given_name: response.given_name,
          family_name: response.family_name,
          email_verified: response.email_verified,
          picture: response.picture,
          token: response.token,
        };

        const {data, error, success} = await sendFormData("/api/v1/user/signupUsingGoogle", googleData);
       
        if (error) {
          toast.error(error);
          return;
        }

        toast.success(success);
        navigate("/user/login");

      }
    } catch (error) {
      console.error("Error during Google signup:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section: Signup Form */}
        <div className="w-full lg:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create an Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6">
            {!isAuthenticated ? (
              <button
                className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300"
                onClick={handleGoogleSignup}
              >
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google logo"
                  className="w-5 h-5 mr-2"
                />
                Sign Up with Google
              </button>
            ) : (
              <button
                className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300"
                onClick={handleGoogleSignup}
              >
                <img
                  src={user.picture}
                  alt="Google logo"
                  className="w-5 h-5 mr-2 rounded-full"
                />
                Signed in as {user?.email}
              </button>
            )}
          </div>
        </div>

        {/* Right Section: Illustration and Welcome Message */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 flex-col justify-center items-center text-white p-10">
          <img
            src="https://via.placeholder.com/300"
            alt="Illustration"
            className="w-64 h-64 mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
          <p className="text-center text-lg">
            Join us to unlock exclusive features and manage your account seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;