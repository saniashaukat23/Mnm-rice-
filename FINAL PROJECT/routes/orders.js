const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { orderSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Order = require("../models/Order.js");

// Index route - Get all orders
router.get("/", async (req, res, next) => {
  try {
    const { OID } = req.params;
    const orders = await Order.findAll(OID);
    res.render("orders/show.ejs", { orders });
  } catch (error) {
    next(error);
  }
});

// Show route - Get a specific order by ID
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Create route - Create a new order
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Update route - Update an existing order
router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Delete route - Delete an existing order
router.delete("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.destroy();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
