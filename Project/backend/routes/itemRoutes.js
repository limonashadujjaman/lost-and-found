const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// GET all lost/found items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to get items" });
  }
});

// POST create a new lost/found item
router.post("/", async (req, res) => {
  try {
    const { title, description, type, location, contact, date, status } = req.body;

    const newItem = new Item({
      title,
      description,
      type,
      location,
      contact,
      date,
      status,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to create item" });
  }
});

// PUT update an item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to update item" });
  }
});

// DELETE an item
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete item" });
  }
});

module.exports = router;