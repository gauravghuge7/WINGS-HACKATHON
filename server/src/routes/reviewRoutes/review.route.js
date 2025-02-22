import { Router } from 'express';
import {
    addReview,
    getReviewsForEvent,
    updateReview,
    deleteReview,
} from '../../controllers/V1/Event/reviewEvent.controller.js';

const reviewRouter = Router();

// Create a new review for an event
reviewRouter.route('/add').post(addReview);

// Get all reviews for a specific event
reviewRouter.route('/review/:eventId').get(getReviewsForEvent);

// Update a review by review ID
reviewRouter.route('/update/:reviewId').put(updateReview);

// Delete a review by review ID
reviewRouter.route('/delete/:reviewId').delete(deleteReview);

export default reviewRouter;