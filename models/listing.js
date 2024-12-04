const mongoose = require("mongoose");
const { Review } = require("./review");
const { required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename: String,
    },

    price: {
        type: Number,
        // set: (v) => v === ""? 0 : v
    },
    location: String,
    country: String,
    reviews: [ 
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    categories: [
        {
            type: String,
            enum: ["Rooms", "Trending", "Iconic Cities", "Mountains", "Amazing Pools", "Camping", "Farms", "Arctic", "Castles"],
            required: true
        }
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = new mongoose.model("listing", listingSchema);
module.exports = Listing;