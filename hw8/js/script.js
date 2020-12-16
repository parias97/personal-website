
/*  Name: Peter Arias
    Email: peter_arias@student.uml.edu
    Affiliation: Student at UMass Lowell in 91.61 GUI Programming I
    Date: 12/15/2020
    Description: Implementing a Bit of Scrabble with Drag-and-Drop
    91.461 Assignment: Assignment #8 */

"use strict";

var scrabbleBoard = {};
var lettersOnBoard = [];
var remainingLetters = 100;
var tilesOnBoard = 0;
var tileNum = 0;
var totalScore = 0;


// Source: https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
var ScrabbleTiles = [] ;
ScrabbleTiles["a"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "image" : "images/scrabble/a.jpg" } ;
ScrabbleTiles["b"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/b.jpg"  } ;
ScrabbleTiles["c"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/c.jpg"  } ;
ScrabbleTiles["d"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "images/scrabble/d.jpg"  } ;
ScrabbleTiles["e"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "image" : "images/scrabble/e.jpg" } ;
ScrabbleTiles["f"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/f.jpg"  } ;
ScrabbleTiles["g"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3, "image" : "images/scrabble/g.jpg"  } ;
ScrabbleTiles["h"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/h.jpg"  } ;
ScrabbleTiles["i"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9, "image" : "images/scrabble/i.jpg"  } ;
ScrabbleTiles["j"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/scrabble/j.jpg"  } ;
ScrabbleTiles["k"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/scrabble/k.jpg"  } ;
ScrabbleTiles["l"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "images/scrabble/l.jpg"  } ;
ScrabbleTiles["m"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/m.jpg"  } ;
ScrabbleTiles["n"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "images/scrabble/n.jpg"  } ;
ScrabbleTiles["o"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8, "image" : "images/scrabble/o.jpg"  } ;
ScrabbleTiles["p"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/p.jpg"  } ;
ScrabbleTiles["q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/scrabble/q.jpg"  } ;
ScrabbleTiles["r"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "images/scrabble/r.jpg"  } ;
ScrabbleTiles["s"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "images/scrabble/s.jpg"  } ;
ScrabbleTiles["t"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6, "image" : "images/scrabble/t.jpg"  } ;
ScrabbleTiles["u"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4, "image" : "images/scrabble/u.jpg"  } ;
ScrabbleTiles["v"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/v.jpg"  } ;
ScrabbleTiles["w"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/w.jpg"  } ;
ScrabbleTiles["x"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/scrabble/x.jpg"  } ;
ScrabbleTiles["y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/y.jpg"  } ;
ScrabbleTiles["z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1, "image" : "images/scrabble/z.jpg"  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2, "image" : "images/scrabble/_.jpg"  } ;

// Single row for the board. Special -> double points for word/letter.
scrabbleBoard.boardSlots = [];
scrabbleBoard.boardSlots[0] = { "slotNum": 0, "letterMultiplier":1, "wordMultiplier":1, "special":false, "image":"images/scrabble/blank_square.jpg" };
scrabbleBoard.boardSlots[1] = { "slotNum": 1, "letterMultiplier":1, "wordMultiplier":1,"special":false, "image":"images/scrabble/blank_square.jpg" };
scrabbleBoard.boardSlots[2] = { "slotNum": 2,"letterMultiplier":2, "wordMultiplier":1,"special":true, "image":"images/scrabble/double_letter_score.jpg" };
scrabbleBoard.boardSlots[3] = { "slotNum": 3,"letterMultiplier":1, "wordMultiplier":1,"special":false, "image":"images/scrabble/blank_square.jpg" };
scrabbleBoard.boardSlots[4] = { "slotNum": 4,"letterMultiplier":1, "wordMultiplier":1,"special":false, "image":"images/scrabble/blank_square.jpg" };
scrabbleBoard.boardSlots[5] = { "slotNum": 5,"letterMultiplier":1, "wordMultiplier":2,"special":true, "image":"images/scrabble/double_word_score.jpg" };
scrabbleBoard.boardSlots[6] = { "slotNum": 6,"letterMultiplier":1, "wordMultiplier":1,"special":false, "image":"images/scrabble/blank_square.jpg" };
scrabbleBoard.boardSlots[7] = { "slotNum": 7,"letterMultiplier":1, "wordMultiplier":1,"special":false, "image":"images/scrabble/blank_square.jpg" };

// Get the number of keys to associate with the number of columns for the board.
scrabbleBoard.cols = scrabbleBoard.boardSlots.length;

// Source: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max-min) + min);
}

// Make each image in the rack div draggable. If the image is not snapped onto a board slot, 
// it's reverted back to the rack.
function makeRackTilesDraggable() {
  $("#rack > img").draggable({
    containment: "#content",
    snapTolerance: "20",
    cursor: "move",
    revert: "invalid",
    revertDuration: 400
  });
}

// Make each slot in the board droppable.
function makeBoardSlotsDroppable(){
  $("#board > div").droppable({
    accept: function(){
      let boardSlot = $(this);
      let boardSlotNum = boardSlot.attr("id").split("-")[1];
      // Check if slot is empty and is a subsequent tile
      if($(this).find("img").length == 0 && checkIfTileIsSubsequent(boardSlotNum)){
        return true;
      } else {
        // don't accept and move tile back to rack
        return false
      }
    },
    drop: function(event, ui) {
      let boardSlot = $(this);
      // Retrieves the slot number from the id.
      let boardSlotNum = boardSlot.attr("id").split("-")[1];
      let tileLetter;
      // Manually append the element and reset positioning
      boardSlot.append(ui.draggable.css({
        top: 5,
        left: 2
      }));

      ui.draggable.draggable({ disabled: true});
      // Retrieves the letter from the src link of the image tag. Ex: "a" from "a.jpg".
      tileLetter = $(ui.draggable).attr("src").replace("images/scrabble/", "").split(".")[0];
      tilesOnBoard++;

      // Pushes an object containing the letter of the tile and the slot it was placed on.
      lettersOnBoard.push({ "letter": tileLetter, "boardSlotNum": boardSlotNum });
      $("#word").append(tileLetter);

      console.log("letter " + tileLetter + " on slot " + boardSlotNum);
    }
  });
}

// Counts the number of tiles currently on rack and subtracts that number from 7 
// to get enough tiles to fill rack.
function addTilesToRack(){
  $("#rack").append(function(){
    let newTile, tileLetter;
    let rack = $("#rack");
    let numOfCurrentRackTiles = rack.find("img").length;
    let tiles = scrabbleBoard.getTilesFromBag(7 - numOfCurrentRackTiles);

    for(var i = 0; i < tiles.length; i++){
      tileLetter = tiles[i]
      newTile = $("<img id=\"tile-" + tileNum++ + "\" class= \"tile\" src=\"" + ScrabbleTiles[tileLetter].image + "\")</img>)");
      rack.append(newTile);
    }
    makeRackTilesDraggable();
  })
}

// Check if tile being dragged to a slot is a subsequent tile.
function checkIfTileIsSubsequent(boardSlotNum) {
  let isSubsequent = true;
  let currentBoardSlot = $("#boardSlot-" + boardSlotNum);
  let previousBoardSlot = $("#boardSlot-" + boardSlotNum).prev();
  let nextBoardSlot = $("#boardSlot-" + boardSlotNum).next();

  // for debugging:
  console.log("prev boardslot: " + currentBoardSlot.prev().attr("id"));
  console.log("next boardslot: " + currentBoardSlot.next().attr("id"));

  /* Checks if the tile being placed on the board is a subsequent tile. To check this,
    both left and right slots of the slot the user is attempting to drop the tile, is checked
    for content. If both left and right slots are empty, then we assume that it's the first tile
    on the board. If the left tile is empty and the right is not, then the tile can be dropped. If
    the right tile is empty and left is not, the tile is also accepted. */
  if(lettersOnBoard.length == 0){
    return isSubsequent;
  } else if(previousBoardSlot.contents().length === 0  && nextBoardSlot.contents().length === 0){
    isSubsequent = false;
    return isSubsequent;
  } else if (previousBoardSlot.contents().length === 0 && nextBoardSlot.contents().length > 0 ) {
    return isSubsequent;
  } else if (previousBoardSlot.contents().length > 0 && nextBoardSlot.contents().length === 0) {
    return isSubsequent;
  } else {
    return false;
  }
}

// Create the board for the tiles.
scrabbleBoard.generateBoard = function () {
  var boardSlot, tileImage;

  for (var i = 0; i < scrabbleBoard.cols; i++) {
    tileImage = scrabbleBoard.boardSlots[i].image;
    boardSlot = $("<div id= \"boardSlot-" + i + "\" class=\"boardSlot\" style=\"background-image: url(" + tileImage + ")\"></div>");
    $("#board").append(boardSlot);
    makeBoardSlotsDroppable();
  }
}

// Create the rack for the tiles.
scrabbleBoard.generateRack = function() {
  let rack = $("#rack");
  let rackTiles = [];
  let tileLetter;

  // Returns an array of 7 tiles from the available tiles to setup the rack.
  rackTiles = scrabbleBoard.getTilesFromBag(7);
  $("#remainingLetters").text(remainingLetters);

  /* Appends to the rack the 7 tiles. The image of each tile is retrieved 
     by making the letter of the returned tiles the key to the ScrabbleTiles array. */
  for(var i = 0; i < rackTiles.length; i++){
    tileLetter = rackTiles[i];
    let newTile = $("<img id=\"tile-" + tileNum++ + "\" class= \"tile\" src=\"" + ScrabbleTiles[tileLetter].image + "\")</img>)");
    rack.append(newTile);
  }
  // Makes the append tile images draggable.
  makeRackTilesDraggable();
}

// Returns a list of specified amount of random tiles.
scrabbleBoard.getTilesFromBag = function (numOfTiles) {
  let rackTiles = [];
  let availableTiles = [];
  let tilesRemainingForLetter;

  for(var tile in ScrabbleTiles){
    tilesRemainingForLetter = ScrabbleTiles[tile]["number-remaining"]
    if(tilesRemainingForLetter > 0){
      //console.log("number remaining for letter " + tile + " is " + ScrabbleTiles[tile]["number-remaining"]);
      availableTiles.push(tile);
    } else {
      // console.log("ran out of \"" + tile + "\" tiles");
    }
  }

  for(var i = 0; i < numOfTiles; i++){
    let randIndex = getRandomNumber(0, availableTiles.length);
    let randLetter = availableTiles[randIndex];
    tilesRemainingForLetter = ScrabbleTiles[randLetter]["number-remaining"]
    rackTiles.push(randLetter);
    ScrabbleTiles[randLetter]["number-remaining"] = --tilesRemainingForLetter;
  }

  remainingLetters -= rackTiles.length;

  return rackTiles;
}

/* Returns score by adding all the values of the tiles on the board taking into account the special slots
   multipliers. */
   scrabbleBoard.getScore = function(){

    let tileLetter, tileLetterValue, slotNum;
    let wordScore = 0;
  
    /* For each letter (object) in the lettersOnBoard, the values of both the letter and the slot number 
       it resides on is retrieved.   */
    for(var letter of lettersOnBoard ){
      //console.log("letter: " + letter.letter + " slot number: " + letter.boardSlotNum);
      tileLetter = letter.letter;
      slotNum = letter.boardSlotNum;
      tileLetterValue = ScrabbleTiles[tileLetter].value;
  
      if(scrabbleBoard.boardSlots[slotNum].special){
        if(scrabbleBoard.boardSlots[slotNum].letterMultiplier > 1){
          wordScore += tileLetterValue * scrabbleBoard.boardSlots[slotNum].letterMultiplier;
        } else if(scrabbleBoard.boardSlots[slotNum].wordMultiplier > 1){
          wordScore += tileLetterValue;
          wordScore =  wordScore * scrabbleBoard.boardSlots[slotNum].wordMultiplier;
        }
      } else {
        wordScore += tileLetterValue;
      }
    }
    totalScore += wordScore;
    $("#score").text(totalScore)
  }

// Removes each image from each boardSlot div.
scrabbleBoard.removeTilesFromBoard = function () {
  tilesOnBoard = 0;
  for(var letter of lettersOnBoard){
    $("#boardSlot-" + letter.boardSlotNum).empty();
  }
}

// Resets the game.
scrabbleBoard.reset = function() {
  scrabbleBoard.getScore();
  scrabbleBoard.removeTilesFromBoard();
  addTilesToRack();
  lettersOnBoard = [];
  $("#remainingLetters").text(remainingLetters);
  $("#word").empty();
}


// Generates the starting Scrabble board.
scrabbleBoard.generateBoard();
// Generates the starting rack with 7 tiles.
scrabbleBoard.generateRack();

// Reloads the page to restart the game.
$("#newGameButton").click(function() {
  location.reload();
})

// Resets current score, word, and updates remaining tiles.
$("#submitButton").click(function() {
  scrabbleBoard.reset();
});