import { Event } from '../../../models/eventModels/event.model.js';
import { Review } from '../../../models/reviewModels/review.model.js';
import { ApiError } from '../../../utils/ApiError.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';
import { asyncHandler } from '../../../utils/AsyncHandler.js';
import { emptyFieldValidator } from '../../../helper/userHelper/emptyFieldValidator.js';


// Add a review to an event
const addReview = asyncHandler(async (req, res, next) => {
    const { eventId, title, description, rating, userId } = req.body;

    // Validate required fields
    const missingFields = emptyFieldValidator({ eventId, title, description, rating, userId });
    if (missingFields.length > 0) {
        return next(new ApiError(400, `Missing fields: ${missingFields.join(', ')}`));
    }

    // Validate the rating
    if (rating < 1 || rating > 5) {
        return next(new ApiError(400, 'Rating must be between 1 and 5'));
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
        return next(new ApiError(404, 'Event not found'));
    }

    // Create the review
    const review = new Review({
        event: eventId,
        title,
        description,
        rating,
        user: userId
    });

    // Save the review
    await review.save();

    // Add the review to the event's reviews array
    event.eventReviews.push(review._id);
    await event.save();

    res.status(201).send(new ApiResponse(201, 'Review added successfully', review));
});

// Get all reviews for an event
const getReviewsForEvent = asyncHandler(async (req, res, next) => {
    const { eventId } = req.params;
    console.log("review Route ");
    // Find the event and populate reviews
    const event = await Event.findById(eventId).populate('reviews');
    if (!event) {
        return next(new ApiError(404, 'Event not found'));
    }

    res.status(200).send(new ApiResponse(200, 'Reviews fetched successfully', event.reviews));
});

// Update a review by ID
const updateReview = asyncHandler(async (req, res, next) => {
    const { reviewId } = req.params;
    const { title, description, rating } = req.body;

    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
        return next(new ApiError(404, 'Review not found'));
    }

    // Update review fields
    review.title = title || review.title;
    review.description = description || review.description;
    review.rating = rating || review.rating;

    // Validate rating
    if (review.rating < 1 || review.rating > 5) {
        return next(new ApiError(400, 'Rating must be between 1 and 5'));
    }

    // Save updated review
    await review.save();

    res.status(200).send(new ApiResponse(200, 'Review updated successfully', review));
});

// Delete a review by ID
const deleteReview = asyncHandler(async (req, res, next) => {
    const { reviewId } = req.params;

    // Find and delete the review
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
        return next(new ApiError(404, 'Review not found'));
    }

    // Find the associated event
    const event = await Event.findById(review.event);
    if (!event) {
        return next(new ApiError(404, 'Event associated with the review not found'));
    }

    // Remove the review from the event's reviews array
    event.reviews.pull(reviewId);
    await event.save();

    res.status(200).send(new ApiResponse(200, 'Review deleted successfully', review));
});


export { addReview, getReviewsForEvent, updateReview, deleteReview };
