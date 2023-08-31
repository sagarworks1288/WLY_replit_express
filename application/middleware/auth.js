let _ = require("lodash");
const AuthHelper = require("../helpers/auth_helper");

module.exports = async function handler(req, res, next) {
    try {
        const auth = await AuthHelper.authUser(req);
        const userId = _.get(auth,"_id",null);
        if(userId===null){
            return res.json({ code: 0, error: "invalid auth" }); 
        }
        next();
    } catch (error) {
        return res.json({ code: 0, error: "invalid auth",gtx :error.message });
    }
};