const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  date: Date,
  quantity: Number,
  price: Number,
  livestock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livestock",
  },
});

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;
