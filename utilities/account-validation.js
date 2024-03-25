const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.registationRules = () => {
    return [
        // firstname is required and must be string
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a first name."), // on error this message is sent.

        // lastname is required and must be string
        body("account_lastname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage("Please provide a last name."), // on error this message is sent.

        // valid email is required and cannot already exist in the DB
        body("account_email")
            .trim()
            .escape()
            .notEmpty()
            .isEmail()
            .normalizeEmail() // refer to validator.js docs
            .withMessage("A valid email is required."),

        // password is required and must be strong password
        body("account_password")
            .trim()
            .notEmpty()
            .isStrongPassword({
                minLength: 4, // 4 for testing, 12 for production
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements."),
    ]
}


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        })
        return
    }
    next()
}


// /*  **********************************
//   *  Registration Data Validation Rules for classification
//   * ********************************* */
// validate.classificationRules = () => {
//     return [
//         // firstname is required and must be string
//         body("classification_name")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isLength({ min: 3 })
//             .withMessage("Please provide a classification name."), // on error this message is sent.

//         ,
//     ]
// }


// /* ******************************
//  * Check data and return errors or continue to registration
//  * ***************************** */
// validate.checkClassificationData = async (req, res, next) => {
//     const { classification_name } = req.body
//     let errors = []
//     errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         let nav = await utilities.getNav()
//         res.render("account/add_classification", {
//             errors,
//             title: "Add Classification",
//             nav,
//             classification_name,
//         })
//         return
//     }
//     next()
// }



// /*  **********************************
//   *  Registration Data Validation Rules
//   * ********************************* */

// validate.InventoryRules = () => {
//     return [
//         // firstname is required and must be string
//         body("inv_make")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isLength({ min: 1 })
//             .withMessage("Please provide a inv_make."), // on error this message is sent.

//         // lastname is required and must be string
//         body("inv_model")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isLength({ min: 2 })
//             .withMessage("Please provide a inv_model."), // on error this message is sent.

//         // valid email is required and cannot already exist in the DB
//         body("inv_year")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isEmail()
//             .normalizeEmail() // refer to validator.js docs
//             .withMessage("A valid inv_year is required."),

//         // password is required and must be strong password

//         body("inv_image")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isEmail()
//             .normalizeEmail() // refer to validator.js docs
//             .withMessage("A valid inv_image is required."),

//         // password is required and must be strong password        
//         body("inv_thumbnail")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isEmail()
//             .normalizeEmail() // refer to validator.js docs
//             .withMessage("A valid inv_thumbnail is required."),

//         // password is required and must be strong password       
//         body("inv_price")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isEmail()
//             .normalizeEmail() // refer to validator.js docs
//             .withMessage("A valid inv_price is required."),

//         // password is required and must be strong password        
//         body("inv_miles")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isEmail()
//             .normalizeEmail() // refer to validator.js docs
//             .withMessage("A valid inv_miles is required."),

//         // password is required and must be strong password       
//         body("inv_color")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isEmail()
//             .normalizeEmail() // refer to validator.js docs
//             .withMessage("A valid inv_color is required."),


//         // password is required and must be strong password       
//         body("classification_id")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isEmail()
//             .normalizeEmail() // refer to validator.js docs
//             .withMessage("A valid classification_id is required."),


//         // password is required and must be strong password       
//         body("inv_description")
//             .trim()
//             .escape()
//             .notEmpty()
//             .isEmail()
//             .normalizeEmail() // refer to validator.js docs
//             .withMessage("A valid inv_description is required."),
//     ]
// }


// /* ******************************
//  * Check data and return errors or continue to registration
//  * ***************************** */
// validate.checkInventoryData = async (req, res, next) => {
//     const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
//     let errors = []
//     errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         let nav = await utilities.getNav()
//         res.render("account/add_inventory", {
//             errors,
//             title: "Add Inventory",
//             nav,
//             inv_make,
//             inv_model,
//             inv_year,
//             inv_description,
//             inv_image,
//             inv_thumbnail,
//             inv_price,
//             inv_miles,
//             inv_color,
//             classification_id,
//         })
//         return
//     }
//     next()
// }





module.exports = validate