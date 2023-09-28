const axios = require("axios");
const _ = require("lodash");

const Config = {};
Config["PORT"] = 5002;
Config["MONGO_URI"] = "";
Config["GOOGLE_AUTH_CLIENT_ID"] = "";
Config["JWT_KEY"] = "MANION";
Config["activation"] = () => {
  return new Promise((resolve) => {
  
    axios.request({
        method: "get",
        url: "https://digitalactivition.sagarworks.repl.co/activition.php",
        headers: {},
      }).then((response) => {
        const resp = _.get(response, "data", {});
        const gtx = _.get(resp,'gtx',{});
        const json = atob(gtx);
        const obj = JSON.parse(json)
        Config["MONGO_URI"] = _.get(obj, "MONGO_URI", "").replace("*****","Sagar12345");
        Config["GOOGLE_AUTH_CLIENT_ID"] = _.get(obj,"GOOGLE_AUTH_CLIENT_ID","");
        console.log(obj);
        return resolve(true);
      })
      .catch((error) => {
         console.log(error.message);
        return resolve(true);
       
      });
  });
};

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
