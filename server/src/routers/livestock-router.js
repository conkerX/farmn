const express = require("express");
const livestockRouter = new express.Router();
const Livestock = require("../models/livestock");
const { auth } = require("../middleware/auth");

// Update an existing livestock
livestockRouter.patch("/livestock/:id", auth, async (req, res) => {
  try {
    const livestock = await Livestock.findById(req.params.id);

    if (livestock) {
      livestock.type = req.body.type || livestock.type;
      livestock.breed = req.body.breed || livestock.breed;
      livestock.dateOfBirth = req.body.dateOfBirth || livestock.dateOfBirth;
      livestock.weight = req.body.weight || livestock.weight;
      livestock.gender = req.body.gender || livestock.gender;
      livestock.status = req.body.status || livestock.status;
      livestock.earTag = req.body.earTag || livestock.earTag;
      livestock.vaccinationHistory =
        req.body.vaccinationHistory || livestock.vaccinationHistory;
      livestock.children = req.body.children || livestock.children;
      livestock.farmId = req.body.farmId || livestock.farmId;

      await livestock.save();

      res.json(livestock);
    } else {
      res.status(404).json({ message: "Livestock not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a livestock by ID
livestockRouter.get("/livestock/:id", auth, async (req, res) => {
  try {
    const livestock = await Livestock.findById(req.params.id);

    if (livestock) {
      res.json(livestock);
    } else {
      res.status(404).json({ message: "Livestock not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a livestock by ID
livestockRouter.delete("/livestock/:id", auth, async (req, res) => {
  try {
    const livestock = await Livestock.findByIdAndDelete(req.params.id);
    if (livestock) {
      res.json({ message: "Livestock deleted" });
    } else {
      res.status(404).json({ message: "Livestock not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  livestockRouter,
};
