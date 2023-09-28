const mongoose = require("mongoose");
const collection = "user_images";
const scema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, default: null },
    assetId: { type: mongoose.Schema.ObjectId, default: null },
    isPrimary: { type: Boolean, default: false },
  }
);
module.exports =
  mongoose.models[collection] || mongoose.model(collection, scema);
