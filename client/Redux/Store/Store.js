

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "../UserReducer/UserReducer.js";
import adminReducer from "../AdminReducer/AdminReducer.js";

const reducer = combineReducers({
   UserReducer,
   adminReducer
})

const store = configureStore({
   reducer
});


export default store;