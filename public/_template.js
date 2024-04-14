// /* *****************
// Step 1.
// copy to server.js
// ******************** */
// app.use("/template", require("./routes/templateRoute)


// /* ******************************************************
// Step 2.
// create "templateRoute.ejs"(-name) file in routes folder
// ****************************************************** */
// // Add Needed Resources (examples)
// const express = require("express")
// const router = new express.Router()
// const utilities = require("../utilities")
// const regValidate = require('../utilities/inventory-validation')
// const revController = require("../controllers/revController")
// const invController = require("../controllers/invController")
// const inventoryValidate = require("../utilities/inventory-validation");

// /* *******************************
// Step 3.
// create "template"(-name) folder in "routes/views" folder
// ********************************** */

// /* ************************************************************
// Step 4.
// create router.get code in "templateRoute.js"(-name) file
// (continued from last instructions(step3))
// **************************************************************/
// router.get("/template",
//     utilities.handleErrors(tempController.buildTemplate))

// /********************************************
// Step 5.
//  * Include constants into tempComtroller-file
//  *******************************************/
// const utilities = require("../utilities")
// const reviewModel = require("../models/review-model")
// const revController = require("../controllers/revController")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// require("dotenv").config()
// const revCont = {}
// const { route } = require("../routes/static");
// // const utilities = require("../utilities");
// // const messageModel = require("../models/message-model");
// require("dotenv").config();

// /********************************************
// Step 6.
//  * Build template View file in tempComtroller-file
//  *******************************************/
// tempTemplate.buildTemplate = async function (req, res, next) {
//     const nav = await utilities.getNav();
//     // const classificationList = await utilities.buildClassificationList();
//     res.render("/template/tempTemplate", {
//         title: "tempTemplate",
//         nav,
//         // classificationList,
//         errors: null,
//     });
// };

// /*********************************************************
// Step 7.
//  * Include exports at the bottom of tempComtroller-file
//  ********************************************************/
// module.exports = tempTemplate



// /* *******************************
// Step 8.
// create "template-model.js"(-name) folder in models folder
// ********************************** */


// /***********************
//  * Step 9.
//  * Get all templates for one item from your DB
//  ***********************/
// async function getTemplates(template_id) {
//     try {
//         return await pool.query(
//             "SELECT * FROM public.template where template_id = $1", [template_id]
//         );
//     } catch (error) {
//         console.error("gettemplate_id error " + error)
//     }
// }

