/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const session = require("express-session")
const pool = require('./database/')
const baseController = require("./controllers/baseController")
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
// const accountRoute = require("./routes/accountRoute")
const Util = require("./utilities/index")
const utilities = require("./utilities/")
const bodyParser = require("body-parser")
// const cookieParsen = require("cookie-parsen")
// const Util = require("./utilities/index")
// console.log("check vari", Util)
// console.log("check var", Util)





/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root



/* ****************************************
*  Deliver login view
* *************************************** */
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
//   let nav = await utilities.getNav()
//   res.render("account/signup", {
//     title: "Sign Up",
//     nav,
//   })
// }

async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Sign Up",
    nav,
  })
}

async function buildManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Sign Up",
    nav,
  })
}
// module.exports = { buildLogin, buildSignup }

module.exports = { buildLogin, buildRegister, buildManagement }





/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory routes
app.use("/inv", require("./routes/inventoryRoute"))
app.use("/account", require("./routes/accountRoute"))

app.use("/login", require("./routes/accountRoute"))
app.use("/signup", require("./routes/accountRoute"))
//Index route

// app.get("/", function (reg, res) {
//   res.render("index", { title: "home" })
// })
// Inventory routes
app.use("/inv", inventoryRoute) //original but shows 404

// app.use("/inv", /inventory/management)


// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' })
})





/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await Util.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
