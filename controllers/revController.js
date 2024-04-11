const utilities = require("../utilities")
const reviewModel = require("../models/review-model")

const revController = require("../controllers/revController")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const revCont = {}


const { route } = require("../routes/static");
// const utilities = require("../utilities");
// const messageModel = require("../models/message-model");
require("dotenv").config();




/* ****************************************
*  Deliver Review view
* ****************************************/
revCont.buildReviewbox = async function (req, res, next) {
    // async function buildReviewbox(req, res) {
    // async function buildInbox(req, res) {
    const nav = await utilities.getNav();
    // const reviewbox = await utilities.buildReviewTable(req.params.account_id);
    // const messageInbox = await utilities.buildMessageTable(req.params.account_id);
    // const archivedCount = await messageModel.getArchivedCount(req.params.account_id);
    res.render("review/add_reviews", {
        // res.render("message/inbox", {
        title: `Review`,
        nav,
        errors: null,
        // reviewbox,
        // buildReviewsGrid
        // archivedCount,
    });
}


revCont.registerReview = async function (req, res, next) {
    // async function registerReview(req, res) {
    let nav = await utilities.getNav()

    const { rev_title, rev_body, rev_rating, account_id, inv_id, rev_date } = req.body
    // Hash the password before storing
    // let hashedPassword
    try {
        // regular password and cost (salt is generated automatically)
        // hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
        req.flash("notice", 'Sorry, there was an error processing the registration.')
        res.status(500).render("review/register", {
            title: "Registration",
            nav,
            errors: null,
        })
    }
    const regResult = await reviewModel.registerReview(

        rev_title,
        rev_body,
        rev_rating,
        res.locals.accountData.account_id,
        inv_id
    )

    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re reviewed ${rev_title}. Please make another review.`
        )
        res.status(201).render("account/login", {
            title: "Login",
            nav,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/register", {
            title: "Registration",
            nav,
            // errors: null,
        })
    }
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
revCont.buildReviews = async function (req, res, next) {
    // const rev_id = req.params.rev_id
    // const data = await revsModel.getReviews(rev_id)
    // const data = await reviewModel.getReviews
    // const data = await reviewModel.getReviewsInventoryByinv_id(inv_id)
    // const grid = await utilities.buildinv_id(data)
    // const reviews = await reviewModel.getRevsByinv_id(inv_id) This is the place
    // const reviews_html = await utilities.revHTML(reviews)
    let nav = await utilities.getNav()
    // const inv_year = data[0].inv_year
    // const inv_make = data[0].inv_make
    // const inv_model = data[0].inv_model
    // const inv_description = data[0].inv_description
    // const inv_miles = data[0].inv_miles
    // const inv_color = data[0].inv_color
    // const inv_price = data[0].inv_price

    res.render("reviews/management", {
        title: "Reviews",
        // inv_make,
        // inv_model,
        // inv_year,
        // inv_description,
        // inv_price,
        // inv_miles,
        // inv_color,
        nav,
        // grid,
    })
}

/*************************************
 * Build Management View
 ***************************************/
revCont.viewReviews = async function (req, res, next) {
    const nav = await utilities.getNav();
    // const classificationList = await utilities.buildClassificationList();
    res.render("./reviews/viewReviews", {
        title: "viewReviews",
        nav,
        // classificationList,
        errors: null,
    });
};


/*************************************
 * Build Management View
 ***************************************/
revCont.buildReviewbox = async function (req, res, next) {
    const nav = await utilities.getNav();
    // const classificationList = await utilities.buildClassificationList();
    res.render("/reviews/buildReviewbox", {
        title: "buildReviewbox",
        nav,
        // classificationList,
        errors: null,
    });
};


/*************************************
 * Build Management View
 ***************************************/
revCont.viewAllReviewsList = async function (req, res, next) {
    const nav = await utilities.getNav();
    // const classificationList = await utilities.buildClassificationList();
    res.render("/reviews/viewAllReviewsList", {
        title: "viewAllReviewsList",
        nav,
        // classificationList,
        errors: null,
    });
};



/*************************************
 * Build Management View
 ***************************************/
revCont.noReviewsVehicles = async function (req, res, next) {
    const nav = await utilities.getNav();
    // const classificationList = await utilities.buildClassificationList();
    res.render("/reviews/noReviewsVehicles", {
        title: "noReviewsVehicles",
        nav,
        // classificationList,
        errors: null,
    });
};


/*************************************
 * Build Management View
 ***************************************/
revCont.noReviewsVviewAllReviewsListehicles = async function (req, res, next) {
    const nav = await utilities.getNav();
    // const classificationList = await utilities.buildClassificationList();
    res.render("/reviews/viewAllReviewsList", {
        title: "viewAllReviewsList",
        nav,
        // classificationList,
        errors: null,
    });
};

/*************************************
 * Build Management View
 ***************************************/
revCont.buildManagementList = async function (req, res, next) {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("./reviews/management", {
        title: "Management",
        nav,
        classificationList,
        errors: null,
    });
};


/* ***************************
 *  Build inventory by classification view
 * ************************** */
revCont.buildManagement = async function (req, res, next) {
    const inv_id = req.params.inv_id
    const data = await invModel.getInventoryByinv_id(inv_id)
    const grid = await utilities.buildinv_id(data)
    let nav = await utilities.getNav()
    // const inv_year = data[0].inv_year
    // const inv_make = data[0].inv_make
    // const inv_model = data[0].inv_model
    // const inv_description = data[0].inv_description
    // const inv_miles = data[0].inv_miles
    // const inv_color = data[0].inv_color
    // const inv_price = data[0].inv_price

    res.render("reviews/management", {
        title: "Management",
        // inv_make,
        // inv_model,
        // inv_year,
        // inv_description,
        // inv_price,
        // inv_miles,
        // inv_color,
        nav,
        grid,
    })
}

revCont.buildManagementView = async function (req, res, next) {
    // const inv_id = req.params.inv_id
    // const data = await invModel.getInventoryByinv_id(inv_id)
    // const grid = await utilities.buildinv_id(data)
    let nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList()

    res.render("./reviews/management", {
        title: "Reviews Management",
        nav,
        classificationList,
        errors: null,

    })
}


module.exports = revCont
// module.exports = { registerReview, buildReviews }