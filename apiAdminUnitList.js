let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let payload = await formParse(req);
        let projectId = _.get(payload, "body.projectId", 0);
        let adminId = _.get(req, "auth.userId", 0);
        let result = [];
        if (dbMode() == "mongo") {
            let db = await mongoDb();
            let unitsResult = await db.collection("units").find({ projectId: new ObjectId(projectId), adminId: new ObjectId(adminId) }).toArray();
            result = unitsResult;
        }
        if (dbMode() == "SQL") {
            result = await knex("floor").where("adminId", adminId);
        }
        obj.code = 1;
        obj.output.unitList = result;
        return res.status(200).json(obj);

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }

};