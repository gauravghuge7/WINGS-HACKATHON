/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { ToastContainer, toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import img1 from "./pexels-pixabay-268533.jpg";

const UserSignup = () => {
  // Form state management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { loginWithPopup, isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const { loading, sendFormData } = useSendFormData();

  // Ref for the signup card for GSAP animations
  const formRef = useRef(null);

  // Entrance animation for the signup card
  useEffect(() => {
    gsap.from(formRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  // Update form state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for signup
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
      const { data, error, success } = await sendFormData(
        "/api/v1/user/signup",
        { userData: formSendData }
      );

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
      navigate("/userLogin");
    } catch (error) {
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

        const { data, error, success } = await sendFormData(
          "/api/v1/user/google-signup",
          googleData
        );

        if (error) {
          toast.error(error);
          return;
        }

        toast.success(success);
        navigate("/userLogin");
      }
    } catch (error) {
      console.error("Error during Google signup:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{
        background: `url(${img1}) no-repeat center center/cover`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <ToastContainer />
      <div
        ref={formRef}
        className="relative max-w-md w-full bg-white bg-opacity-40 backdrop-filter backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden flex flex-col mx-auto z-10"
      >
        {/* Signup Form Section */}
        <div className="w-full p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Create an Account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
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
      </div>
    </div>
  );
};

export default UserSignup;
