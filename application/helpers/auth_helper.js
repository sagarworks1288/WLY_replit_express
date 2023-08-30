const Jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Config = require("../../config");
const _ = require("lodash");
const Session = require("../utils/session");
const UsersModel = require("../models/users_model");

function sessionSet(req, key, value) {
    const userId = authUserId(req);
    return Session.set(userId, key, value);
}
function sessionGet(req,key) {
    const userId = authUserId(req);
    return Session.get(userId, key);
}
function sessionGetAll(req,key) {
    const userId = authUserId(req);
    return Session.getAll(userId);
}

function authToken(req) {
    try {
        const authHeader = _.get(req, "headers.authorization", "");
        const token = authHeader.split(" ")[1];
        return token;
    } catch (error) {
        return resolve({ error: error.message });
    }
}

function authUserId(req) {
    try {
        const token = authToken(req);
        const uid = jwtDecode(token);
        return uid;
    } catch (error) {
        return resolve({ error: error.message });
    }
}

function authUser(req) {
    return new Promise(async (resolve) => {
        try {
            const userId = authUserId(req);
            let auth = Session.get(userId, "auth");
            if (auth === null) {
                const user = await UsersModel.find({
                    _id: new mongoose.Types.ObjectId(userId),
                });
                if (user) {
                    auth = Session.set(userId, "auth", user);
                }
            }
            return resolve(auth);
        } catch (error) {
            return resolve({error:error.message});
        }
    });
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

module.exports = { jwtEncode, jwtDecode ,authUser,sessionSet,sessionGet,sessionGetAll };
