import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useSendFormData from "./../../Hooks/useSendFormData/useSendFormData";
// import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
// import { setUserData } from "../../Redux/UserReducer/UserReducer";

const UserLogin = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { loading, sendFormData } = useSendFormData();
  // const { loginWithPopup, isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Handle Google login
  // const handleGoogleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await loginWithPopup({
  //       screen_hint: "signup",
  //       connection: "google-oauth2",
  //     });

  //     const response = await getIdTokenClaims();

  //     if (response && response.email) {
  //       const googleData = {
  //         email: response.email,
  //         email_verified: response.email_verified,
  //       };
  //       const { data, error } = await sendFormData("/api/v1/user/google-login", googleData);
  //       dispatch(setUserData(data?.data?.user));

  //       if (error) {
  //         setLoginError(error);
  //         toast.error(error);
  //         return;
  //       }
  //       console.log(data);
  //       toast.success(data?.message);
  //       localStorage.setItem("eventUser", true);
  //       localStorage.setItem("user", true);
  //       dispatch(setUserData(data?.data?.user));
  //       navigate("/");
  //     }
  //   } 
  //   catch (error) {
  //     console.error("Error during Google login:", error);
  //   }
  // };
  // // Handle form login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/v1/user/login";
      const formData = {
        userEmail: username,
        userPassword: password,
      };
      const { data, error, success  } = await sendFormData(url, { userData: formData });
      if (error) {
        setLoginError(error);
        toast.error(error); 
        return;
      }
      toast.success(success);
      localStorage.setItem("eventUser", true);
      localStorage.setItem("user", true);
      //dispatch(setUserData(data?.data));
      navigate("/");
    } 
    catch (error) {
      console.log("error => ", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen flex items-center justify-center m-20">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="bg-gradient-to-br from-pink-600 to-indigo-700 flex flex-col items-center justify-center p-10 md:w-1/2 text-white">
            
            <h1 className="text-3xl font-bold mb-2">EVENT LAYER </h1>
            <p className="text-center text-lg">
              connecting to networking using the events 
            </p>
          </div>

          {/* Right Section */}
          <div className="p-10 md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Members Log In</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {loginError && <p className="text-red-500 text-center">{loginError}</p>}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-gray-700">
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300"
              >
                {loading ? "logging in..." : "Log In"}
              </button>

              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link to="/UserSignup" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </p>
            </form>

            {/* Google Login Button */}
            <div className="mt-6">
              {!isAuthenticated ? (
                <button
                  className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                    alt="Google logo"
                    className="w-5 h-5 mr-2"
                  />
                  Sign In with Google
                </button>
              ) : (
                <button
                  className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 rounded-lg font-medium flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition duration-300"
                  onClick={handleGoogleLogin}
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
    </div>
  );
};

export default UserLogin;