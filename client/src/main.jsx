
import { StrictMode } from 'react'


import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'




//     here is the axios configuration 

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;
axios.defaults.proxy = true;

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
)
