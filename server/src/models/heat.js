const mongoose = require("mongoose");

const HeatSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  notes: String,
  livestock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livestock",
    required: true,
  },
});

const Heat = mongoose.model("Heat", HeatSchema);

module.exports = Heat;
