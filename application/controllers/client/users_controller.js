const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const UsersModel = require("../../models/users_model");
const AuthHelper = require("../../helpers/auth_helper");
const Config = require("../../../config");


const UserController = {}


UserController.list = async (req, res) => {
    try {
        const payload = _.get(req, "body", {});
        const perPage = 5
        const page = _.get(payload, 'page', 1)
        const skipPage = page > 1 ? ((page - 1) * perPage) : 0
        const data = await UsersModel.aggregate([
            // { $match: query },
          //  { $sort: sortObj },
            {
              $facet: {
                totalData: [{ $skip: skipPage }, { $limit: perPage }],
                totalCount: [{ $count: 'count' }]
              }
            }
          ])
        return res.json({
            code: 1,
            data: data,
        });
    } catch (error) {
        return res.json({ code: 0, error: error.message });
    }
}



UserController.test = async (req, res) => {
    try {
        const payload = _.get(req, "body", {});
        const perPage = 5
        const page = _.get(payload, 'page', 1)
        const skipPage = page > 1 ? ((page - 1) * perPage) : 0
        const data = await UsersModel.aggregate([
            // { $match: query },
          //  { $sort: sortObj },
            {
              $facet: {
                totalData: [{ $skip: skipPage }, { $limit: perPage }],
                totalCount: [{ $count: 'count' }]
              }
            }
          ])
        return res.json({
            code: 1,
            data: data,
        });
    } catch (error) {
        return res.json({ code: 0, error: error.message });
    }
}


module.exports = UserController;
