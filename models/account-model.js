const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
    try {
        const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
        return error.message
    }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail(account_email) {
    try {
        const result = await pool.query(
            'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
            [account_email])
        return result.rows[0]
    } catch (error) {
        return new Error("No matching email found")
    }
}


// /* *****************************
// *   Register new vehicle
// * *************************** */
// async function registerVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
//     try {
//         const sql = "INSERT INTO inventory (inv_make,inv_model,inv_year,inv_description,inv_image,inv_thumbnail,inv_price,inv_miles,inv_color,classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, 8, 9, 10) RETURNING *"
//         return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
//     } catch (error) {
//         return error.message
//     }
// }

/* *****************************
*   Update Inventory
* *************************** */
async function updateInventory(account_firstname, account_lastname, account_email, account_password) {
    try {
        // const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
        // const sql = "UPDATE Books SET Title = $1, Author = $2, Comments = $3 WHERE (Book_ID = $4)";
        const sql = "UPDATE public.inventory SET  inv_make=$2?, inv_model=$3, inv_year=$4, inv_description=$5, inv_image=$6, inv_thumbnail=$7, inv_price=$8, inv_miles=$9, inv_color=$10, classification_id=$11)  WHERE (inv_id= $1 ) RETURNING *"
        // // WHERE < condition >;
        // return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
        return await pool.query(sql, [inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles = inv_color, classification_id])
    } catch (error) {
        return error.message
    }
}


module.exports = { updateInventory, registerAccount, getAccountByEmail }