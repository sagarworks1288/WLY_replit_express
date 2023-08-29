const port = 5002;
const base_url = `http://localhost:${port}`;
const root_path = "./estate_generated_data";
const JwtKey = "1234567890";
const fs = require("fs");
const dbMode = "mongo";
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://sagar:Sagar12345@cluster0.ofju6td.mongodb.net/bitWatch?retryWrites=true&w=majority";
const client = new MongoClient(url);

if (!fs.existsSync(root_path)){
    fs.mkdirSync(root_path);
}


module.exports = {
    port,
    base_url,
    root_path,
    JwtKey,
    client
};