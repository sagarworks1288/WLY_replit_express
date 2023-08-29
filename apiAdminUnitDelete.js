let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let form = await formParse(req);
        let validate =  formValidator(form.body,["_id"]);
        if(validate.length>0){
            obj.error = validate.join(" , ")+ " required";
            return res.status(201).json(obj);   
        }
        let _id = _.get(form,"body._id","");
        if(dbMode()=="mongo"){
            let db = await mongoDb();
            let unitsResult = await db.collection("units").deleteMany({ _id: new ObjectId(_id) });
            console.log(unitsResult);
        }
        //RECODE REQIURED
        if(dbMode()=="SQL"){
            let sqlInsert = await knex("projects").insert({name:name,address:address,adminId:adminId,image:image}).returning("id");
            _id = _.get(sqlInsert,"[0].id",0);
        }
        //RECODE REQIURED
    
        if(_id!=0){
            obj.code  = 1;
            return res.status(200).json(obj);   
        }else{
            obj.error  = "failed";
            return res.status(201).json(obj);   
        }

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }

};