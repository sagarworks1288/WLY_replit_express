// main.js
const _ = require("lodash");
var cron = require("node-cron");
let express = require( "express" )();
let expapp = require( "express" );
const bodyParser = require("body-parser");
const timeout = require('connect-timeout');
let http    = require( "http" ).createServer( express );
let cors = require("cors");
const Config = require("./config");
const Db = require("./application/utils/db");

let path = require("path");
/*---------*/
let routerWeb = require("./application/routes/api");
let routerApi = require("./application/routes/api");

/*---------*/
express.use(expapp.static("public"));
express.use(cors());
const timeoutDuration = 10000; // 10 seconds
express.use(timeout(timeoutDuration));
express.use(bodyParser.json());
// express.use("/", routerWeb);
express.use("/api", routerApi);

Db.connectToDatabase();



/*---------*/

/*---------*/
http.listen( _.get(Config,"PORT",3000), function() {
    console.log( "listening on *:" + _.get(Config,"PORT",3000) );
});
/*---------*/
// cron.schedule("*/10 * * * * *", () => {
//     console.log("running a task every 10 seconds");
// });
process.on("uncaughtException", (error, source) => {
    console.log({error:error.message} );
});
/*---------*/
