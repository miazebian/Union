const mongoose = require('mongoose');
const joi = require('joi');
const ReviewInfoSchema = new mongoose.Schema({
    ReviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'memberinfo'
    },
    RevieweeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'judgeinfo'
    },
    ReviewDate: {
        type: Date,
        required: true
    },
    Review: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    }
}, 
{
    timestamps: true
}, 
{
    collection: 'ReviewInfo'
});

module.exports.ReviewInfo = mongoose.model('ReviewInfo', ReviewInfoSchema);