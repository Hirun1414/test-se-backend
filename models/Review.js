const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: [true, 'Please add a score between 0 and 5'],
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
        trim: true,
        maxLength: [500, 'Comment can not be more than 500 characters']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// A user can only review a specific hotel once
ReviewSchema.index({ hotel: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
