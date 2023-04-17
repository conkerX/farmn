const express = require("express");
const vaccinationRouter = new express.Router();
const Vaccination = require("../models/vaccination");
const { auth } = require("../middleware/auth");

router.get("/livestock/:id/vaccination-records", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const vaccinationRecords = await Vaccination.find({ livestock: id });
    res.json(vaccinationRecords);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = {
  vaccinationRouter,
};
