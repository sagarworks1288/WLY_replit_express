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
        let _id = _.get(form,"body._id","");
        let name = _.get(form,"body.name","");
        let info = _.get(form,"body.info","");
        let type = _.get(form,"body.type","");
        let face = _.get(form,"body.face","");
        let area = _.get(form,"body.area","");
        let fileList = _.get(form,"body.fileList",[]);
    
        console.log({_id,name,info});
    
        if(dbMode()=="mongo"){
            let db = await mongoDb();
            let unitsResult = await db.collection("units").updateOne({ _id: new ObjectId(_id) }, { $set: {name:name,info:info,type:type,face:face,area:area}, });
            let imageInsert = await Promise.all(fileList.map(async (r,i)=>{
                let name = _.get(r,"name","");
                let findOldResult = await db.collection("unit_images").find({unitId:new ObjectId(_id),name:name}).toArray();
                let imageId = _.get(findOldResult,"[0]._id",0);
                if(imageId==0){
                    let mongoResult = await db.collection("unit_images").insertOne({adminId:new ObjectId(adminId),unitId:new ObjectId(_id),name});
                    imageId = _.get(mongoResult,"insertedId",0);
                }
                r.imageId = imageId;
                return r;
            }));
        
            let deletable = [0,...fileList.map((r,i)=>r.name)];
            let deleteResult = await db.collection("unit_images").deleteMany({ unitId:new ObjectId(_id),name:{$nin:deletable}  });
       
        
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