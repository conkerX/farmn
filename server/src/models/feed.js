const mongoose = require("mongoose");

const FeedSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  date: Date,
  livestock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Livestock",
  },
});

const Feed = mongoose.model("Feed", FeedSchema);

module.exports = Feed;
