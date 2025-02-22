import { createSlice } from "@reduxjs/toolkit"


const initialState = {

   eventData: {
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      eventDescription: '',
      eventImage: '',
      eventPrice: '',
      eventCategory: '',
      eventStatus: '',
   }
}


const eventReducer = createSlice({
   name: 'event',
   initialState: initialState,

   reducers: {
      setEventData: (state, action) => {
         state.eventData = action.payload
      }
   }
})

