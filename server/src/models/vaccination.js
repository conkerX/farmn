const mongoose = require("mongoose");

const VaccinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: String,
  // livestock: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Livestock",
  //   required: true,
  // },
});

const Vaccination = mongoose.model("Vaccination", VaccinationSchema);

module.exports = Vaccination;
