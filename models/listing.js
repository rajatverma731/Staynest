const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    image:{
        filename:{
            type:String,
            default:"listingimage"
        },
        url:{
            type:String,
            default:"https://unsplash.com/photos/seashore-during-golden-hour-KMn4VEeEPR8"
        }
    },

    price:Number,

    location:String,

    country:String,

});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
