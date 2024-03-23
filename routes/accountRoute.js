// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
// const detailRouter = new express.Router()
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// router.get("/signup", utilities.handleErrors(accountController.buildSignup))

// router.get("/signup", utilities.handleErrors(accountController.buildRegister))
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// const detailRouter = new express.detailRouter()
// const invController = require("../controllers/invController")
router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Route to build inventory by classification view
// router.get("/type/:classificationId", invController.buildByClassificationId);


// this is the new individual vehicle view
// Route to build inventory by classification view

// router.get("/detail/:inv_id", invController.buildByinv_id);
// module.exports = detailRouter;

module.exports = router;