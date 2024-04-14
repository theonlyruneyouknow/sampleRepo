const pool = require("../database/")


/* *****************************
*   Register new account
* *************************** */
async function registerReview(rev_title, rev_body, rev_rating, account_id, inv_id) {
    try {
        const sql = "INSERT INTO public.review( rev_title, rev_body, rev_rating, account_id, inv_id, rev_date) VALUES ( $1, $2, $3, $4, $5, now() ) RETURNING *"

        return await pool.query(sql, [rev_title, rev_body, rev_rating, account_id, inv_id])
    } catch (error) {
        return error.message
    }
}

// /* ***************************
//  *  Get all inventory items and classification_name by classification_id
//  * ************************** */
async function getRevsByinv_id(inv_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.review 
        WHERE inv_id = $1`,
            [inv_id]
        )
        return data.rows
    } catch (error) {
        console.error("getinv_id error " + error)
    }
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationsbyid error " + error)
    }
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
            [classification_id]
        )
        return data.rows
    } catch (error) {
        console.error("getclassificationsbyid error " + error)
    }
}



/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getReviewsByClassificationId(classification_id) {
    try {
        const data = await pool.query(
            // `SELECT * FROM public.inventory AS i 
            // JOIN public.review AS r 
            // ON i.inv_id = r.inv_id  



            ` SELECT * FROM public.inventory AS i 
        JOIN public.review AS r 
        ON i.inv_id = r.inv_id 
	JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
WHERE i.inv_id = $1`,
            [classification_id]
        )
        console.log(data.rows)
        return data.rows
    } catch (error) {
        console.error("getReviewsByClassificationId error " + error)
    }
}


/***********************
 * Get all Reviews for one car
 ***********************/
async function getReviews(inv_id) {
    try {
        return await pool.query(
            "SELECT * FROM public.review where inv_id = $1", [inv_id]
        );
    } catch (error) {
        console.error("getinv_id error " + error)
    }
}




module.exports = { registerReview, getRevsByinv_id, getReviews }

// /* *****************************
// *   Register new account
// * *************************** */
// async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
//     try {
//         const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
//         return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
//     } catch (error) {
//         return error.message
//     }
// }
