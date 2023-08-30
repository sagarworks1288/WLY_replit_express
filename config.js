const Config = {};
Config["PORT"] = 5002;
Config["MONGO_URI"] = "mongodb+srv://sagar:Sagar12345@cluster0.ofju6td.mongodb.net/wly?retryWrites=true&w=majority";
Config["GOOGLE_AUTH_CLIENT_ID"] = "209904001034-q9235oqklob1ebgqkikk0oqav4b0la0j.apps.googleusercontent.com";
Config["JWT_KEY"] = "209904001034-q9235oqklob1ebgqkikk0oqav4b0la0j.apps.googleusercontent.com";


// const port = 5002;
// const base_url = `http://localhost:${port}`;
// const root_path = "./estate_generated_data";
// const JwtKey = "1234567890";
// const fs = require("fs");
// const dbMode = "mongo";
// const { MongoClient } = require("mongodb");
// const url = "mongodb+srv://sagar:Sagar12345@cluster0.ofju6td.mongodb.net/bitWatch?retryWrites=true&w=majority";
// const client = new MongoClient(url);

// if (!fs.existsSync(root_path)){
//     fs.mkdirSync(root_path);
// }


module.exports = Config;