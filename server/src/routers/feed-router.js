const express = require("express");
const feedRouter = new express.Router();
const Feed = require("../models/feed");
const { auth } = require("../middleware/auth");

// Add a new feed
feedRouter.post("/feed", auth, async (req, res) => {
  try {
    const feed = new Feed(req.body);
    await feed.save();
    res.status(201).json(feed);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing feed
feedRouter.patch("/feed/:id", auth, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);
    if (feed) {
      feed.name = req.body.name || feed.name;
      feed.type = req.body.type || feed.type;
      feed.quantity = req.body.quantity || feed.quantity;
      feed.price = req.body.price || feed.price;
      feed.supplier = req.body.supplier || feed.supplier;
      await feed.save();
      res.json(feed);
    } else {
      res.status(404).json({ message: "Feed not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a feed by ID
feedRouter.get("/feed/:id", auth, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);
    if (feed) {
      res.json(feed);
    } else {
      res.status(404).json({ message: "Feed not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a feed by ID
feedRouter.delete("/feed/:id", auth, async (req, res) => {
  try {
    const feed = await Feed.findByIdAndDelete(req.params.id);
    if (feed) {
      res.json({ message: "Feed deleted" });
    } else {
      res.status(404).json({ message: "Feed not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  feedRouter,
};
