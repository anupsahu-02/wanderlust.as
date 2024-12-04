const Listing = require("../models/listing");

module.exports.search = async(req, res) => {
    let {q} = req.query;
    
    let someFilter = [];
    let newSearch = [];
    
    for(let i=0; i<q.length; i++) {
        let j = i+3;
        someFilter.push(q.slice(i, j));
    }
    for (let i=0; i<someFilter.length; i++) {
        if(someFilter[i].length >= 3) {
            newSearch.push(someFilter[i]);
        }
    }
    let allListings = [];
    let listings = await Listing.find({});
    for(listing of listings) {
        for(let i=0; i<newSearch.length; i++) {
            if(listing.location.includes(newSearch[i]) === true) {
                if(allListings.indexOf(listing) == -1) {
                    allListings.push(listing);
                }
            }
        }
    }
    console.log(allListings)
    res.render("listings/search.ejs", {allListings});
};

module.exports.searchCategories = async (req, res) => {
    let q = [];
    q.push(req.query.q);
    console.log(q)
    let allListings = await Listing.find({categories: {$in: q}});
    console.log(allListings);
    res.render("listings/categ.ejs", {allListings});
}