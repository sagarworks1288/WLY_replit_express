let express = require("express");
let router = express.Router();
//middleware import
let middlewareApiAuth = require("./middlewareApiAuth");
//api imports starts
let apiTest = require("./apiTest");
let apiAdminLogin = require("./apiAdminLogin");
let apiAdminProjectList = require("./apiAdminProjectList");
let apiAdminProjectStore = require("./apiAdminUnitInfo");
let apiAdminUnitList = require("./apiAdminUnitList");
let apiAdminProjectInfo = require("./apiAdminProjectInfo");
let apiAdminUnitInfo = require("./apiAdminUnitInfo");
let apiAdminUnitStore = require("./apiAdminUnitStore");
let apiAdminUnitUpdate = require("./apiAdminUnitUpdate");
let apiAdminUnitDelete = require("./apiAdminUnitDelete");
let apiAdminFileUpload = require("./apiAdminFileUpload");
//api imports ends
/*----------------*/
router.get("/test", apiTest);
router.post("/admin/login", apiAdminLogin);
router.post("/admin/project-list",middlewareApiAuth,apiAdminProjectList);
router.post("/admin/project-store",middlewareApiAuth,apiAdminProjectStore);
router.post("/admin/project-info",middlewareApiAuth,apiAdminProjectInfo);
router.post("/admin/unit-list",middlewareApiAuth,apiAdminUnitList);
router.post("/admin/unit-info",middlewareApiAuth, apiAdminUnitInfo);
router.post("/admin/unit-store",middlewareApiAuth,apiAdminUnitStore);
router.post("/admin/unit-update",middlewareApiAuth,apiAdminUnitUpdate);
router.post("/admin/unit-delete",middlewareApiAuth,apiAdminUnitDelete);
router.post("/admin/upload",middlewareApiAuth,apiAdminFileUpload);
//exports
module.exports = router;