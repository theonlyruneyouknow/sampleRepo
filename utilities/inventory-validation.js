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



/***************************
 * Add inventory validation rules
 ********************/
validate.addInventoryRules = () => {
    return [
        body("classification_id")
            .trim()
            .notEmpty()
            .withMessage("Select a classification"),

        body("inv_make",
            "An inventory make is required")
            .trim()
            .notEmpty(),

        body("inv_model",
            "Inventory model is required")
            .trim()
            .notEmpty(),

        body("inv_year")
            .trim()
            .isInt({ min: 1950, max: 2025 })
            .withMessage("A valid year between 1950 and 2025 is required"),

        body("inv_description")
            .trim()
            .isString()
            .isLength({ min: 10 })
            .withMessage("Description with at least 10 characters is required"),

        body("inv_image")
            .trim()
            .matches(/(([^\\s]+(jpe?g|png))$)/)
            .withMessage("PNG or JPG image file path is required"),

        body("inv_thumbnail")
            .trim()
            .matches(/(([^\\s]+(jpe?g|png))$)/)
            .withMessage("PNG or JPG image thumbnail file path is required"),

        body("inv_price",
            "A minimum price of 20 is required")
            .trim()
            .isInt({ min: 20 }),

        body("inv_miles",
            "A minimum of 0 miles is required")
            .trim()
            .isInt({ min: 0 }),

        body("inv_color",
            "Inventory color is required")
            .trim()
            .notEmpty(),
    ];
};


validate.checkUpdateData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const nav = await utilities.getNav();
        const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body;
        const invClass = await utilities.buildClassificationList(classification_id);
        res.render("inventory/update-inventory", {
            errors, title: "Update Inventory", nav,
            invClass, inv_make, inv_model,
            inv_year, inv_description, inv_image,
            inv_thumbnail, inv_price, inv_miles,
            inv_color, classification_id,
        });
        return;
    }
    next();
};



module.exports = validate

