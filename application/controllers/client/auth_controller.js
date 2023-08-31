const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const UsersModel = require("../../models/users_model");
const AuthHelper = require("../../helpers/auth_helper");
const Config = require("../../../config");



async function signUp(req, res) {
    try {
        const payload = _.get(req, "body", {});
        const client = new OAuth2Client(Config.GOOGLE_AUTH_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: _.get(payload, "token", ""),
            audience: Config.GOOGLE_AUTH_CLIENT_ID,
        });
        const GPayload = ticket.getPayload();
        const name = _.get(GPayload, "name", "");
        const email = _.get(GPayload, "email", "");
        const user = await UsersModel.create({ name, email });
        const jwt = AuthHelper.jwtEncode(_.get(user, "_id", null));
        return res.json({
            code: 1,
            auth: jwt,
        });
    } catch (error) {
        return res.json({ code: 0, error: error.message });
    }
}
//auth
async function auth(req, res) {
    try {
        AuthHelper.sessionSet(req, Math.random(), Math.random());
        const dtc = AuthHelper.sessionGet(req);
        return res.json({
            code: 1,
            auth: req.auth,
            dtc
        });
    } catch (error) {
        return res.json({ code: 0, error: error.message });
    }
}

module.exports = { signUp, auth };
