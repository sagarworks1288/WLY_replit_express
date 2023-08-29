let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    let authData = auth(req);
    _.set(req, "auth", authData);
    if (_.get(authData, "userId", 0) == 0) {
        let obj = respObj();
        obj.error = "auth required";
        return res.status(201).json(obj);
    }
    next();
};