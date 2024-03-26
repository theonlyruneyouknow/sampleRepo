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
            .withMessage("Please provide a classification name."), // on error this message is sent.

        ,
    ]
}


module.exports = validate