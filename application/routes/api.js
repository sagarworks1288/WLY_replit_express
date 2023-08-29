let express = require("express");
let router = express.Router();

const ClientHomeController = require("../controllers/client/home_controller");
const ClientAuthController = require("../controllers/client/auth_controller");

/*----------------*/
router.get( "/", ClientHomeController.index);
router.get( "/test", ClientHomeController.test);
router.get( "/client/sign-up", ClientAuthController.signUp);

module.exports = router;