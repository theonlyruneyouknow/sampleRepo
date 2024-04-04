// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')
// const detailRouter = new express.Router()



router.get("/login", utilities.handleErrors(accountController.buildLogin))
// router.get("/login", accountController.registerAccount)






// router.get("/signup", utilities.handleErrors(accountController.buildSignup))

// router.get("/signup", utilities.handleErrors(accountController.buildRegister))
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// router.get("/management", utilities.handleErrors(accountController.buildManagement))
router.get("/inv", utilities.handleErrors(accountController.buildHome))

router.get(
    "/",
    utilities.checkLogin,
    utilities.handleErrors(accountController.buildManagement)
)


// router.get("/", utilities.handleErrors(accountController.buildHome))
// const detailRouter = new express.detailRouter()
// const invController = require("../controllers/invController")
// router.post('/register', utilities.handleErrors(accountController.registerAccount))
// Process the registration data

// Process the login request
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
)

router.post(
    "/register",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.registerAccount)
)

// Route to handle logout
router.get("/logout", utilities.handleErrors(accountController.logout));

// router.post(
//     "/register",
//     // regValidate.loginRules(),
//     // regValidate.checkLoginData,
//     utilities.handleErrors(accountController.registerAccount)
// )


// router.post(
//     "/add_inventory",
//     regValidate.inventoryRules(),
//     regValidate.checkInventoryData,
//     utilities.handleErrors(accountController.registerVehicle)
// )


// Route to build inventory by classification view
// router.get("/type/:classification_id", invController.buildByClassificationId);


// this is the new individual vehicle view
// Route to build inventory by classification view

// router.get("/detail/:inv_id", invController.buildByinv_id);
// module.exports = detailRouter;

module.exports = router;