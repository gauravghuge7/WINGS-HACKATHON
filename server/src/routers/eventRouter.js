import express from 'express';
const eventRouter = express.Router();    
import  { createEvent,
        getAllEvents,
        getEventById,
        updateEvent,
        deleteEvent,
        registerForEvent }
from '../controllers/v1/eventController.js';  

eventRouter.route('/create')
            .post(createEvent);

eventRouter.route('/all')
            .get(getAllEvents);

eventRouter.route('/:id')
            .get(getEventById)
            .put(updateEvent)
            .delete(deleteEvent);

export default eventRouter;