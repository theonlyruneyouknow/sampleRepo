const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */

validate.InventoryRules = () => {
    return [
        // firstname is required and must be string
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a inv_make."), // on error this message is sent.

        // lastname is required and must be string
        body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage("Please provide a inv_model."), // on error this message is sent.

        // valid email is required and cannot already exist in the DB
        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_year is required."),

        // password is required and must be strong password

        body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_image is required."),

        // password is required and must be strong password        
        body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_thumbnail is required."),

        // password is required and must be strong password       
        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_price is required."),

        // password is required and must be strong password        
        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_miles is required."),

        // password is required and must be strong password       
        body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid inv_color is required."),


        // password is required and must be strong password       
        body("classification_id")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid classification_id is required."),


        // password is required and must be strong password       
        body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
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
        res.render("inv/add_inventory", {
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