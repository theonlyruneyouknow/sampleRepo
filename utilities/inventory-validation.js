const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}


/*  **********************************
  *  Registration Data Validation Rules for classification
  * ********************************* */
validate.classificationRules = () => {
    return [
        // firstname is required and must be string
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Please provide a classification name.") // on error this message is sent.


    ]
}


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add_classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}



/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */

validate.inventoryRules = () => {
    return [
        // make is required and must be string
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a inv_make."), // on error this message is sent.

        // model is required and must be string
        body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage("Please provide a inv_model."), // on error this message is sent.

        // valid year is required and cannot already exist in the DB
        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            // .isEmail()
            // .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_year is required."),

        // image is required and must be strong password
        body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            // .isEmail()
            // .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_image is required."),

        // thumbnail is required and must be strong password
        body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            // .isEmail()
            // .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_thumbnail is required."),

        // price is required and must be strong password
        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            // .isEmail()
            // .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_price is required."),

        // miles is required and must be strong password
        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            // .isEmail()
            // .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_miles is required."),

        // color is required and must be strong password
        body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            // .isEmail()
            // .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_color is required."),


        // classification is required and must be strong password
        body("classification_id")
            .trim()
            .escape()
            .notEmpty()
            // .isEmail()
            // .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid classification_id is required."),


        // desctiption is required and must be strong password
        body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            // .isEmail()
            // .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_description is required."),
    ]
}


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add_inventory", {
            errors,
            title: "Add Inventory",
            nav,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
            classification_id,
        })
        return
    }
    next()
}



module.exports = validate

