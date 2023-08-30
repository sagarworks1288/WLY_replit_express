const mongoose = require("mongoose");
const collection = "users";
const scema = { name: String,email: String };
module.exports = mongoose.models[collection] || mongoose.model(collection, scema);