const mongoose = require("mongoose");
const collection = "favorite";
const scema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, default: null },
    favId: { type: mongoose.Schema.ObjectId, default: null },
    isLike: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports =
  mongoose.models[collection] || mongoose.model(collection, scema);
