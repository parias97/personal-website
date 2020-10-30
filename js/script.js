/*
      Name: Peter Arias
      Email: peter_arias@student.uml.edu
      Affiliation: Student at UMass Lowell in 91.61 GUI Programming I
      Date: 10/29/2020
      Description: Creating an Interactive Dynamic Table
      91.461 Assignment: Assignment No. 5
*/

const formRef = document.forms.inputForm;
const elStartMultiplier = formRef.elements.startMultiplier;
const elEndMultiplier = formRef.elements.endMultiplier;
const elStartMultiplicand = formRef.elements.startMultiplicand;
const elEndMultiplicand = formRef.elements.endMultiplicand;
const tableDiv = document.getElementById("tableDiv");
const genTableBttn = document.getElementById("genTableBttn");
let currTable;

/**
 * Replaces the last child of the body which is currTable with the newly created table.
 * 
 * @param {Node} newTable The newly created table to replace the current table with.
 * @return {Node} The new table
 */
function replaceTable(newTable){
    tableDiv.replaceChild(newTable, currTable);
    return newTable;
}

// Creates a multiplcation table and appends it to the body of the page.
function createTable(){

    /**
     * Parse each form element value into a Int to avoid manipulating strings.
     */
    const minRows = parseInt(elStartMultiplier.value);
    const maxRows = parseInt(elEndMultiplier.value);
    const minCols = parseInt(elStartMultiplicand.value);
    const maxCols = parseInt(elEndMultiplicand.value);

    // Create a table element and set it an id.
    let table = document.createElement("table");
    table.setAttribute("id", "multTable");
    // Create a table header for the multiplicands.
    let multiplicandHeader = table.createTHead();
    let multiplicandRow = multiplicandHeader.insertRow();
    multiplicandRow.setAttribute("id", "multiplicandRow");
    /**
     * Create a table body which will consist of the multipliers 
    *   and products.
    * */
    let tableBody = document.createElement("tbody");

    // Create an empty corner in the header.
    let multiplicand = document.createElement("th");
    multiplicand.innerText = ``;
    multiplicandRow.appendChild(multiplicand);

    // Get the number of total columns
    const numOfCols = Math.abs(maxCols- minCols);

    // Get the number of total rows.
    const numOfRows = Math.abs(maxRows - minRows);
    let startingColVal = minCols;

    // i and j will be used for the upcoming for loops.
    let i;
    let j;

    // Create all the table headers based on max. columns.
    for(i = 0; i <= numOfCols; i++) {
        multiplicand = document.createElement("th");
        multiplicand.innerText = `${startingColVal}`;
        multiplicandRow.appendChild(multiplicand);
        startingColVal += 1;
    }

    // Hold the first column value of the row. firstRowCol represents the first multiplier.
    let firstColOfRow = minRows;

    /**
     * Create the table by going through each row and creating a column with the 
     * first column being the multiplier and the rest a product of the multiplier
     * (represented by firstRowOfCol) and multiplicand. 
     */
    for(i = 0; i < numOfRows + 1; i++) {
        let row = tableBody.insertRow();
        for(j = 1; j <= numOfCols + 1; j++) {
            // If j is 1, we are in the first column meaning this column is a multiplier
            if(j == 1){
                let multiplier = document.createElement("th");
                multiplier.innerHTML = `${firstColOfRow}`;
                row.appendChild(multiplier);
            }
            let product = document.createElement("td");
            product.innerHTML = `${row.cells[0].innerText * multiplicandRow.cells[j].innerText}`;
            row.appendChild(product);
        }
        // Increment currRow. This increment represents the next multiplier.
        firstColOfRow++;                   
    }

    // Append the table body to the table.
    table.appendChild(tableBody);

    /**
     * If the currTable is undefined, then a table doesn't currently exist. Therefore, append the table to the body of the page.
     * If the currTable is not undefined, then replace the currTable with the newly created table by calling the function
     * replaceTable. 
     */
    if(currTable === undefined){
        currTable = tableDiv.appendChild(table);
    } else {
        currTable = replaceTable(table);
    }

    //console.log(table);
}

// Validates the user input. 
function validateForm(){
    let startMultiplier = parseInt(elStartMultiplier.value);
    let endMultiplier = parseInt(elEndMultiplier.value);
    let startMultiplicand = parseInt(elStartMultiplicand.value);
    let endMultiplicand = parseInt(elEndMultiplicand.value);
    let error = false;
    let swapped = false;

    document.getElementById("alertMessage").style.display = "none";

    /**
     *  Check if user inputted a non-number. If so, display an alert message by calling displayAlertMessage().
     *  Also, check if user inputted a number that is out of the (-50, 50) range.
     */
    if(Number.isNaN(startMultiplier) || Number.isNaN(endMultiplier)|| Number.isNaN(startMultiplicand) || Number.isNaN(endMultiplicand)){
        error = true;
        document.getElementById("alertMessage").style.display = "block";
        document.getElementById("alertMessage").innerHTML = "Please enter numbers only.";

    } else if (startMultiplier < -50 || endMultiplier > 50 || startMultiplicand < -50 || endMultiplicand > 50){
        error = true;
        document.getElementById("alertMessage").style.display = "block";
        document.getElementById("alertMessage").innerHTML = 
            "One of the inputs has exceeded the range: -50 to 50.";
    } 

    let temp;
    // Exchange starting and ending values if start values are greater than end values.
    if(startMultiplier > endMultiplier){
        temp = startMultiplier;
        elStartMultiplier.value = endMultiplier;
        elEndMultiplier.value= temp;
        swapped = true;
    }

    if(startMultiplicand > endMultiplicand){
        temp = startMultiplicand;
        elStartMultiplicand.value = endMultiplicand;
        elEndMultiplicand.value = temp;
        swapped = true;
    }

    if(swapped){
        document.getElementById("alertMessage").style.display = "block";
        document.getElementById("alertMessage").innerHTML = 
            "Swapped input values to meet fulfill requirements";
    }

    // If no input errors are detected, create the table.
    if(error === false){
        createTable();
    }
}

// Even listener that listens to genTableBttn click and calls validateForm().
genTableBttn.addEventListener("click", validateForm);
