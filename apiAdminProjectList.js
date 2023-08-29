let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let result = [];
        let adminId = _.get(req, "auth.userId", 0);
        if (dbMode() == "mongo") {
            let db = await mongoDb();
            result = await db.collection("projects").find({ adminId: new ObjectId(adminId) }).toArray();
        }
        if (dbMode() == "SQL") {
            result = await knex("projects").where("adminId", adminId);
        }
        obj.code = 1;
        obj.output.projectList = result;
        return res.status(200).json(obj);

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }

};