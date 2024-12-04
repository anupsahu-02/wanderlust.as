const express = require("express");
const router = express.Router({mergeParams: true});

const Listing = require("../models/listing");
const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync.js");
const flash = require("connect-flash");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer( { storage } );

router.route("/")
.get(wrapAsync(listingController.index))
.post( isLoggedIn, upload.single("listing[image]"), wrapAsync(listingController.createListing));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;