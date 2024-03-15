const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */

async function getClassifications() {
    return await pool.query(
        "SELECT * FROM public.classification ORDER BY classification_name"
    )
}

/*
comment here

*/
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            "SELECT * FROM public.inventory AS i JOIN public.classification as C ON i.classification_id = c.classification_id = $1",
            [classification_id]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationbyid error " + error)
    }
}

/*
comment here


*/
Util.buildClassificationGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.foreach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/deail/' + vehicle.inv_id >
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + '"details"><img src="' + vehicle.inv_thumbnail
                + ' "alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '<li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}




module.exports = { getClassifications }