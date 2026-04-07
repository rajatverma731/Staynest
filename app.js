 const express = require("express"); // requiring express
const app = express(); // saving express in app variable
const mongoose = require("mongoose"); // requiring mongodb 
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override"); 
const ejsMate = require("ejs-mate");
app.set("layout", "layouts/boilerPlate");

const MONGO_URL = "mongodb://127.0.0.1:27017/staynest";

// establishiing connection
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));
 
app.get("/",(req,res)=>{
    res.send("Hi, i am root")
})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute Goa",
//         country: "India",
//     });

    // await sampleListing.save();
    // console.log("sample was saved");
    // res.send("Successful testing");


// INDEX ROUTE
app.get("/listings",async (req,res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
})

// New route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

// SHOW ROUTE
app.get("/listings/:id", async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

//CREATE ROUTE
app.post("/listings", async (req,res) =>{
    // let {title, description, image, price, country, location} = req.body;
    const newListing = new Listing(req.body.listing);
    // console.log(listing);
    await newListing.save(); 
    res.redirect("/listings");
})

//Edit Route
app.get("/listings/:id/edit" , async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

// UPDATE ROUTE
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
});

//DELETE ROUTES
app.delete("/listings/:id" ,async(req,res) =>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
})
app.listen(8080, ()=>{          
        console.log("Server is listening to port 8080");
})