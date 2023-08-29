let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
let fs = require("fs");
let {root_path} = require("./config");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let form = await formParse(req);
        let file = _.get(form,"files.file",{});
        let tempPath = _.get(file,"filepath","");
        let newFileName = parseInt(Math.random()*1000000)+_.get(file,"originalFilename","");
        let newPath = root_path+"/"+newFileName;
        fs.rename(tempPath,newPath,(success,error)=>console.log);
        let adminId = req.auth.userId;
        if(dbMode()=="mongo"){
            let db = await mongoDb();
            result = await db.collection("assets").insertOne({name:newFileName,adminId:new ObjectId(adminId)});
            id = _.get(result,"insertedId",0);
        }
        // if(dbMode()=="SQL"){
        //     let sqlInsert = await knex('assets').insert({name:newFileName,adminId:adminId}).returning('id');
        //     id = _.get(sqlInsert,'[0].id',0);
        // }
        obj.code = 1;
        obj.output.file = newFileName;
        return res.status(200).json(obj);

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }

};