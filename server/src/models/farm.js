const mongoose = require("mongoose");

const FarmSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  farmers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  livestock: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livestock",
    },
  ],
});

const Farm = mongoose.model("Farm", FarmSchema);

module.exports = Farm;
