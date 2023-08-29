let { ObjectId } = require("mongodb");
let { dateTime, knex, respObj, formParse, formValidator, jwtEncode, auth, mongoDb, dbMode, deleteFile } = require("./helper");
let _ = require("lodash");
module.exports = async function handler(req, res, next) {
    try {
        let obj = respObj();
        let form = await formParse(req);
        let validate =  formValidator(form.body,["name"]);
        if(validate.length>0){
            obj.error = validate.join(" , ")+ " required";
            return res.status(201).json(obj);   
        }
        let projectId = _.get(form,"body.projectId","");
        let adminId = _.get(auth(req),"userId",0);
        let name = _.get(form,"body.name","");
        let info = _.get(form,"body.info","");
        let type = _.get(form,"body.type","");
        let face = _.get(form,"body.face","");
        let area = _.get(form,"body.area","");
        let fileList = _.get(form,"body.fileList",[]);
    
        let _id = 0;
        if(dbMode()=="mongo"){
            let db = await mongoDb();
            let unitsResult = await db.collection("units").insertOne({adminId:new ObjectId(adminId),projectId:new ObjectId(projectId),name,info,type,face,area});
            _id = _.get(unitsResult,"insertedId",0);
            let imageInsert = await Promise.all(fileList.map(async (r,i)=>{
                let name = _.get(r,"name","");
                let mongoResult = await db.collection("unit_images").insertOne({adminId:new ObjectId(adminId),unitId:new ObjectId(_id),name});
                r.imageId = _.get(mongoResult,"insertedId",0);
                return r;
            }));
        }
        //RECODE REQIURED
        if(dbMode()=="SQL"){
            let sqlInsert = await knex("projects").insert({name:name,address:address,adminId:adminId,image:image}).returning("id");
            _id = _.get(sqlInsert,"[0].id",0);
        }
        //RECODE REQIURED
    
        if(_id!=0){
            obj.code  = 1;
            obj.output._id = _id;
            return res.status(200).json(obj);   
        }else{
            obj.error  = "failed";
            return res.status(201).json(obj);   
        }

    } catch (error) {
        return res.status(201).json({ code: 0, error: _.get(error, "message", "") });

    }

};