const invModel = require("../models/inventory-model")
const revsModel = require("../models/review-model")

const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")
// const buildClassificationList = require("../utilities/buildClassificationList")
const express = require("express")
const router = new express.Router()
const invCont = {}


// const invCont2 = {}

invCont.buildInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    const buildClassificationList = await utilities.buildClassificationList()
    const add_classification_name = "Add new inventory"
    res.render("./inventory/add_vehicle", {
        title: add_classification_name,
        nav,
        classificationList
    })
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */

invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classification_id
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)

    let nav = await utilities.getNav()
    const className = data[0].classification_name
    // res.render means show ejs file in view/inventory folder named classification
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

// invCont.buildInventory = async function (req, res, next) {
//     let nav = await utilities.getNav()
//     res.render("inventory/add_inventory", {
//         title: "Add Inventory",
//         nav,
//         errors: null,
//     })
// }




// This is the new individual vehicle view
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.deleteByinv_id = async function (req, res, next) {
    const inv_id = req.params.inv_id
    const data = await invModel.getInventoryByinv_id(inv_id)
    const grid = await utilities.buildinv_id(data)
    let nav = await utilities.getNav()

    // const inv_id = data[0].inv_id
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
        title: inv_year + " " + inv_make + " " + inv_model,
        inv_make,
        inv_id,
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

// invCont.buildInventory = async function (req, res, next) {
//     let nav = await utilities.getNav()
//     res.render("inventory/add_inventory", {
//         title: "Add Inventory",
//         nav,
//         errors: null,
//     })
// }




// This is the new individual vehicle view
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByinv_id = async function (req, res, next) {
    const inv_id = req.params.inv_id
    // const account_id = req.params.account_id
    const data = await invModel.getInventoryByinv_id(inv_id)
    const buildClassificationList = await utilities.buildClassificationList()

    // const revs = await revsModel.getRevsByinv_id(inv_id)
    // const account_id = locals.accountData.account_id
    // const account_id = res.locals.accountData.account_id
    const grid = await utilities.buildinv_id(data)
    let nav = await utilities.getNav()
    const inv_year = data[0].inv_year
    const inv_make = data[0].inv_make
    const inv_model = data[0].inv_model
    const inv_description = data[0].inv_description
    const inv_miles = data[0].inv_miles
    const inv_color = data[0].inv_color
    const inv_price = data[0].inv_price

    // const inv_id = data[0].inv_id
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
        title: inv_year + " " + inv_make + " " + inv_model,
        inv_make,
        inv_id,
        // account_id,
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

invCont.buildManagementView = async function (req, res, next) {
    // const inv_id = req.params.inv_id
    // const data = await invModel.getInventoryByinv_id(inv_id)
    // const grid = await utilities.buildinv_id(data)
    let nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList()

    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        classificationList,
        errors: null,

    })
}

invCont.getInventoryJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classification_id)
    const checkInvData = await invModel.getInventoryByClassificationId(classification_id)
    if (checkInvData[0].inv_id) {
        return res.json(checkInvData)
    } else {
        next(new Error("No data Returned"))
    }
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

/*****************************************
 * Build New Inventory View
 **************************************/
invCont.buildInventory = async function (req, res, next) {
    const nav = await utilities.getNav();
    const { classification_id } = req.body;
    const classificationList = await utilities.buildClassificationList(classification_id);
    res.render("inventory/add_inventory", {
        title: "Add New Inventory",
        nav,
        classificationList,
        errors: null
    });
};

/*****************************************
 * Build New Inventory View (edit2)
 **************************************/
invCont.buildEdit2 = async function (req, res, next) {
    const nav = await utilities.getNav();
    const { classification_id } = req.body;
    const classificationList = await utilities.buildClassificationList(classification_id);
    res.render("inventory/add_inventory", {
        title: "Add New Inventory",
        nav,
        classificationList,
        errors: null
    });
};


/*****************************************
 * Build New Inventory View
 **************************************/
invCont.buildEdit = async function (req, res, next) {
    const nav = await utilities.getNav();
    const { classification_id } = req.body;
    const classificationList = await utilities.buildClassificationList(classification_id);
    res.render("inventory/add_inventory", {
        title: "Add New Inventory",
        nav,
        classificationList,
        errors: null
    });
};

/* ***************************
 *  Build edit2 inventory view
 * ************************** */
invCont.edit2InventoryView = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemData = await invModel.getInventoryByinv_id(inv_id)
    const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
    const itemName = `${itemData.inv_make} ${itemData.inv_model}`
    // res.render("./inventory/edit2-inventory", {
    res.render("./inventory/edit2", {
        title: "Edit2 " + itemName,
        nav,
        classificationSelect,
        errors: null,
        inv_id: itemData.inv_id,
        inv_make: itemData.inv_make,
        inv_model: itemData.inv_model,
        inv_year: itemData.inv_year,
        inv_description: itemData.inv_description,
        inv_image: itemData.inv_image,
        inv_thumbnail: itemData.inv_thumbnail,
        inv_price: itemData.inv_price,
        inv_miles: itemData.inv_miles,
        inv_color: itemData.inv_color,
        classification_id: itemData.classification_id
    })
}

/* ***************************
 *  Build edit inventory view (1/ original)
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemData = await invModel.getInventoryByinv_id(inv_id)
    const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
    const itemName = `${itemData.inv_make} ${itemData.inv_model}`
    // res.render("./inventory/edit-inventory", {
    res.render("./inventory/edit", {
        title: "Edit " + itemName,
        nav,
        classificationSelect,
        errors: null,
        inv_id: itemData.inv_id,
        inv_make: itemData.inv_make,
        inv_model: itemData.inv_model,
        inv_year: itemData.inv_year,
        inv_description: itemData.inv_description,
        inv_image: itemData.inv_image,
        inv_thumbnail: itemData.inv_thumbnail,
        inv_price: itemData.inv_price,
        inv_miles: itemData.inv_miles,
        inv_color: itemData.inv_color,
        classification_id: itemData.classification_id
    })
}

/* ***************************
 *  Build delete inventory view
 * ************************** */
invCont.buildDeleteInventoryView = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemData = await invModel.getInventoryByinv_id(inv_id)
    const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
    const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
    // res.render("./inventory/edit-inventory", {
    res.render("./inventory/inv_del_confirm", {
        title: "Delete " + itemName,
        nav,
        classificationSelect: classificationSelect,
        errors: null,
        inv_id: itemData[0].inv_id,
        inv_make: itemData[0].inv_make,
        inv_model: itemData[0].inv_model,
        inv_year: itemData[0].inv_year,
        inv_description: itemData[0].inv_description,
        inv_image: itemData[0].inv_image,
        inv_thumbnail: itemData[0].inv_thumbnail,
        inv_price: itemData[0].inv_price,
        inv_miles: itemData[0].inv_miles,
        inv_color: itemData[0].inv_color,
        classification_id: itemData[0].classification_id
    })
}

/* *************************** 
 *  Build update2 inventory view (2)
 * ************************** */
invCont.buildUpdate2InventoryView = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemData = await invModel.getInventoryByinv_id(inv_id)
    const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
    const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
    // res.render("./inventory/edit2-inventory", {
    res.render("./inventory/edit2", {
        title: "Edit2 " + itemName,
        nav,
        classificationSelect: classificationSelect,
        errors: null,
        inv_id: itemData[0].inv_id,
        inv_make: itemData[0].inv_make,
        inv_model: itemData[0].inv_model,
        inv_year: itemData[0].inv_year,
        inv_description: itemData[0].inv_description,
        inv_image: itemData[0].inv_image,
        inv_thumbnail: itemData[0].inv_thumbnail,
        inv_price: itemData[0].inv_price,
        inv_miles: itemData[0].inv_miles,
        inv_color: itemData[0].inv_color,
        classification_id: itemData[0].classification_id
    })
}


/* ***************************
 *  Build update inventory view (1/original)Build update inventory view
 * ************************** */
invCont.buildUpdateInventoryView = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemData = await invModel.getInventoryByinv_id(inv_id)
    const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
    const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
    // res.render("./inventory/edit-inventory", {
    res.render("./inventory/edit", {
        title: "Edit " + itemName,
        nav,
        classificationSelect: classificationSelect,
        errors: null,
        inv_id: itemData[0].inv_id,
        inv_make: itemData[0].inv_make,
        inv_model: itemData[0].inv_model,
        inv_year: itemData[0].inv_year,
        inv_description: itemData[0].inv_description,
        inv_image: itemData[0].inv_image,
        inv_thumbnail: itemData[0].inv_thumbnail,
        inv_price: itemData[0].inv_price,
        inv_miles: itemData[0].inv_miles,
        inv_color: itemData[0].inv_color,
        classification_id: itemData[0].classification_id
    })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    const {
        inv_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id,
    } = req.body
    const updateResult = await invModel.updateInventory(
        inv_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    )

    if (updateResult) {
        const itemName = updateResult.inv_make + " " + updateResult.inv_model
        req.flash("notice", `The ${itemName} was successfully updated.`)
        res.redirect("/inv/")
    } else {
        const classificationSelect = await utilities.buildClassificationList(classification_id)
        const itemName = `${inv_make} ${inv_model}`
        req.flash("notice", "Sorry, the insert failed.")
        res.status(501).render("inventory/edit-inventory", {
            title: "Edit " + itemName,
            nav,
            classificationSelect: classificationSelect,
            errors: null,
            inv_id,
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
        })
    }
}

/*************************************
 * Build Management View
 ***************************************/
invCont.buildManagementList = async function (req, res, next) {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("./inventory/management", {
        title: "Management",
        nav,
        classificationList,
        errors: null,
    });
};

/*************************************
 * Build Delete View
 ***************************************/
invCont.deleteView = async function (req, res, next) {
    // invCont.buildDeleteView = async function (req, res, next) {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("./inventory/delete", {
        title: "Delete2",
        nav,
        classificationList,
        errors: null,
    });
};

/*************************************
 * Build Delete View
 ***************************************/
invCont.deleteItem = async function (req, res, next) {
    // invCont.buildDeleteView = async function (req, res, next) {
    const nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("./inv", {
        title: "Delete",
        nav,
        classificationList,
        errors: null,
    });
};


/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.deleteInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    const {
        inv_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id,
    } = req.body
    const updateResult = await invModel.deleteInventoryItem(
        inv_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    )

    if (updateResult) {
        const itemName = updateResult.inv_make + " " + updateResult.inv_model
        req.flash("notice", `The ${itemName} was successfully updated.`)
        res.redirect("/inv/")
    } else {
        const classificationSelect = await utilities.buildClassificationList(classification_id)
        const itemName = `${inv_make} ${inv_model}`
        req.flash("notice", "Sorry, the insert failed.")
        res.status(501).render("inventory/inv_del_confirm", {
            title: "Edit " + itemName,
            nav,
            classificationSelect: classificationSelect,
            errors: null,
            inv_id,
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
        })
    }
}


module.exports = invCont
// module.exports = invCont2

// inv_make,
//     inv_model,
//     inv_year,