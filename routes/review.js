const express = require("express");
const router = express.Router({mergeParams: true});

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const {Review} = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

// Reviews
// Post Review Route
router.post("/reviews", isLoggedIn, validateReview, wrapAsync( reviewController.createReview));

// Delete Review Route
router.delete("/reviews/:reviewid", isLoggedIn, isReviewAuthor, wrapAsync( reviewController.destroyReview));

module.exports = router;