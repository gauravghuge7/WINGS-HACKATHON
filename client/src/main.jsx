
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import store from './Redux/Store/Store.js'
import {Provider} from "react-redux"
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { io } from "socket.io-client";


axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;
axios.defaults.proxy = true;



const getUserId = () => {
  let userId = localStorage.getItem("uniqueUserId");
  if (!userId) {
      userId = crypto.randomUUID();  // Generate new ID only if not set
      localStorage.setItem("uniqueUserId", userId);
  }
  return userId;
};


const userId = getUserId();

export const socket = io(import.meta.env.VITE_SERVER_URL, {
  query: {
    userId: userId,
  },
});

console.log("userId => ", userId);

socket.on("connect", () => {
  console.log("Connected to server");
});


createRoot(document.getElementById('root')).render(


  <Auth0Provider
    domain="dev-rzrow7mfr07o2mr2.us.auth0.com"
    clientId="v5iHwgbIZwV1GdeZk8zu7c5dMAYuhHRB"
    authorizationParams={{
    redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>  

)
