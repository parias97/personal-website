/*
      Name: Peter Arias
      Email: peter_arias@student.uml.edu
      Affiliation: Student at UMass Lowell in 91.61 GUI Programming I
      Date: 11/26/2020
      Description: Using the jQuery UI Slider and Tab Widgets
      91.461 Assignment: Assignment No. 7
*/

$(document).ready(function() {

    // Check if input is a whole number.
    $.validator.addMethod("wholeNumber", function(value){
        if((value % 1) == 0){
            return true;
        }else {
            return false;
        };
    });

    var inputForm = document.getElementById("inputForm");
    // Initialize form validation on the input form
    $(inputForm).validate({
        // Rules object. Each input must follow the following rules.
        rules: {
            startMultiplier: {
                required: true,
                number: true,
                max: 50,
                min: -50,
                wholeNumber: true
            },
            endMultiplier: {
                required: true,
                number: true,
                max: 50,
                min: -50,
                wholeNumber: true

            },
            startMultiplicand: {
                required: true,
                number: true,
                max: 50,
                min: -50,
                wholeNumber: true

            },
            endMultiplicand: {
                required: true,
                number: true,
                max: 50,
                min: -50,
                wholeNumber: true
            }
        },

        // Messages object. If rules are not being followed, display message.
        messages: {
            startMultiplier: {
                required: "Please enter a starting multiplier",
                number: "Please only enter numbers",
                max: "Please enter a number less than 50",
                min: "Please enter a number greater than -50",
                wholeNumber: "Please enter a whole number"
            },
            endMultiplier: {
                required: "Please enter an ending multiplier",
                number: "Please only enter numbers",
                max: "Please enter a number less than 50",
                min: "Please enter a number greater than -50",
                wholeNumber: "Please enter a whole number"
            },
            startMultiplicand:{
               required: "Please enter a starting multiplicand",
               number: "Please only enter numbers",
               max: "Please enter a number less than 50",
               min: "Please enter a number greater than -50",
               wholeNumber: "Please enter a whole number"

            },
            endMultiplicand: {
                required: "Please enter an ending multiplicand",
                number: "Please only enter numbers",
                max: "Please enter a number less than 50",
                min: "Please enter a number greater than -50",
                wholeNumber: "Please enter a whole number"
            }
        },
        /* errorPlacement object. Place error message below the input field.
         * Source: https://stackoverflow.com/questions/4032865/jquery-how-to-use-errorplacement-for-a-specific-element
         */
        errorPlacement: function (errorMessage, element) {
            errorMessage.addClass("errorMessage");
            errorMessage.insertAfter(element);
        }
    });
});