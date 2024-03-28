// Needed Resources 


const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const regValidate = require('../utilities/inventory-validation')

const invController = require("../controllers/invController")


// const router = new express.Router()
// const detailRouter = new express.Router()

// const detailRouter = new express.detailRouter()
// const invController = require("../controllers/invController")
// const invChecks = require("../utilities/inventory-valuation")
// Route to build inventory by classification view

router.get("/add_classification", utilities.handleErrors(invController.buildClassification))
router.get("/add_inventory", utilities.handleErrors(invController.buildInventory))


router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/inv", utilities.handleErrors(invController.buildHome))


// this is the new individual vehicle view
// Route to build inventory by classification view

router.get("/detail/:inv_id", invController.buildByinv_id);
// module.exports = detailRouter;
router.get("/", invController.buildManagement);


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



module.exports = router;