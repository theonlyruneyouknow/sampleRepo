const invModel = require("../models/inventory-model")
const revModel = require("../models/review-model")

const bodyParser = require("body-parser")
const Util = {}

const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    console.log(data)
    let list = "<ul class='navigate'> "
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    // console.log(data.row)
    return list
}






/* ****************************************
 *  Check Login
 * ************************************ */
Util.showReview = (req, res, next) => {
    if (res.locals.loggedin) {
        next()
    } else {
        // req.flash("notice", "Please log in.")
        return res.redirect("/account/login")
    }
}


// module.exports = Util
Util.checkAccountType = (req, res, next) => {
    if (res.locals.accountData.account_type == "Employee" || res.locals.accountData.account_type == "Admin") {
        next()
    } else {
        req.flash("notice", "Access is forbidden.")
        return res.redirect("/account/")
    }
}


/* **************************************
* Build the reviews-view HTML
* ************************************ */
Util.buildReviewsGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(review => {
            grid += '<li id="rev-display">'
            // grid += '<a href="../../inv/detail/' + vehicle.inv_id
            //     + '" title="View ' + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model
            //     + ' details"><img src="' + vehicle.inv_thumbnail
            //     + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
            //     + ' on CSE Motors" /></a>'
            // grid += '<div class="namePrice">'
            // grid += '<hr />'
            // grid += '<p>TEST</p>'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + review.title + '" title="View '
                + review.body + ' ' + review.account_id + ' details">'
                + review.rev_date + ' ' + review.rev_id + '</a>'
            grid += '</h2>'
            // grid += '<span>$'
            //     + new Intl.NumberFormat('en-US').format(review.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'


        })

    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}



/* **************************************
* Build the reviews-view HTML
* ************************************ */
Util.buildReviewTable = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(review => {
            grid += '<li id="rev-display">'
            // grid += '<a href="../../inv/detail/' + vehicle.inv_id
            //     + '" title="View ' + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model
            //     + ' details"><img src="' + vehicle.inv_thumbnail
            //     + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
            //     + ' on CSE Motors" /></a>'
            // grid += '<div class="namePrice">'
            // grid += '<hr />'
            // grid += '<p>TEST</p>'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + review.title + '" title="View '
                + review.body + ' ' + review.account_id + ' details">'
                + review.rev_date + ' ' + review.rev_id + '</a>'
            grid += '</h2>'
            // grid += '<span>$'
            //     + new Intl.NumberFormat('en-US').format(review.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'


        })

    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li id="inv-display">'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' details"><img src="' + vehicle.inv_thumbnail
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            // grid += '<p>TEST</p>'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'


        })

    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}



Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()
    let classificationList =
        '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
        classificationList += '<option value="' + row.classification_id + '"'
        if (
            classification_id != null &&
            row.classification_id == classification_id
        ) {
            classificationList += " selected "
        }
        classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
}

Util.buildShortClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()
    let classificationShortList =
        '<select name="classification_id" id="classificationList" required>'
    classificationShortList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
        classificationShortList += '<option value="' + row.classification_id + '"'
        if (
            classification_id != null &&
            row.classification_id == classification_id
        ) {
            classificationShortList += " selected "
        }
        classificationShortList += ">" + row.classification_name + "</option>"
    })
    classificationShortList += "</select>"
    return classificationShortList
}


Util.buildRevClassificationList = async function (classification_id = null) {
    let data = await revModel.getClassifications()
    let classificationList =
        '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
        classificationList += '<option value="' + row.classification_id + '"'
        if (
            classification_id != null &&
            row.classification_id == classification_id
        ) {
            classificationList += " selected "
        }
        classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
}


Util.buildRevReviewList = async function (classification_id = null) {
    let data = await revModel.getClassifications()
    let classificationList =
        '<select name="classification_id" id="classificationList" required>'
    classificationList += "<option value=''>Choose a Classification</option>"
    data.rows.forEach((row) => {
        classificationList += '<option value="' + row.classification_id + '"'
        if (
            classification_id != null &&
            row.classification_id == classification_id
        ) {
            classificationList += " selected "
        }
        classificationList += ">" + row.classification_name + "</option>"
    })
    classificationList += "</select>"
    return classificationList
}



/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildinv_id = async function (data) {
    // const account_id = locals.accountData.account_id
    // const { account_email, account_password, account_id } = req.body
    // const { account_id } = res.locals.accountData
    // const account_id = 15
    // const inv_id = 14
    // const d = new Date()
    // let r_date = d.toISOString()
    // const rev_date = r_date
    // const inv_id = req.params.inv_id
    let grid

    if (data.length > 0) {
        grid = '<div class="col-container">'
        data.forEach(vehicle => {
            const inv_id = vehicle.inv_id

            grid += '<div class="col">'
            grid += '<li class="rune">'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' details"><img src="' + vehicle.inv_image
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span><strong>Price:</strong> $'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '<div>'
            // inv_model,
            // inv_year,
            grid += '<strong>Description:</strong> ' + vehicle.inv_description,
                grid += '</div>'
            grid += '<div>'
            // inv_price,
            grid += '<strong>Miles:</strong> ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles)
            grid += '</div>'
            grid += '<div>'
            grid += '<strong>Exterior Color:</strong> ' + vehicle.inv_color,
                grid += '</div>'
            grid += '</li>'
            grid += '</div>'
            grid += '</div>'
            // })
            grid += '</div>'
            grid += '</ul>'
            grid += ' <h2>Customer Review</h2>'
            grid += ''
            grid += '<p>Be the first to write a review.<br>No reviews for this item. </p>'
            // grid += messages()
            grid += ' <span>'
            grid += '<!-- <h2>HTML Forms</h2> -->'
            grid += '<div id="hideform" type="hidden">'
            grid += '<h2>Write Review</h2>'
            grid += '   <form action="add_review" method="post">'
            grid += '  <label for="title">Title:</label><br>'
            grid += '<input type="text" id="rev_title" name="rev_title" value=""><br>'
            grid += '  <label for="body">Review:</label><br>'
            grid += ' <textarea   id="rev_body" name="rev_body" value="" rows="4" cols="50"></textarea><br><br>'
            grid += ' <label for="test">Rating:</label><br>'
            grid += ' <input type="text" id="rev_rating" name="rev_rating" value=""><br>'
            // grid += +  rev_date + '"><br><br>'
            // grid += '<label for="test">Account_id:</label><br>'
            // grid += '<input type="integer" id="account_id" name="account_id" value="'
            // grid += +  account_id + '"><br>'
            // grid += ' <label for="test">inv id:</label><br>'
            grid += ' <input type="hidden"  type="integer" id="inv_id" name="inv_id" value="'
            grid += + inv_id
            grid += '"><br><br>'

        })
        // grid += '           <label for="date">Date:</label><br>'
        // grid += ' <input type="date" id="rev_date" name="rev_date" value=a><br> '
        grid += ' <button class="button">Contribute Review</button>'
        grid += '  <!-- <input type="submit" value="Submit"> -->'
        grid += '  </form>'
        grid += '  <!-- <div>No Account? No Problem: <a href="/account/signup">Sign Up</a></div>'


        grid += '  <%# account_id %>'
        grid += '    -->'
        grid += '</div>'
        grid += '  <!-- <button class="button" id="showForm">Hide Rating Form</button> -->'
        grid += '</span>'
        grid += ' </picture>'
        grid += '<button onclick="myFunction()" id="rateBtn">Hide Rating Form</button>'


        grid += ' <script>'
        grid += '  function myFunction() {'
        grid += '   var x = document.getElementById("hideform");'
        grid += '  if (x.style.display === "none") {'
        grid += '      x.style.display = "block";'
        grid += '  rateBtn.innerHTML = "Hide Rating Form";'
        grid += '    } else {'
        grid += '      x.style.display = "none";'
        grid += '  rateBtn.innerHTML = "Write a Rating";'
        grid += '    }'
        grid += '}'
        grid += ' </script>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
    if (req.cookies.jwt) {
        jwt.verify(
            req.cookies.jwt,
            process.env.ACCESS_TOKEN_SECRET,
            function (err, accountData) {
                if (err) {
                    req.flash("notice", "Please log in")
                    res.clearCookie("jwt")
                    return res.redirect("/account/login")
                }
                res.locals.accountData = accountData
                res.locals.loggedin = 1
                next()
            })
    } else {
        next()
    }
}



/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
    if (res.locals.loggedin) {
        next()
    } else {
        req.flash("notice", "Please log in.")
        return res.redirect("/account/login")
    }
}


module.exports = Util