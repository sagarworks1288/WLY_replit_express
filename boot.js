// main.js

let express = require( "express" )();
let expapp = require( "express" );
let http    = require( "http" ).createServer( express );
let cors = require("cors");
let {port} = require("./config");
let path = require("path");
/*---------*/
let routerWeb = require("./application/routes/api");
let routerApi = require("./application/routes/api");

/*---------*/
express.use(expapp.static("public"));
express.use(cors());
// express.use("/", routerWeb);
express.use("/api", routerApi);



/*---------*/

/*---------*/
http.listen( port, function() {
    console.log( "listening on *:" + port );
});
/*---------*/
process.on("uncaughtException", (error, source) => {
    console.log({error:error.message} );
});
/*---------*/
