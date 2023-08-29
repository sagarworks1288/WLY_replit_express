let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let form = await formParse(req);
        let validate = formValidator(form.body, ["email", "password"]);
        if (validate.length > 0) {
            obj.error = validate.join(" , ") + " required";
            return res.status(201).json(obj);
        }
        let email = _.get(form, "body.email", "");
        let password = _.get(form, "body.password", "");
        let userId = 0;
        if (dbMode() == "mongo") {
            let db = await mongoDb();
            let result = await db.collection("admin").find({ email: email, password: password, status: "active" }).toArray();
            userId = _.get(result, "[0]._id", 0);
        }
        if (dbMode() == "SQL") {
            let result = await knex("admin").where({ email: email, password: password, status: "active" });
            userId = _.get(result, "[0].id", 0);
        }
        if (userId == 0) {
            obj.error = "invalid details required";
            return res.status(201).json(obj);
        }
        let authObj = { "type": "admin", "userId": userId };
        let token = jwtEncode(authObj);
        obj.code = 1;
        obj.output.token = token;
        return res.status(200).json(obj);

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }
};