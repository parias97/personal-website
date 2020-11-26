/*
      Name: Peter Arias
      Email: peter_arias@student.uml.edu
      Affiliation: Student at UMass Lowell in 91.61 GUI Programming I
      Date: 11/26/2020
      Description: Using the jQuery UI Slider and Tab Widgets
      91.461 Assignment: Assignment No. 7
*/

$(document).ready(function() {

  let tabCounter = 0;

  /*$("#closeMultTabs").on("click", function () {
    closeMultipleTabs();
  })*/

  // Get table values from form and display them in the tab in the format: {X,Y}, {X,Y}.
  function getValsInFormat(){
      let tableParam = getTableParameters();
      multiplierX = tableParam[0];
      multiplierY = tableParam[1];
      multiplicandX = tableParam[2];
      multiplicandY = tableParam[3];
      let tableVals = "{" + multiplierX + ", " + multiplierY + "}, {" + multiplicandX + ", " + multiplicandY + "}";
      return tableVals;
  }

  /* Close selected tabs. WORK IN PROGRESS.
  function closeMultipleTabs(){
    let numOfTabs = $("#tabs ul > li").length;
    let tabItems = $("#tabs ul > li");
    tabItems.each(function(idx, li){
      if($(li).find("input").is(":checked")){
        $(li).remove();
        console.log("index: " + idx);
        $("#tabs-" + idx ).remove();
      }
    });

    if(numOfTabs == 0){
      $("#tabs").hide();
    }
  } */

  // Close all created tabs.
  function closeAllTabs(){
    let tabItems = $("#tabs ul > li")
    tabItems.each(function(idx, li){
        $(li).remove();
        $("#tabs-" + idx ).remove();
    });
    tabCounter = 0;
    $("#tabs").hide();
  }

  $("#closeAllTabs").on("click", function () {
    closeAllTabs();
  })

  /* Source for the following functions: https://jqueryui.com/tabs/#manipulation
   * The following function saves the table into tabs.
   */
  $( function() {
    let tabTemplate = "<li role=\"tab\"><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
    //let tabTemplate = "<li role=\"tab\"><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span><input type=\"checkbox\"></li>";

    let tabs = $( "#tabs" ).tabs({
      "ui-tabs-tab": "ui-corner-all"
    });

    // Actual addTab function: adds new tab using the input from the form aboveS
    function addTab() {
        let numOfTabs = $("#tabs ul > li")

        if(numOfTabs == 0) {
          $("#tabs").show();
        }

        let label = getValsInFormat(),
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ));
        tabs.find( ".ui-tabs-nav" ).append( li );
        let tabContent = getTable();
        let tabContentHtml = "<div id=\"" + id + "\"class=\"container multTable\">" + tabContent.innerHTML + "</div>";
        tabs.append(tabContentHtml);
        tabs.tabs("refresh");
        tabCounter++;
    }

    // Save table into tab upon button click.
    $("#saveTableBttn")
      .button()
      .on( "click", function() {
        if( $("#inputForm").valid() == true ) {
          if($("#tabs").is(":hidden")){
            $("#tabs").show();
          }
          // Give time to swap values if needed before adding tab.
          setTimeout(function(){
              addTab();
              $("#tabs").show();
            },100);
          }
      });
 
    // Remove a tab on click of the close icon.
    tabs.on( "click", "span.ui-icon-close", function() {
      var panelId = $(this).closest("li").remove().attr("aria-controls");
      $("#" + panelId ).remove();
      tabs.tabs("refresh");
    });
    
    // Remove tab using alt+backspace.
    tabs.on( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
        $("#" + panelId ).remove();
        tabs.tabs("refresh");
      }
    });
  } );
});