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


revCont.getInventoryJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classification_id)
    const checkInvData = await revModel.getInventoryByClassificationId(classification_id)
    if (checkInvData[0].inv_id) {
        return res.json(checkInvData)
    } else {
        next(new Error("No data Returned"))
    }
}


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

    res.render("reviews/revManagement", {
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
revCont.buildnoReviewsVehicles = async function (req, res, next) {
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
revCont.noReviewsVehicles = async function (req, res, next) {
    const nav = await utilities.getNav();
    // const classificationList = await utilities.buildClassificationList();
    res.render("reviews/noReviewsVehicles", {
        title: "No Reviews Vehicles",
        nav,
        // classificationList,
        errors: null,
    });
};



/*************************************
 * Build Management View
 ***************************************/
revCont.buildManagement2 = async function (req, res, next) {
    const nav = await utilities.getNav();
    // const classificationList = await utilities.buildClassificationList();
    res.render("/reviews/revManagement", {
        title: "revManagement",
        nav,
        // classificationList,
        errors: null,
    });
};

// /*************************************
//  * Build Management View
//  ***************************************/
// revCont.buildViewReviews = async function (req, res, next) {
//     const nav = await utilities.getNav();
//     const classificationList = await utilities.buildRevReviewList();
//     res.render("/rev/viewReviews", {
//         title: "ViewReviews",
//         nav,
//         classificationList,
//         errors: null,
//     });
// };



// /*************************************
//  * Build Management View
//  ***************************************/
// revCont.viewAllReviewsList2 = async function (req, res, next) {
//     const nav = await utilities.getNav();
//     // const classificationList = await utilities.buildClassificationList();
//     res.render("/reviews/viewAllReviewsList", {
//         title: "viewAllReviewsList",
//         nav,
//         // classificationList,
//         errors: null,
//     });
// };

// /*************************************
//  * Build Management View
//  ***************************************/
// revCont.buildManagementList = async function (req, res, next) {
//     const nav = await utilities.getNav();
//     const classificationList = await utilities.buildClassificationList();
//     res.render("./reviews/management", {
//         title: "Management",
//         nav,
//         classificationList,
//         errors: null,
//     });
// };


// /* ***************************
//  *  Build inventory by classification view
//  * ************************** */
// revCont.buildManagement = async function (req, res, next) {
//     // const inv_id = req.params.inv_id
//     // const data = await invModel.getInventoryByinv_id(inv_id)
//     // const grid = await utilities.buildinv_id(data)
//     // let nav = await utilities.getNav()
//     // const inv_year = data[0].inv_year
//     // const inv_make = data[0].inv_make
//     // const inv_model = data[0].inv_model
//     // const inv_description = data[0].inv_description
//     // const inv_miles = data[0].inv_miles
//     // const inv_color = data[0].inv_color
//     // const inv_price = data[0].inv_price

//     res.render("reviews/buildManagement", {
//         title: "Management",
//         // inv_make,
//         // inv_model,
//         // inv_year,
//         // inv_description,
//         // inv_price,
//         // inv_miles,
//         // inv_color,
//         nav,
//         // grid,
//     })
// }

// revCont.buildManagementView = async function (req, res, next) {
//     // const inv_id = req.params.inv_id
//     // const data = await invModel.getInventoryByinv_id(inv_id)
//     // const grid = await utilities.buildinv_id(data)
//     let nav = await utilities.getNav()
//     const classificationShortList = await utilities.buildShortClassificationList()

//     res.render("reviews/revManagement", {
//         title: "Reviews Management",
//         nav,
//         classificationShortList,
//         errors: null,

//     })
// }


// revCont.buildShortlist = async function (req, res, next) {
//     // const inv_id = req.params.inv_id
//     // const data = await invModel.getInventoryByinv_id(inv_id)
//     // const grid = await utilities.buildinv_id(data)
//     let nav = await utilities.getNav()
//     const classificationShortList = await utilities.buildClassificationList()

//     res.render("reviews/revManagement", {
//         title: "Reviews Management",
//         nav,
//         classificationList,
//         errors: null,

//     })
// }


// /* *************************** 
//  *  Build update2 inventory view (2)
//  * ************************** */
// revCont.buildUpdate2ReviewView = async function (req, res, next) {
//     const rev_id = parseInt(req.params.inv_id)
//     let nav = await utilities.getNav()
//     const itemData = await invModel.getInventoryByinv_id(inv_id)
//     const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
//     const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
//     // res.render("./inventory/edit2-inventory", {
//     res.render("./rev/edit2", {
//         title: "Edit2 " + itemName,
//         nav,
//         classificationSelect: classificationSelect,
//         errors: null,
//         inv_id: itemData[0].inv_id,
//         inv_make: itemData[0].inv_make,
//         inv_model: itemData[0].inv_model,
//         inv_year: itemData[0].inv_year,
//         inv_description: itemData[0].inv_description,
//         inv_image: itemData[0].inv_image,
//         inv_thumbnail: itemData[0].inv_thumbnail,
//         inv_price: itemData[0].inv_price,
//         inv_miles: itemData[0].inv_miles,
//         inv_color: itemData[0].inv_color,
//         classification_id: itemData[0].classification_id
//     })
// }


// /* ***************************
//  *  Build edit inventory view (1/ original)
//  * ************************** */
// revCont.editReviewView = async function (req, res, next) {
//     const rev_id = parseInt(req.params.rev_id)
//     let nav = await utilities.getNav()
//     const itemData = await revModel.getInventoryByRev_id(inv_id)
//     const ReviewSelect = await utilities.buildReviewList(itemData.rev_id)
//     // const itemName = `${itemData.inv_make} ${itemData.inv_model}`
//     // res.render("./inventory/edit-inventory", {
//     res.render("./rev/edit", {
//         title: "Edit " + itemName,
//         nav,
//         classificationSelect,
//         errors: null,
//         inv_id: itemData.inv_id,
//         inv_make: itemData.inv_make,
//         inv_model: itemData.inv_model,
//         inv_year: itemData.inv_year,
//         inv_description: itemData.inv_description,
//         inv_image: itemData.inv_image,
//         inv_thumbnail: itemData.inv_thumbnail,
//         inv_price: itemData.inv_price,
//         inv_miles: itemData.inv_miles,
//         inv_color: itemData.inv_color,
//         classification_id: itemData.classification_id
//     })
// }



module.exports = revCont
// module.exports = { registerReview, buildReviews }