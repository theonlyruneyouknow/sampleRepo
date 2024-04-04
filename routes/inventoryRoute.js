// Needed Resources 


const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const regValidate = require('../utilities/inventory-validation')

const invController = require("../controllers/invController")

const inventoryValidate = require("../utilities/inventory-validation");

// router.use([
//     "/add-classification",
//     "/add-inventory",
//     "/update",
//     "/delete"],
//     utilities.restrictAccess);

// const router = new express.Router()
// const detailRouter = new express.Router()

// const detailRouter = new express.detailRouter()
// const invController = require("../controllers/invController")
// const invChecks = require("../utilities/inventory-valuation")
// Route to build inventory by classification view

router.get("/add_classification",
    utilities.handleErrors(invController.buildClassification))
router.get("/add_inventory",
    utilities.handleErrors(invController.buildInventory))


router.get("/type/:classification_id",
    invController.buildByClassificationId);

router.get("/inv",
    utilities.handleErrors(invController.buildHome))


// this is the new individual vehicle view
// Route to build inventory by classification view

router.get("/detail/:inv_id",
    utilities.handleErrors(invController.buildByinv_id));
// module.exports = detailRouter;
router.get("/",
    utilities.handleErrors(invController.buildManagementView));


router.post(
    "/add_classification",
    regValidate.classificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.registerClassification)
)


router.post(
    "/add_inventory"
    ,
    regValidate.inventoryRules()
    ,
    regValidate.checkInventoryData
    ,
    utilities.handleErrors(invController.registerVehicle)
)

router.get(
    "/getInventory/:classification_id",
    // utilities.checkAccountType,
    utilities.handleErrors(invController.getInventoryJSON)
)
// // Route to deliver inventory editor
// router.get(
//     "/update/:inv_id",
//     // "/update/:inventory_id",
//     utilities.handleErrors(invController.buildUpdateInventoryView));

router.get(
    "/edit/:inv_id",
    // "/edit/:inventory_id",
    utilities.handleErrors(invController.buildUpdateInventoryView));


// router.get("/inv/edit", utilities.handleErrors(invController.buildEdit))
// router.get("/edit", utilities.handleErrors(invController.buildEdit))
// router.get("/login", accountController.registerAccount)
http://localhost:5500/inv/type/1
// Post for update inventory
router.post(
    "/edit",
    // validate.addInvRules(),
    inventoryValidate.addInventoryRules(),
    inventoryValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory));

// Post for update inventory
router.post(
    "/update",
    // validate.addInvRules(),
    inventoryValidate.addInventoryRules(),
    inventoryValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory));

// Deliver the delete confirmation view
router.get(
    "/delete/:inv_id",
    utilities.handleErrors(invController.deleteView));

// Process the delete inventory request
router.post(
    "/delete",
    utilities.handleErrors(invController.deleteItem));


module.exports = router;