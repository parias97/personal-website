/*
      Name: Peter Arias
      Email: peter_arias@student.uml.edu
      Affiliation: Student at UMass Lowell in 91.61 GUI Programming I
      Date: 11/26/2020
      Description: Using the jQuery UI Slider and Tab Widgets
      91.461 Assignment: Assignment No. 7
*/

$(document).ready(function() {

    /* Source for slider: https://jqueryui.com/slider/
    *  Source for two way binding: https://infoheap.com/jquery-ui-slider-and-input-text-box-two-way-binding/
    */
    $( function() {
        $("#sliderStartMultiplier").slider({
            orientation: "horizontal",
            min: -50, 
            max: 50,
            animate: true,
            change: function() {
                // Get the current value of the slider handle.
                var value = $("#sliderStartMultiplier").slider("option", "value");
                // Find the element with the handle class and add the value to it.
                $(this).find(".ui-slider-handle").text(value);
                // Bind the current handle value to the input field.
                $("#startMultiplier").val(value);
                autoSubmit();
            },
            // Updates the value of the handle as the slider moves.
            slide: function() {
                var value = $("#sliderStartMultiplier").slider("option", "value");
                $("#sliderStartMultiplier").find(".ui-slider-handle").text(value);
            }
        });
    });

    $( function() {
        $("#sliderEndMultiplier").slider({
            orientation: "horizontal",
            min: -50, 
            max: 50,
            animate: true,
            change: function() {
                // Get the current value of the slider handle.
                var value = $("#sliderEndMultiplier").slider("option", "value");
                // Find the element with the handle class and add the value to it.
                $(this).find(".ui-slider-handle").text(value);
                // Bind the current handle value to the input field.
                $("#endMultiplier").val(value);
                autoSubmit();
            },
            // Updates the value of the handle as the slider moves.
            slide: function() {
                var value = $("#sliderEndMultiplier").slider("option", "value");
                $("#sliderEndMultiplier").find(".ui-slider-handle").text(value);
            }
        });
    });

    $( function() {
        $("#sliderStartMultiplicand").slider({
            orientation: "horizontal",
            min: -50, 
            max: 50,
            animate: true,
            change: function() {
                // Get the current value of the slider handle.
                var value = $("#sliderStartMultiplicand").slider("option", "value");
                // Find the element with the handle class and add the value to it.
                $(this).find(".ui-slider-handle").text(value);
                // Bind the current handle value to the input field.
                $("#startMultiplicand").val(value);
                autoSubmit();
            },
            // Updates the value of the handle as the slider moves.
            slide: function() {
                var value = $("#sliderStartMultiplicand").slider("option", "value");
                //sliderValStartMultiplicand = value;
                $("#sliderStartMultiplicand").find(".ui-slider-handle").text(value);
            }
        });
    });

    $( function() {
        $("#sliderEndMultiplicand").slider({
            orientation: "horizontal",
            min: -50, 
            max: 50,
            animate: true,
            change: function() {
                // Get the current value of the slider handle.
                var value = $("#sliderEndMultiplicand").slider("option", "value");
                // Find the element with the handle class and add the value to it.
                $(this).find(".ui-slider-handle").text(value);
                // Bind the current handle value to the input field.
                $("#endMultiplicand").val(value);
                autoSubmit();
            },
            // Updates the value of the handle as the slider moves.
            slide: function() {
                var value = $("#sliderEndMultiplicand").slider("option", "value");
                $(this).find(".ui-slider-handle").text(value);         
            }
        });
    });

    // If value of input fields change, also change the value of slider with the corresponding input value.
    $("#startMultiplier").change( function(){
        // Get the current value of starting multiplier input field.
        var startMultiplierVal = $("#startMultiplier").val();
        // Find the element with the handle class and add the value to it.
        $("#sliderStartMultiplier").find(".ui-slider-handle").text(startMultiplierVal);
        $("#sliderStartMultiplier").slider({
            value: startMultiplierVal
        })

    });

    $("#endMultiplier").change( function(){
        // Get the current value of ending multiplier input field.
        var endMultiplierVal = $("#endMultiplier").val();
        // Find the element with the handle class and add the value to it.
        $("#sliderEndMultiplier").find(".ui-slider-handle").text(endMultiplierVal);
        $("#sliderEndMultiplier").slider({
            value: endMultiplierVal
        })
    });

    $("#startMultiplicand").change( function(){
        // Get the current value of starting multiplicand input field.
        var startMultiplicandVal = $("#startMultiplicand").val();
        // Find the element with the handle class and add the value to it.
        $("#sliderStartMultiplicand").find(".ui-slider-handle").text(startMultiplicandVal);
        $("#sliderStartMultiplicand").slider({
            value: startMultiplicandVal
        })
    });

    $("#endMultiplicand").change( function(){
        // Get the current value of ending multiplicand input field.
        var endMultiplicandVal = $("#endMultiplicand").val();
        // Find the element with the handle class and add the value to it.
        $("#sliderEndMultiplicand").find(".ui-slider-handle").text(endMultiplicandVal);
        $("#sliderEndMultiplicand").slider({
            value: endMultiplicandVal
        })
    });
});

