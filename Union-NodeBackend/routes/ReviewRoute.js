const express = require('express');
const session = require('express-session');
const router = express.Router();
const Review = require('../Services/ReviewService');

router.post('/AddReview/:reviewer/:reviewee', Review.AddReview);
router.get('/getReview/:reviewee', Review.getReview);
router.delete('/deleteReview/:reviewer/:reviewee/:reviewID', Review.RemoveReview);

module.exports = router