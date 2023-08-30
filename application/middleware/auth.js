let _ = require("lodash");
const AuthHelper = require("../helpers/auth_helper");

module.exports = async function handler(req, res, next) {
    try {
        const auth = await AuthHelper.authUser(req);
        if(auth===null || _.get(auth,"error",null)!==null){
            return res.json({ code: 0, error: "invalid auth" }); 
           
        }
        next();
    } catch (error) {
        return res.json({ code: 0, error: "invalid auth",code :error.message });
    }
};