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
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">

      {/* Left Sidebar */}
      <div className="bg-white w-64 p-5 shadow-lg h-screen sticky top-0">
        {/* Profile View */}
        <div className="flex items-center mb-5">
          <img
            className="rounded-full w-12 h-12 mr-3"
            src="https://placehold.co/50x50"
            alt="Profile"
          />
          <div className="flex-grow">
            <h3 className="text-sm font-semibold">{user?.userFirstName} {user?.userLastName}</h3>
            <p className="text-xs text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 h-1 rounded-full mb-5">
          <div className="bg-green-500 h-full" style={{ width: '67%' }}></div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center w-full py-2 text-sm text-gray-800 hover:bg-gray-100 rounded transition duration-300 ${activeTab === 'profile' ? 'bg-gray-100' : ''}`}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          Profile
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center w-full py-2 text-sm text-gray-800 hover:bg-gray-100 rounded transition duration-300 ${activeTab === 'applications' ? 'bg-gray-100' : ''}`}
        >
          <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
          Registrations/Applications
        </button>

        <button
          onClick={() => setActiveTab('referrals')}
          className={`flex items-center w-full py-2 text-sm text-gray-800 hover:bg-gray-100 rounded transition duration-300 ${activeTab === 'referrals' ? 'bg-gray-100' : ''}`}
        >
          <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
          Referrals
        </button>

        <button
          onClick={() => setActiveTab('watchlist')}
          className={`flex items-center w-full py-2 text-sm text-gray-800 hover:bg-gray-100 rounded transition duration-300 ${activeTab === 'watchlist' ? 'bg-gray-100' : ''}`}
        >
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Watchlist
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center w-full py-2 text-sm text-gray-800 hover:bg-gray-100 rounded transition duration-300 ${activeTab === 'settings' ? 'bg-gray-100' : ''}`}
        >
          <FontAwesomeIcon icon={faCog} className="mr-2" />
          Settings
        </button>

        {/* Logout Button */}
        <button
          onClick={() => setActiveTab('logout')}
          className="flex items-center justify-center w-full py-2 text-sm text-blue-600 border border-blue-600 rounded mt-5 hover:bg-blue-100 transition duration-300"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>

      {/* Dynamic Tab Content */}
      <div className="flex-grow p-5">
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'watchlist' && <Watchlist />}
        {activeTab === 'recentlyViewed' && <RecentlyViewed />}
      </div>
    </div>
  );
};

export default ProfilePage;