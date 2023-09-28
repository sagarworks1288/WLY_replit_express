const mongoose = require("mongoose");
const collection = "states";
const scema = {
  name: String,
  countryId: { type: mongoose.Schema.ObjectId, default: null },
};
module.exports =
  mongoose.models[collection] || mongoose.model(collection, scema);
