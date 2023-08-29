let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let payload = await formParse(req);
        let projectId = _.get(payload, "body.projectId", 0);
        let _id = _.get(payload, "body._id", 0);
        let adminId = _.get(req, "auth.userId", 0);
        let result = [];
        if (dbMode() == "mongo") {
            let db = await mongoDb();
            let unitsResult = await db.collection("units").aggregate([
                { $match: { _id: new ObjectId(_id) } },
                {
                    $lookup:
          {
          	from: "unit_images",
          	localField: "_id",
          	foreignField: "unitId",
          	as: "unitImages"
          }
                },
                { $project: { name: 1, info: 1, type: 1, face: 1, area: 1, unitImages: { _id: 1, name: 1 } } },
            ]).toArray();

            // let unitsResult = await db.collection('units').find({_id:new ObjectId(_id)}).toArray();
            result = unitsResult;
        }
        //RECODE REQIURED
        if (dbMode() == "SQL") {
            result = await knex("floor").where("adminId", adminId);
        }
        //RECODE REQIURED
        obj.code = 1;
        obj.output.unit = _.get(result, "[0]", {});
        return res.status(200).json(obj);

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }

};