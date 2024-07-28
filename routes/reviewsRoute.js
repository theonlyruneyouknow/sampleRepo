// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const revController = require("../controllers/revController")

// const detailRouter = new express.Router()

// const detailRouter = new express.detailRouter()
const invController = require("../controllers/invController")
// const invChecks = require("../utilities/inventory-valuation")
// Route to build inventory by classification view

router.get("/edit/:inv_id",
    // "/edit/:inventory_id",
    utilities.handleErrors(revController.buildUpdateReviewView));


// router.get("/", revController.viewReviews);
// router.use("/", utilities.checkLogin);
router.get("/",
    utilities.handleErrors(revController.buildManagementView));

router.get("/viewReviews", utilities.handleErrors(revController.viewReviews));
router.get("/noReviewsVehicles", utilities.handleErrors(revController.noReviewsVehicles));
router.get("/viewAllReviewsList", utilities.handleErrors(revController.viewAllReviewsList));
router.get("/revManagement", utilities.handleErrors(revController.buildManagement));
router.get("/buildReviewbox", utilities.handleErrors(revController.buildReviewbox));
router.get("/buildViewReview", utilities.handleErrors(revController.buildViewReviews));
router.get("/buildReview", utilities.handleErrors(revController.buildReviews));
// router.get("/viewReviews", utilities.handleErrors(revController.viewReviews));

// router.get("/inbox/:account_id", utilities.handleErrors(messageController.buildReviewBox));
// router.get("/inbox/:account_id", utilities.handleErrors(messageController.buildInbox));

// this is the new individual vehicle view
// Route to build inventory by classification view

// router.get("/detail/:inv_id", invController.buildByinv_id);
// module.exports = detailRouter;

module.exports = router;