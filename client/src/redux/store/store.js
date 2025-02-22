
import { configureStore } from '@reduxjs/toolkit'
import adminSlice from '../adminReducer/adminReducer'
import userSlice from '../userReducer/userReducer'


const store = configureStore({
  reducer: {
    user: adminSlice,
    admin: userSlice
  }
})

export default store