
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import NotificationPrompt from "../../Router/UserRouter/HomeTemplate/HandleEnableNotification";

const ProfessionalHeader = React.memo( () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = useMemo(() => window.innerHeight * 0.2, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const redux_user = useSelector((state) => state?.UserReducer?.userData);

  const handleScroll = useCallback(() => {
    if (window.scrollY > scrollThreshold && window.scrollY > lastScrollY) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY, scrollThreshold]);

  useEffect(() => {
    if (localStorage.getItem("eventUser")) {
      setIsLoggedIn(true);
      setUser(redux_user);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, redux_user]);

  const toggleSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("eventUser");
    setIsLoggedIn(false);
    setUser(null);
    setShowSidebar(false);
    navigate("/");
  }, [navigate]);

  const navLinks = useMemo(
    () => [
      { name: "Home", to: "/" },
      { name: "Services", to: "/services" },
      { name: "Contact", to: "/contact" },
      { name: "Create Event", to: "/user/CreateEvent" },
      { name: "Latest Events", to: "/latestEvents" },

    ],
    []
  );

  const sidebarItems = useMemo(
    () => [
      { name: "Profile", to: "/user/userProfile" },
      { name: "My Events", to: "/user/myEvents" },
      { name: "Bookmarked Events", to: "/user/event/bookmarked" },
      { name: "Liked Events", to: "/user/event/liked" },
      { name: "Create A Event", to: "/user/createEvent" },
      { name: "User Dashboard", to: "/user/userDashboard" },
      { name: "My Events ", to: "/user/userEvent" },
      { name: "Log Out", to: "#", onClick: handleLogout },
    ],
    [handleLogout]
  );

  return (
    <>
      <header
        className={`transition-all duration-500 ease-in-out ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } fixed top-0 left-0 w-full flex items-center justify-between px-10 py-3 bg-white/30 backdrop-blur-lg shadow-md border-b border-white/20 z-50`}
        style={{ height: "56px" }}
      >
        <Link to="/" className="text-xl font-semibold text-gray-900 tracking-wide">
        Event Wallah ✨
        </Link>

        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="relative text-gray-900 text-lg font-medium transition-all duration-300 hover:text-blue-600 after:block after:h-[2px] after:w-full after:bg-blue-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* <section className="flex items-center justify-center">
          <NotificationPrompt />
        </section> */}

        {isLoggedIn && user?.userEmail ? (
          <button
            onClick={toggleSidebar}
            className="flex items-center p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition duration-300"
          >
            <span className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {user?.userFirstName?.charAt(0)}
            </span>
            <span className="ml-2 text-gray-800 text-sm font-medium">{user?.userFirstName}</span>
          </button>
        ) : (
          <Link
            to="/client/src/user/userLogin/UserLogin.jsx"
            className="flex items-center px-6 py-2 text-lg text-white font-medium rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-transform duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800 shadow-md"
          >
            Login
          </Link>
        )}
      </header>

      <div
  className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black text-white transform transition-transform duration-300 ease-in-out ${
    showSidebar ? "translate-x-0" : "translate-x-full"
  } z-50 overflow-y-auto shadow-2xl`}
>
  <div className="p-6">
    <button
      className="absolute top-0 right-0 p-2 mt-6 mr-6 hover:bg-gray-800 rounded-full transition duration-200"
      onClick={toggleSidebar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <h2 className="text-xl font-bold mt-1 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
      Profile
    </h2>

    <div className="flex items-center mb-5">
      <img
        className="rounded-full w-12 h-12 mr-3 border-2 border-blue-500"
        src={user?.userImage || "https://placehold.co/50x50"}
        alt="https://placehold.co/50x50"
        loading="lazy"
      />
      <div className="flex-grow">
        <h3 className="text-sm font-semibold">{user?.userFirstName} {user?.userLastName}</h3>
        <p className="text-xs text-gray-400">{user?.email}</p>
      </div>
    </div>

    <ul className="space-y-4">
      {sidebarItems.map((item, idx) => (
        <li key={idx} className="group">
          {item.to === "#" ? (
            <button
              onClick={item.onClick}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center"
            >
              <span className="flex-1">{item.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <Link
              to={item.to}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center"
            >
              <span className="flex-1">{item.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
</div>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );

});

ProfessionalHeader.displayName = 'ProfessionalHeader';

export default ProfessionalHeader;