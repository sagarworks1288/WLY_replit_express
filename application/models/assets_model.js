const mongoose = require("mongoose");
const collection = "assets";
const scema = {
  userId: { type: mongoose.Schema.ObjectId, default: null },
  url: { type: String, default: null }
};
module.exports =
  mongoose.models[collection] || mongoose.model(collection, scema);
