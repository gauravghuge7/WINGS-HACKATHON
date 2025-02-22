import { Router } from 'express';
import { createFAQ, getFAQs, getFAQById, updateFAQ, deleteFAQ } from '../../controllers/V1/FAQ/faq.controller.js';
import { upload } from '../../middlewares/multerMiddlerware/multer.middleware.js';

const faqRouter = Router();

// Create a new FAQ
faqRouter.route('/add').post( upload.none(), createFAQ);

// Get all FAQs
faqRouter.route('/fetch').get(getFAQs);

// Get a single FAQ by ID
faqRouter.route('/:id').get(getFAQById);

// Update an FAQ by ID
faqRouter.route('/update/:id').put(updateFAQ);

// Delete an FAQ by ID
faqRouter.route('/delete/:id').delete(deleteFAQ);

export default faqRouter;