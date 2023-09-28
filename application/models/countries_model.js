const mongoose = require("mongoose");
const collection = "countries";
const scema = {
  name: String,
  defaultStateId: {
    type: mongoose.Schema.ObjectId,
    ref: "states",
    default: null,
  },
};
module.exports =
  mongoose.models[collection] || mongoose.model(collection, scema);
