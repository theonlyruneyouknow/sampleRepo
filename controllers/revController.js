const utilities = require("../utilities")
const reviewModel = require("../models/review-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


async function registerReview(req, res) {
    let nav = await utilities.getNav()
    const { rev_id, rev_title, rev_body, rev_date, rev_rating, account_id, inv_id } = req.body
    // Hash the password before storing
    // let hashedPassword
    try {
        // regular password and cost (salt is generated automatically)
        // hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
        req.flash("notice", 'Sorry, there was an error processing the registration.')
        res.status(500).render("review/register", {
            title: "Registration",
            nav,
            errors: null,
        })
    }
    const regResult = await reviewModel.registerReview(
        rev_id,
        rev_title,
        rev_body,
        rev_date,
        rev_rating,
        account_id,
        inv_id
    )

    if (regResult) {
        req.flash(
            "notice",
            `Congratulations, you\'re registered ${rev_title}. Please log in.`
        )
        res.status(201).render("account/login", {
            title: "Login",
            nav,
        })
    } else {
        req.flash("notice", "Sorry, the registration failed.")
        res.status(501).render("account/register", {
            title: "Registration",
            nav,
            // errors: null,
        })
    }
}