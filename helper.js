let moment = require("moment");
let Jwt =  require("jsonwebtoken");
let {IncomingForm} = require("formidable");
let {root_path,JwtKey,client} = require("./config");
let _ = require("lodash");
const fs = require("fs");


let knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: `${root_path}/database.sqlite3.db`,
    },
});
  
function dateTime(){
    return moment().format("YYYY-MM-DD HH:mm:ss");
}

function respObj(){
    return {"code":0,"error":"","message":"","output":{}};
}


function formParse(req){  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ body:fields, files });
    });
});
}

function formValidator(data,fileds){  
    let vld = [];
    for (let e = 0; e < fileds.length; e++) {
        if(data[fileds[e]]==undefined){
            vld.push(fileds[e]);
        }
    }
    return vld;
}


function jwtEncode(content,expiresIn="10h"){
    return Jwt.sign({
        data: content
    }, JwtKey, { expiresIn: expiresIn });
}

function jwtDecode(token){
    let decode = {};
    try {
        decode = Jwt.verify(token, JwtKey);
        decode =  _.get(decode,"data",{});
    } catch(err) {

    }
    return decode;
}


function auth (req) {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        token =  req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    }
    let decoded = jwtDecode(token);
    return decoded;
}



function dbMode(){
    return "mongo"; 
}


function mongoDb() {
    return new Promise((resolve)=> client.connect().then(resolve(client.db("estate_erp"))) );
}

function deleteFile(filename){ 
    return 0;
    let filePath = root_path+"/"+filename;
    fs.exists(filePath, function(exists) {
        if(exists) {
            console.log("File exists. Deleting now ...");
            fs.unlinkSync(filePath);
        } else {
            console.log("File not found, so not deleting.");
        }
    });
}




module.exports = {
    dateTime, knex,respObj,formParse,formValidator,jwtEncode,jwtDecode,auth,mongoDb,dbMode,deleteFile
};