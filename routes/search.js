const express = require("express");
const router = express.Router({mergeParams: true});

const Listing = require("../models/listing");
const searchController = require("../controllers/search.js");

const wrapAsync = require("../utils/wrapAsync.js");
const flash = require("connect-flash");

router.get("/", wrapAsync(searchController.search));

router.get("/categories", searchController.searchCategories);

module.exports = router;