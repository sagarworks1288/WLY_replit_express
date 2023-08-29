let express = require("express");
let fs = require("fs");
let moment = require("moment");
let {port,base_url,root_path} = require("./config");
let {dateTime,knex,mongoDb,dbMode} = require("./helper");
let router = express.Router();
const _ = require("lodash");  


  

let obj = {
    base_url
};
/*----------------*/
router.get( "/", async function( req, res ) { 
    try{
      
        // fs.writeFile(root_path+'/newfile.txt', 'Learn Node FS module', function (err) {
        //   if (err) throw err;
        //   console.log('File is created successfully.');
        // });
      
        res.send(`
        <p id="demo" >cc</p>
        <script>
        if(localStorage.getItem("lastname")==null){
          localStorage.setItem("lastname", "Smith")
        }else{
          document.getElementById("demo").innerHTML = localStorage.getItem("lastname");
        }
        
        </script>
        <a href="${base_url}/migration" > start  </a>`);
        
    }catch(error){
        res.send(error.message);
    }   
});

/*----------------*/
router.get( "/migration", async function( req, res ) { 
    try{
      
      
        if(dbMode()=="mongo"){
            let mdb = await mongoDb();
            let collection = await mdb.collection("admin");
            collection.insertOne( { name: "admin",email: "admin@gmail.com",password: "12345",type: "admin",status:"active",updatedAt:dateTime(),createdAt:dateTime() } );    
        }
      
        if(dbMode()=="mongo"){
            let exist = await knex("admin")
                .where("id", 1).catch(function(error) { console.error(error); }); 
            console.log(exist);
      
            let id = _.get(exist,"[0].id",0);
      
            if(id>0){
                return res.status(200).json({id});
            }
        
            // Create a table
            await knex.schema.createTable("admin", table => {
                table.increments("_id");
                table.string("name");
                table.string("email");
                table.string("password");
                table.string("type");
                table.string("status");
                table.string("updatedAt");
                table.string("createdAt");
            });
        
            await knex.schema.createTable("users", table => {
                table.increments("_id");
                table.string("adminId");
                table.string("name");
                table.string("email");
                table.string("password");
                table.string("type");
                table.string("status");
                table.string("updatedAt");
                table.string("createdAt");
            });
        
            await knex.schema.createTable("projects", table => {
                table.increments("_id");
                table.string("adminId");
                table.string("name");
                table.string("address");
                table.string("image");
                table.string("status");
                table.string("updatedAt");
                table.string("createdAt");
            });
        
            await knex.schema.createTable("assets", table => {
                table.increments("_id");
                table.string("adminId");
                table.string("name");
            });
        
        
            
            // Then query the table...
            const insertedRows = await knex("admin").insert({ name: "admin",email: "admin@gmail.com",password: "12345",type: "admin",status:"active",updatedAt:dateTime(),createdAt:dateTime() });
        
        }
        
        
        
        
        res.redirect("/");
        
    }catch(error){
        res.send(error.message);
    }   
});
/*----------------*/
module.exports = router;