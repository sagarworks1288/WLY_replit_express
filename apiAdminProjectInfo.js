let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let payload = await formParse(req);
        let projectId = _.get(payload, "body._id", 0);
        let result = [];
        let adminId = req.auth.userId;
        let project = {};
        if (dbMode() == "mongo") {
            let db = await mongoDb();
            result = await db.collection("projects").find({ _id: new ObjectId(projectId), adminId: new ObjectId(adminId) }).toArray();
            project = _.get(result, "0", {});
        }
        if (dbMode() == "SQL") {
            result = await knex("projects").where("adminId", adminId);
        }
        if (result.length == 0) {
            obj.error = "invalid";
            return res.status(201).json(obj);
        }
        obj.code = 1;
        obj.output.project = project;
        return res.status(200).json(obj);

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }

};