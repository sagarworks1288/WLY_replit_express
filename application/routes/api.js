let express = require("express");
let router = express.Router();

const ClientHomeController = require("../controllers/client/home_controller");
const ClientAuthController = require("../controllers/client/auth_controller");
const AuthMiddleware = require("../middleware/auth");

/*----------------*/
router.get( "/", ClientHomeController.index);
router.get( "/test", ClientHomeController.test);
router.post( "/client/sign-up", ClientAuthController.signUp);
router.post( "/client/auth",AuthMiddleware, ClientAuthController.auth);

module.exports = router;