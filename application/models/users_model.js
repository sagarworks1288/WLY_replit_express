const mongoose = require("mongoose");
const collection = "users";
const scema = {
  name: String,
  email: String,
  locationId: { type: mongoose.Schema.ObjectId, default: null },
};
module.exports =
  mongoose.models[collection] || mongoose.model(collection, scema);
