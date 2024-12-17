const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) => {
    // console.log(req.user); // in this our user (liggedIn) information saved! 
    res.render("listings/new.ejs"); 
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    if (id.length > 24 || id.length < 24) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    } else {
        const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
        if (!listing) {
            req.flash("error", "Listing you requested for does not exist!");
            res.redirect("/listings");
        } else {
            res.render("listings/show.ejs", {listing});
        }
    }
};

module.exports.createListing = async (req, res) => {
    let newListing = await new Listing(req.body.listing); // (Insert One method)
    newListing.owner = req.user._id;

    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = {url, filename};
    let bydeFaultValue = "Trending";
    newListing.categories.push(bydeFaultValue);
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("success", "Listing you requested for does not exist!");
        res.redirect("/listings");
    } else {
        let originalImageUrl = listing.image.url;
        let newImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_300,e_blur:200");
        res.render("listings/edit.ejs", {listing , originalImageUrl: newImageUrl});
    }
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate((id), {...req.body.listing}, {runValidators: true}); // (Extret krne ka method jisse yah ak variable jaisa hoga);
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }
    await listing.save();
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("error", "Listing Deleted!");
    res.redirect("/listings");
};