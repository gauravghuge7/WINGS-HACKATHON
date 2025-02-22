import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { ToastContainer } from "react-toastify";

function AdminLogin() {
  // State hooks for email, password, and login error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  // Hook for navigation and sending form data
  const navigate = useNavigate();
  const { loading, sendFormData } = useSendFormData();

  /**
   * Handle form submission for admin login.
   * Prevents default form action, sends login data to the API,
   * handles errors, and navigates to the admin page on success.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await sendFormData("/api/v1/admin/login", {
      adminEmail: email,
      adminPassword: password,
    });

    console.log("data =>", data);

    if (error) {
      setLoginError(error);
      return;
    }

    if (data?.success) {
      localStorage.setItem("eventAdmin", true);
      navigate("/admin");
    }
  };

  /**
   * Handle click event to navigate to the registration page.
   */
  const handleClick = () => {
    localStorage.setItem("eventAdmin", true);
    navigate("/AdminSignup");
  };

  // Clear any stored admin state on component mount
  useEffect(() => {
    localStorage.removeItem("eventAdmin");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Admin Login</h2>

        {loginError && (
          <p className="text-center">
            <span className="text-red-500">{loginError}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <button onClick={handleClick} className="text-blue-400 hover:underline">
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
