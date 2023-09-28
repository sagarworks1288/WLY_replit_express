const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const UsersModel = require("../../models/users_model");
const UserImagesModel = require("../../models/user_images_model");
const AuthHelper = require("../../helpers/auth_helper");
const Config = require("../../../config");


const UserController = {}


UserController.list = async (req, res) => {
    try {
        const payload = _.get(req, "body", {});
        const perPage = 20
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
      
      let userList = _.get(data, '[0]totalData', [])
      const userIds = _.map(userList,(r)=>_.get(r,'_id',null))
      const userImages = await UserImagesModel.aggregate([
        {$match:{'userId':{$in:userIds}}},
        {
          $lookup: {
            from: 'assets',
            localField: 'assetId',
            foreignField: '_id',
            as: 'assets'
          }
        },
        { $unwind: { path: "$assets", preserveNullAndEmptyArrays: true } },
      ])
      console.log({userImages:JSON.stringify(userImages)})
      userList = _.map(userList,(r)=>{
        const imageMain = _.find(userImages,(uir)=>String(_.get(uir,'userId',null))===String(_.get(r,'_id',false)))
        console.log({imageMain})
        const image = _.get(imageMain,'assets.url',null)
        _.set(r,'imageUrl',image)
        return r
      })
      
      
      
      
      return res.json({
        code: 1,
        output: { usersList:  userList},
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
        const userList = await UsersModel.aggregate([
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
