const mongoose = require("mongoose");
const Config = require("./config");

let cachedConnection = null;
let cachedRandom = null;

async function connectToDatabase(uri) {
  if (cachedConnection) {
    console.log("@@@@@@@@@@@",'i used cache')
    return cachedConnection;
  }

  const connection = await mongoose.connect(Config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("@@@@@@@@@@@",'new connection used')
  cachedConnection = connection;
  return connection;
}

function random() {
  if (cachedRandom === null) {
    cachedRandom = Math.random();
  }
  return cachedRandom;
}

module.exports = { connectToDatabase, random };