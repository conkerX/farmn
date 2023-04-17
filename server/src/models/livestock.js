const mongoose = require("mongoose");

const LivestockSchema = new mongoose.Schema({
  breed: { type: String, required: true },
  type: { type: String, required: true },
  gender: { type: String, require: true },
  dateOfBirth: Date,
  weight: Number,
  status: String,
  earTag: { type: String, required: true },
  vaccinationHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vaccination",
    },
  ],
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livestock",
    },
  ],
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
  },
});

const Livestock = mongoose.model("Livestock", LivestockSchema);

module.exports = Livestock;
