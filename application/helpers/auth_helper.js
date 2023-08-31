const Jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const crypto = require("crypto");
const Config = require("../../config");
const _ = require("lodash");
const UsersModel = require("../models/users_model");



let Session = {};

function sessionGet(req){
    const token = authToken(req);
    const md5 = generateMD5(token);
    return _.get(Session,[md5],null);
}
function sessionSet(req,key,value){
    const token = authToken(req);
    const md5 = generateMD5(token);
    _.set(Session,`['${md5}']['${key}']`,value);
    return sessionGet(req);
}
function authToken(req) {
    try {
        const authHeader = _.get(req, "headers.authorization", "");
        const token = authHeader.split(" ")[1];
        return token;
    } catch (error) {
        return { error: error.message };
    }
}

function authUserId(req) {
    try {
        const token = authToken(req);
        const uid = jwtDecode(token);
        return uid;
    } catch (error) {
        return { error: error.message };
    }
}

async function authUser(req) {
    try {
        const userId = authUserId(req);
        let sessionAll = sessionGet(req);
        let auth = _.get(sessionAll, "auth", null);

        if (auth === null) {
            const user = await UsersModel.findOne({
                _id: new mongoose.Types.ObjectId(userId),  // Use mongoose.Types.ObjectId to convert userId
            });

            if (user) {
                console.log("@@@@@-create-new");
                sessionAll = sessionSet(req, "auth", user);
                auth = user;  // Set auth to the user object retrieved from the database
            }
        } else {
            console.log("@@@@@-use-cache");
        }

        return auth;
    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
}

function jwtEncode(content, expiresIn = "10h") {
    return Jwt.sign(
        {
            data: content,
        },
        Config.JWT_KEY,
        { expiresIn: expiresIn }
    );
}

function jwtDecode(token) {
    let decode = {};
    try {
        decode = Jwt.verify(token, Config.JWT_KEY);
        decode = _.get(decode, "data", {});
    } catch (err) {
        decode = { error: err.message };
    }
    return decode;
}

function generateMD5(text) {
    const hash = crypto.createHash("md5").update(text).digest("hex");
    return hash;
}

module.exports = { jwtEncode, jwtDecode ,authUser,generateMD5,sessionSet,sessionGet };
