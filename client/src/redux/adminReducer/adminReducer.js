
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
      adminData: {
         adminFirstName: '',
         adminLastName: '',
         adminEmail: '',
         adminPassword: '',
         adminGender: '',
         adminEvents: [],
         adminEnrolledEvents: [],
         adminEventCertificates: [],
      },
   
      events: [
         {
            _id: 1,  
            eventId: 1,
            eventName: 'Event 1',
            eventDate: '2022-01-01',
            eventTime: '12:00 PM',
            eventLocation: 'Online',
            eventDescription: 'This is a description of Event 1',
            eventImage: 'https://images.unsplash.com/photo-1609866975284-f5b6d6c3d2a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            eventBlocked: false,
            eventCertificates: [],
            eventEnrollments: [],
            eventAttendees: [],
            eventAdmins: [],
            isEventAdmin: false,
            isEventAttendee: false,
         }
      ]
      
}
   
const adminSlice = createSlice({
      name: 'admin',
      initialState,

      reducers: {
            setAdminData: (state, action) => {
                  state.adminData = action.payload
            },
      
            setEvents: (state, action) => {
                  state.events = action.payload
            }
      }

})    


export const { setAdminData, setEvents } = adminSlice.actions
export default adminSlice.reducer