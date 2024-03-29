const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const express = require("express")
const router = new express.Router()
const invCont = {}

// const invCont2 = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

invCont.buildClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add_classification", {
        title: "Add Classification",
        nav,
        errors: null,
    })
}

invCont.buildInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add_inventory", {
        title: "Add Inventory",
        nav,
        errors: null,
    })
}




// This is the new individual vehicle view
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByinv_id = async function (req, res, next) {
    const inv_id = req.params.inv_id
    const data = await invModel.getInventoryByinv_id(inv_id)
    const grid = await utilities.buildinv_id(data)
    let nav = await utilities.getNav()
    const inv_year = data[0].inv_year
    const inv_make = data[0].inv_make
    const inv_model = data[0].inv_model
    const inv_description = data[0].inv_description
    const inv_miles = data[0].inv_miles
    const inv_color = data[0].inv_color
    const inv_price = data[0].inv_price


    // inv_make,
    //     inv_model,
    //     inv_year,
    //     inv_description,
    //     inv_image,
    //     inv_thumbnail,
    //     inv_price,
    //     inv_miles,
    //     inv_color,
    //     classification_id

    // " HELP Rune " +
    res.render("./inventory/vehicles", {
        title: inv_year + inv_make + " " + inv_model,
        inv_make,
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
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
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

    res.render("inventory/management", {
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
*  Process Add Classification
* *************************************** */
invCont.registerClassification = async function (req, res, next) {

    let nav = await utilities.getNav()
    const { classification_name } = req.body

    const regResult = await invModel.registerClassification(
        classification_name
    )

    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${classification_name}. Add another Classification?`
        )
        res.status(201).render("inventory/add_classification", {
            title: "Login",
            nav,
            errors: null,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("inventory/add_classification", {
            title: "Registration",
            nav,
            // errors: null,
        })
    }
}


/* ****************************************
*  Process Add Vehicle
* *************************************** */

invCont.registerVehicle = async function (req, res, next) {

    let nav = await utilities.getNav()
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

    const regResult = await invModel.registerVehicle(
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
        res.status(201).render("inventory/add_inventory", {
            title: "Login",
            nav,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("inventory/add_inventory", {
            title: "Registration",
            nav,
            errors: null,
        })
    }
}



module.exports = invCont
// module.exports = invCont2

// inv_make,
//     inv_model,
//     inv_year,