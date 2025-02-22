/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/UserReducer/UserReducer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "./juho-luomala-K2AWz4lXrAM-unsplash.jpg";

gsap.registerPlugin(ScrollTrigger);

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const { loading, sendFormData } = useSendFormData();
  const { loginWithPopup, isAuthenticated, getIdTokenClaims, user } = useAuth0();

  // Reference for the glassmorphic card
  const cardRef = useRef(null);

  // GSAP Animation on mount for the card
  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  // Handle Google login
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithPopup({
        screen_hint: "signup",
        connection: "google-oauth2",
      });

      const response = await getIdTokenClaims();

      if (response && response.email) {
        const googleData = {
          email: response.email,
          email_verified: response.email_verified,
        };

        const { data, error } = await sendFormData("/api/v1/user/google-login", googleData);

        if (error) {
          setLoginError(error);
          toast.error(error);
          return;
        }

        dispatch(setUserData(data?.data?.user));

        dispatch(setUserData(data?.data?.user));
        console.log(data);


        toast.success(data?.message);
        localStorage.setItem("eventUser", true);
        localStorage.setItem("user", true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  // Handle form login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/v1/user/login";
      const formData = {
        userEmail: username,
        userPassword: password,
      };

      const { data, error, success } = await sendFormData(url, { userData: formData });
      if (error) {
        setLoginError(error);
        toast.error(error);
        return;
      }
      toast.success(success);
      localStorage.setItem("eventUser", true);
      localStorage.setItem("user", true);
      dispatch(setUserData(data?.data));
      navigate("/");
    } catch (error) {
      console.log("error => ", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{
        background: `url(${img1}) no-repeat center center/cover`,
      }}
    >
      {/* Dark overlay for improved readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <ToastContainer />
      <div
        ref={cardRef}
        className="relative bg-white bg-opacity-40 backdrop-filter backdrop-blur-xl rounded-xl shadow-xl p-8 max-w-md w-full"
      >
        {/* Header / Branding */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Event Layer</h1>
          <p className="mt-2 text-gray-600">Connect & Grow through Events</p>
        </div>

        {/* Error Message */}
        {loginError && (
          <p className="text-center text-red-500 mb-4">{loginError}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-gray-700">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login & Register */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition duration-300"
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button>
          <p className="text-center text-gray-600">
            Did not have an account?{" "}
            <Link to="/UserSignup" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
