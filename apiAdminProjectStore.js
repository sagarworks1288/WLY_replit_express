let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let form = await formParse(req);
        let validate = formValidator(form.body, ["name"]);
        if (validate.length > 0) {
            obj.error = validate.join(" , ") + " required";
            return res.status(201).json(obj);
        }
        let name = _.get(form, "body.name", "");
        let address = _.get(form, "body.address", "");
        let image = _.get(form, "body.image", "");
        let adminId = _.get(auth(req), "userId", 0);
        let projectId = 0;
        if (dbMode() == "mongo") {
            let db = await mongoDb();
            let result = await db.collection("projects").insertOne({ name: name, address: address, adminId: new ObjectId(adminId), image: image });
            projectId = _.get(result, "insertedId", 0);
            let unitsResult = await db.collection("units").insertOne({ adminId: new ObjectId(adminId), name: "sample property", projectId: new ObjectId(projectId) });
            let unitId = _.get(unitsResult, "insertedId", 0);
        }
        if (dbMode() == "SQL") {
            let sqlInsert = await knex("projects").insert({ name: name, address: address, adminId: adminId, image: image }).returning("id");
            projectId = _.get(sqlInsert, "[0].id", 0);
        }

        if (projectId !== 0) {
            obj.code = 1;
            obj.output.id = id;
            return res.status(200).json(obj);
        } else {
            obj.error = "failed";
            return res.status(201).json(obj);
        }

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }

};