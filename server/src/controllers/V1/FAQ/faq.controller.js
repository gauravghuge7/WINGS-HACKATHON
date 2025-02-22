import FAQ from '../../../models/faqModels/faqModels.js';
import { ApiError } from '../../../utils/ApiError.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';
import { asyncHandler } from '../../../utils/AsyncHandler.js';
import { emptyFieldValidator } from '../../../helper/userHelper/emptyFieldValidator.js';

// Create a new FAQ
export const createFAQ = asyncHandler(async (req, res, next) => {
    const { question, answer, adminId } = req.body;

    // Validate required fields
    const missingFields = emptyFieldValidator({ question, answer, adminId });
    if (missingFields.length > 0) {
        return next(new ApiError(400, `Missing fields: ${missingFields.join(', ')}`));
    }

    const faq = new FAQ({ question, answer, adminId });
    await faq.save();

    res.status(201).send(new ApiResponse(201, 'FAQ created successfully', faq));
});

// Get all FAQs
export const getFAQs = asyncHandler(async (req, res, next) => {
    const faqs = await FAQ.find();
    res.status(200).send(new ApiResponse(200, 'FAQs fetched successfully', faqs));
});

// Get a single FAQ by ID
export const getFAQById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const faq = await FAQ.findById(id);

    if (!faq) {
        return next(new ApiError(404, 'FAQ not found'));
    }

    res.status(200).send(new ApiResponse(200, 'FAQ fetched successfully', faq));
});

// Update an FAQ
export const updateFAQ = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    // Validate required fields
    const missingFields = emptyFieldValidator({ question, answer });
    if (missingFields.length > 0) {
        return next(new ApiError(400, `Missing fields: ${missingFields.join(', ')}`));
    }

    const faq = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true, runValidators: true });

    if (!faq) {
        return next(new ApiError(404, 'FAQ not found'));
    }

    res.status(200).send(new ApiResponse(200, 'FAQ updated successfully', faq));
});

// Delete an FAQ
export const deleteFAQ = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const faq = await FAQ.findByIdAndDelete(id);

    if (!faq) {
        return next(new ApiError(404, 'FAQ not found'));
    }

    res.status(200).send(new ApiResponse(200, 'FAQ deleted successfully'));
});
