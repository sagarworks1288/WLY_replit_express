const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const UsersModel = require("../../models/users_model");
const CountriesModel = require("../../models/countries_model");
const AuthHelper = require("../../helpers/auth_helper");
const Config = require("../../../config");

const AuthController = {}

AuthController.signUp = async (req, res) => {
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
        let user = await UsersModel.findOne({ email });
        if (!user) {
            user = await UsersModel.create({ name, email });
        }
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
AuthController.auth =  async (req, res) => {
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
//auth
AuthController.profile =  async (req, res) => {
    try {
        const session = AuthHelper.sessionGet(req);
        const userId = _.get(session,'auth._id',null)
        const countriesList = await CountriesModel.find({})   
        const user = await UsersModel.findOne({_id:userId})   
        
        console.log({session,userId,countriesList,user})
           
        return res.json({
            code: 1,
            countriesList,
            session,
            user
        });
    } catch (error) {
        return res.json({ code: 0, error: error.message });
    }
}

//uploadFile
AuthController.uploadFile =  async (req, res) => {
    try {
        const session = AuthHelper.sessionGet(req);          
        return res.json({
            code: 1,
            url:'https://react-bootstrap.netlify.app/img/logo.svg'
        });
    } catch (error) {
        return res.json({ code: 0, error: error.message });
    }
}

module.exports = AuthController;
