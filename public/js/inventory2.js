
'use strict'

// Get a list of items in inventory based on the classification_id 
let classificationShortList = document.querySelector("#classificationList")
classificationShortList.addEventListener("change", function () {
    let classification_id = classificationShortList.value
    console.log(`classification_id is: ${classification_id}`)
    console.log("Rune")

    let classIdURL = "/inv/getInventory/" + classification_id
    // let classIdURL = "/rev/getInventory/" + classification_id
    fetch(classIdURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw Error("Network response was not OK");
        })
        .then(function (data) {
            console.log(data);
            buildInventoryList(data);
        })
        .catch(function (error) {
            console.log('There was a problem: ', error.message)
        })
})


// Build inventory items into HTML table components and inject into DOM 
function buildInventoryList(data) {
    let inventoryDisplay = document.getElementById("inventoryDisplay");
    // Set up the table labels 
    let dataTable = '<thead>';
    dataTable += '<tr><th>Vehicle and Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>';
    dataTable += '</thead>';
    // Set up the table body 
    dataTable += '<tbody>';
    // Iterate over all vehicles in the array and put each in a row 
    data.forEach(function (element) {
        console.log(element.inv_id + ", " + element.inv_model);
        dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`;
        dataTable += `<td><a href='/rev/edit/${element.inv_id}' title='Click to update'>Modify</a></td>`;
        dataTable += `<td><a href='/rev/delete/${element.inv_id}' title='Click to delete'>Delete</a></td></tr>`;
    })
    dataTable += '</tbody>';
    // Display the contents in the Inventory Management view 
    inventoryDisplay.innerHTML = dataTable;
}