import React, { useEffect, useState } from 'react';
import ProfileView from './ProfileView';
import Watchlist from './Watchlist';
import RecentlyViewed from './RecentlyViewed';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboardList, faUserFriends, faHeart, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({});
  const redux_user = useSelector(state => state?.UserReducer?.userData);

  useEffect(() => {
    setUser(redux_user);
  }, [redux_user]);

  return (
    <div className="flex flex-col lg:flex-row bg-black text-white min-h-screen">
      {/* Left Sidebar */}
      <div className="bg-gray-900 w-64 p-5 shadow-lg h-screen sticky top-0">
        {/* Profile View */}
        <div className="flex items-center mb-5">
          <img
            className="rounded-full w-12 h-12 mr-3"
            src="https://placehold.co/50x50"
            alt="Profile"
          />
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-white">{user?.userFirstName} {user?.userLastName}</h3>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-700 h-1 rounded-full mb-5">
          <div className="bg-green-500 h-full" style={{ width: '67%' }}></div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center w-full py-2 text-sm text-gray-200 hover:bg-gray-800 rounded transition duration-300 ${activeTab === 'profile' ? 'bg-gray-800' : ''}`}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
          Profile
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center w-full py-2 text-sm text-gray-200 hover:bg-gray-800 rounded transition duration-300 ${activeTab === 'applications' ? 'bg-gray-800' : ''}`}
        >
          <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-gray-400" />
          Registrations/Applications
        </button>

        <button
          onClick={() => setActiveTab('referrals')}
          className={`flex items-center w-full py-2 text-sm text-gray-200 hover:bg-gray-800 rounded transition duration-300 ${activeTab === 'referrals' ? 'bg-gray-800' : ''}`}
        >
          <FontAwesomeIcon icon={faUserFriends} className="mr-2 text-gray-400" />
          Referrals
        </button>

        <button
          onClick={() => setActiveTab('watchlist')}
          className={`flex items-center w-full py-2 text-sm text-gray-200 hover:bg-gray-800 rounded transition duration-300 ${activeTab === 'watchlist' ? 'bg-gray-800' : ''}`}
        >
          <FontAwesomeIcon icon={faHeart} className="mr-2 text-gray-400" />
          Watchlist
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center w-full py-2 text-sm text-gray-200 hover:bg-gray-800 rounded transition duration-300 ${activeTab === 'settings' ? 'bg-gray-800' : ''}`}
        >
          <FontAwesomeIcon icon={faCog} className="mr-2 text-gray-400" />
          Settings
        </button>

        {/* Logout Button */}
        <button
          onClick={() => setActiveTab('logout')}
          className="flex items-center justify-center w-full py-2 text-sm text-blue-400 border border-blue-400 rounded mt-5 hover:bg-blue-900 hover:text-white transition duration-300"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>

      {/* Dynamic Tab Content */}
      <div className="flex-grow p-5 bg-gray-800">
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'watchlist' && <Watchlist />}
        {activeTab === 'recentlyViewed' && <RecentlyViewed />}
      </div>
    </div>
  );
};

export default ProfilePage;