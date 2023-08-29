let express = require("express");
let router = express.Router();

const ClientHomeController = require("../controllers/client/home_controller");

/*----------------*/
router.get( "/", ClientHomeController.index);
router.get( "/test", ClientHomeController.test);

/*----------------
router.get( '/', async function( req, res ) { 
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
        <a href="${'mm'}/migration" > start  </a>`)
        
    }catch(error){
        res.send(error.message)
    }   
});

-------------*/
module.exports = router;