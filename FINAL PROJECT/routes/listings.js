const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { listingschema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
//new route
router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    try {
      const alllistings = await Listing.findAll({});
      res.render("./listings/index.ejs", { alllistings });
    } catch (error) {
      // Pass the error to the error-handling middleware
      next(error);
    }
  })
);
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});
//show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByPk(id);
    res.render("listings/show.ejs", { listing });
  })
);
//create route
router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    console.log("Request body:", req.body); // Log the entire request body
    console.log("Listing data:", req.body.listing); // Log the listing data specifically
    // listingschema.validate(req.body); // You might not need this line here if you're just logging
    const newListing = new Listing(req.body.listing);
    console.log("New listing object:", newListing); // Log the new listing object before saving
    await newListing.save();
    console.log("New listing saved successfully!"); // Log a success message after saving
    res.redirect("/listings");
  })
);
//edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByPk(id);
    res.render("listings/edit.ejs", { listing });
  })
);
//update route
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "send valid data for listing");
    }
    let { id } = req.params;
    await Listing.update(req.body.listing, { where: { id } });
    res.redirect("/listings");
  })
);

//delete route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedListing = await Listing.destroy({ where: { id } });
      if (deletedListing === 1) {
        res.redirect("/listings");
      } else {
        res.status(404).send("Listing not found");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);
module.exports = router;
