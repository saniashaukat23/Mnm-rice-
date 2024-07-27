const express = require("express");
const router2 = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const customerSchema = require("../schema.js");
const Joi = require("joi"); // Import Joi module

const ExpressError = require("../utils/ExpressError.js");
const Customer = require("../models/customers.js");

// New route - show form to create a new customer (if needed)
router2.get("/new", async (req, res) => {
  const { CID } = req.params;
  const customer = await Customer.findByPk(CID);
  res.render("./customers/new.ejs", { customer });
});

// Index route - list all customers
router2.get(
  "/",
  wrapAsync(async (req, res, next) => {
    try {
      const allCustomers = await Customer.findAll({});
      res.render("./customers/index.ejs", { allCustomers });
    } catch (error) {
      // Pass the error to the error-handling middleware
      next(error);
    }
  })
);

// Create route - create a new customer
router2.post(
  "/",
  wrapAsync(async (req, res, next) => {
    console.log("Request body:", req.body); // Log the entire request body
    console.log("Customer data:", req.body.customer); // Log the Customer data specifically
    // Customerschema.validate(req.body); // You might not need this line here if you're just logging
    const newCustomer = new Customer(req.body.customer);
    console.log("New Customer object:", newCustomer); // Log the new listing object before saving
    await newCustomer.save();
    console.log("New customer saved successfully!"); // Log a success message after saving
    res.redirect("/customers");
  })
);

// Edit route - show form to edit a specific customer
router2.get(
  "/:CID/edit",
  wrapAsync(async (req, res) => {
    const { CID } = req.params;
    const customer = await Customer.findByPk(CID);
    res.render("./customers/edit.ejs", { customer });
  })
);

// Update route - update details of a specific customer
router2.put(
  "/:CID",
  wrapAsync(async (req, res) => {
    const { CID } = req.params;
    const updatedCustomer = req.body.customer;
    await Customer.update(updatedCustomer, { where: { CID } });
    res.redirect("/customers");
  })
);

// Delete route - delete a specific customer
router2.delete(
  "/:CID",
  wrapAsync(async (req, res) => {
    const { CID } = req.params;
    await Customer.destroy({ where: { CID } });
    res.redirect("/customers");
  })
);

module.exports = router2;
