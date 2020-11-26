/*
      Name: Peter Arias
      Email: peter_arias@student.uml.edu
      Affiliation: Student at UMass Lowell in 91.61 GUI Programming I
      Date: 11/26/2020
      Description: Using the jQuery UI Slider and Tab Widgets
      91.461 Assignment: Assignment No. 7
*/

const formRef = document.forms.inputForm;
const elStartMultiplier = formRef.elements.startMultiplier;
const elEndMultiplier = formRef.elements.endMultiplier;
const elStartMultiplicand = formRef.elements.startMultiplicand;
const elEndMultiplicand = formRef.elements.endMultiplicand;
const tableDiv = document.getElementById("dynamicTableDiv");
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
    const minRows = Number(elStartMultiplier.value);
    const maxRows = Number(elEndMultiplier.value);
    const minCols = Number(elStartMultiplicand.value);
    const maxCols = Number(elEndMultiplicand.value);

    // Create a table element and set it an id.
    let table = document.createElement("table");
    table.setAttribute("class", "multTable");
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
    multiplicand.innerText = "X";
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
        console.log("test");
        currTable = tableDiv.appendChild(table);
    } else {
        currTable = replaceTable(table);
    }
}

// Validates the user input. 
function checkForSwap(){
    let startMultiplier = Number(elStartMultiplier.value);
    let endMultiplier = Number(elEndMultiplier.value);
    let startMultiplicand = Number(elStartMultiplicand.value);
    let endMultiplicand = Number(elEndMultiplicand.value);
    let swapped = false;

    let temp;
    // Exchange starting and ending values if start values are greater than end values.
    if(startMultiplier > endMultiplier){
        temp = startMultiplier;
        elStartMultiplier.value = endMultiplier;
        elEndMultiplier.value = temp;
        swapped = true;
    }

    if(startMultiplicand > endMultiplicand){
        temp = startMultiplicand;
        elStartMultiplicand.value = endMultiplicand;
        elEndMultiplicand.value = temp;
        swapped = true;
    }

    if(swapped){
        // Show an alert message that fades after 3 seconds
        $("<div class = \"col-sm-6 offset-sm-2 alert alert-danger\">Ending value must be greater than starting value. Values swapped.</div>")
        .insertAfter("#inputForm")
        .delay(3000)
        .fadeOut(function() {
            $(this).remove();
        });
    }
}

// Returns the container for the created table.
function getTable(){
    // Create a table element and set it an id.
    let tempDiv = document.createElement("div");
    let tableClone = currTable.cloneNode(true);
    tempDiv.setAttribute("class", "container");
    tempDiv.appendChild(tableClone);
    console.log(tempDiv);
    return tempDiv;
}

// Returns the parameters of the table.
function getTableParameters(){
    let startMultiplier = Number(elStartMultiplier.value);
    let endMultiplier = Number(elEndMultiplier.value);
    let startMultiplicand = Number(elStartMultiplicand.value);
    let endMultiplicand = Number(elEndMultiplicand.value);

    return [startMultiplier, endMultiplier, startMultiplicand, endMultiplicand];
}

// Called when form values change to recreate table.
function autoSubmit() {
    // If the form is valid
    if( $("#inputForm").valid() == true ) {
        // Then make it submit, which should update the tab in the process.
        checkForSwap();
        createTable();
        $("inputForm").submit();

    }
}




