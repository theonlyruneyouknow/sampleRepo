// Needed Resources 
const express = require("express")
const router = new express.Router()

const utilities = require("../utilities")
// const detailRouter = new express.Router()

// const detailRouter = new express.detailRouter()
const invController = require("../controllers/invController")
// const invChecks = require("../utilities/inventory-valuation")
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// this is the new individual vehicle view
// Route to build inventory by classification view

router.get("/detail/:inv_id", invController.buildByinv_id);
// module.exports = detailRouter;

module.exports = router;