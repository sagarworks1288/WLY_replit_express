let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
module.exports = async function handler(req, res, next) {
    let db = await mongoDb();
    let result = await db.collection("admin").aggregate([
        {
            $lookup:
            {
            	from: "projects",
            	localField: "_id",
            	foreignField: "adminId",
            	as: "joined"
            }
        }
    ]).toArray();


    return res.status(200).json({ result });
};