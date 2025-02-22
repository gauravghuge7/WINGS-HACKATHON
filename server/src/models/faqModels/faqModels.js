import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: String,
        },
    ],
}, {
    timestamps: true,
});

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;