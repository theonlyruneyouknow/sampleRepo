const utilities = require("../utilities")
const accountModel = require("../models/account-model")

// const router = new express.Router()

async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
    })
}


/* ****************************************
*  Deliver signup view
* *************************************** */
// async function buildSignup(req, res, next) {
//     let nav = await utilities.getNav()
//     res.render("account/signup", {
//         title: "Sign Up",
//         nav,
//     })
// }

async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
        title: "Sign Up",
        nav,
        errors: null,
    })
}

async function buildManagement(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/management", {
        title: "Management",
        nav,
        errors: null,
    })
}

async function buildClassification(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/add_classification", {
        title: "Add Classification",
        nav,
        errors: null,
    })
}

async function buildInventory(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/add_inventory", {
        title: "Add Inventory",
        nav,
        errors: null,
    })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    const regResult = await accountModel.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )

    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${account_firstname}. Please log in.`
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


/* ****************************************
*  Process Add Classification
* *************************************** */
async function registerClassification(req, res) {
    let nav = await utilities.getNav()
    const { classification_name } = req.body

    const regResult = await accountModel.registerClassification(
        classification_name
    )

    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${classification_name}. Add another Classification?`
        )
        res.status(201).render("account/add_classification", {
            title: "Login",
            nav,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/add_classification", {
            title: "Registration",
            nav,
            // errors: null,
        })
    }
}


/* ****************************************
*  Process Add Vehicle
* *************************************** */
async function registerVehicle(req, res) {
    let nav = await utilities.getNav()
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

    const regResult = await accountModel.registerVehicle(
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
    )

    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${inv_year + " " + inv_make + " " + inv_model}. Register another Vehicle?.`
        )
        res.status(201).render("account/add_inventory", {
            title: "Login",
            nav,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/add_inventory", {
            title: "Registration",
            nav,
            // errors: null,
        })
    }
}





//   module.exports = { buildLogin, buildSignup }
module.exports = { buildLogin, buildRegister, registerAccount, registerClassification, registerVehicle, buildManagement, buildInventory, buildClassification }