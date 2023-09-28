let express = require("express");
let router = express.Router();

const ClientHomeController = require("../controllers/client/home_controller");
const ClientAuthController = require("../controllers/client/auth_controller");
const ClientUsersController = require("../controllers/client/users_controller");
const AuthMiddleware = require("../middleware/auth");

/*----------------*/
router.get( "/", ClientHomeController.index);
router.get( "/test", ClientHomeController.test);
router.post( "/client/sign-up", ClientAuthController.signUp);
router.post( "/client/auth",AuthMiddleware, ClientAuthController.auth);
router.post( "/client/users-list",AuthMiddleware, ClientUsersController.list);
router.post( "/client/profile",AuthMiddleware, ClientAuthController.profile);
router.post( "/client/upload-file",AuthMiddleware, ClientAuthController.uploadFile);




module.exports = router;