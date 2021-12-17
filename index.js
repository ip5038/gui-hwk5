// <!-- File: index.html  -->
// <!-- GUI Assignment: Create scrabble game online.  -->
// <!-- Ishan Patel, Umass Lowell Computer Science, -->
// <!-- ishankumar_patel@student.uml.edu -->
// <!-- Copyright (c) 2021 by Ishan. All rights reserved. May be freely copied or excerpted for educational  -->
// <!-- purposes with credit to Ishan.  -->
// <!-- Updated on  12/16/2021 -->
// <!--  -->

// Tile data structure to track each letter
class Tile {
    image = "";
    value = 0;
    origCount = 0;
    count = 0;
    letter = ""
    constructor(ltr, image, value, origCount, count) {
        this.image = image;
        this.value = value;
        this.origCount = origCount
        this.count = count;
        this.letter = ltr;
    }
}

var tile_A = new Tile("a", "Scrabble_Tiles/Scrabble_Tile_A.jpg", 1, 9, 9);
var tile_B = new Tile("b","Scrabble_Tiles/Scrabble_Tile_B.jpg", 3, 2, 2);
var tile_C = new Tile("c","Scrabble_Tiles/Scrabble_Tile_C.jpg", 3, 2, 2);
var tile_D = new Tile("d","Scrabble_Tiles/Scrabble_Tile_D.jpg", 2, 4, 4);
var tile_E = new Tile("e","Scrabble_Tiles/Scrabble_Tile_E.jpg", 1, 12, 12);
var tile_F = new Tile("f","Scrabble_Tiles/Scrabble_Tile_F.jpg", 4, 2, 2);
var tile_G = new Tile("g","Scrabble_Tiles/Scrabble_Tile_G.jpg", 2, 3, 3);
var tile_H = new Tile("h","Scrabble_Tiles/Scrabble_Tile_H.jpg", 4, 2, 2);
var tile_I = new Tile("i","Scrabble_Tiles/Scrabble_Tile_I.jpg", 1, 9, 9);
var tile_J = new Tile("j","Scrabble_Tiles/Scrabble_Tile_J.jpg", 8, 1, 1);
var tile_K = new Tile("k","Scrabble_Tiles/Scrabble_Tile_K.jpg", 5, 1, 1);
var tile_L = new Tile("l","Scrabble_Tiles/Scrabble_Tile_L.jpg", 1, 4, 4);
var tile_M = new Tile("m","Scrabble_Tiles/Scrabble_Tile_M.jpg", 3, 2, 2);
var tile_N = new Tile("n","Scrabble_Tiles/Scrabble_Tile_N.jpg", 1, 6, 6);
var tile_O = new Tile("o","Scrabble_Tiles/Scrabble_Tile_O.jpg", 1, 8, 8);
var tile_P = new Tile("p","Scrabble_Tiles/Scrabble_Tile_P.jpg", 3, 2, 2);
var tile_Q = new Tile("q","Scrabble_Tiles/Scrabble_Tile_Q.jpg", 10, 1, 1);
var tile_R = new Tile("r","Scrabble_Tiles/Scrabble_Tile_R.jpg", 1, 6, 6);
var tile_S = new Tile("s","Scrabble_Tiles/Scrabble_Tile_S.jpg", 1, 4, 4);
var tile_T = new Tile("t","Scrabble_Tiles/Scrabble_Tile_T.jpg", 1, 6, 6);
var tile_U = new Tile("u","Scrabble_Tiles/Scrabble_Tile_U.jpg", 1, 4, 4);
var tile_V = new Tile("v","Scrabble_Tiles/Scrabble_Tile_V.jpg", 4, 2, 2);
var tile_W = new Tile("w","Scrabble_Tiles/Scrabble_Tile_W.jpg", 4, 2, 2);
var tile_X = new Tile("x","Scrabble_Tiles/Scrabble_Tile_X.jpg", 8, 1, 1);
var tile_Y = new Tile("y","Scrabble_Tiles/Scrabble_Tile_Y.jpg", 4, 2, 2);
var tile_Z = new Tile("z","Scrabble_Tiles/Scrabble_Tile_Z.jpg", 10, 1, 1);
var tile_ =  new Tile("Blank","Scrabble_Tiles/Scrabble_Tile_Blank.jpg", 0, 2, 2);

// Track which letters are put on the board
var chosenLetters = [-1, -1, -1, -1, -1, -1, -1];
var availableLetters = [-1, -1, -1, -1, -1, -1, -1];
                //in1, in2, in3 ... in7 then lt1, lt2, lt3 ... lt7
var boxStatus = [0, 0, 0, 0, 0, 0, 0,              1, 1, 1, 1, 1, 1, 1]; // Track which divs have lettes on them. 0 means open and 1 means closed. 
                                                                         // You can only drop letters on open divs
var letters = [tile_A, tile_B, tile_C, tile_D, tile_E, tile_F, tile_G, tile_H, tile_I, tile_J, tile_K,
               tile_L, tile_M, tile_N, tile_O, tile_P, tile_Q, tile_R, tile_S, 
               tile_T, tile_U, tile_V, tile_W, tile_X, tile_Y, tile_Z, tile_];
var dragElementID = ""; //ID of element that is being dragged 
var errorMessage = "";
var score = 0;
var highestScore = 0;
var startIndex = -1; //Used to track where the first letter is dropped to only allow subsequent drops

$( document ).ready(function() {
    getRandomLetters();
});

// Generate random letter from the list and only use them if the count > 0
function getRandomLetters() {
    var remainingTiles = 0;
    for(var i = 0; i < letters.length; i++) {
        remainingTiles += letters[i].count;
    }
    //console.log("remaining: " + remainingTiles);

    var foundCount = 0;
    var max = 7;
    if(remainingTiles < 7) {
        max = remainingTiles;
    }

    //console.log('+++ start loop')
    for(var i = 1; i <= max; i++) {
        let num = Math.floor(Math.random() * (27 - 0)); // random letter choosing
        if(letters[num].count >= 1) { // make sure there are letters available
            //console.log("found and set")
            let boxClass = ".letter" + i;
            let urlImg =  "url(" + letters[num].image + ")"
             $(boxClass).css({
                "background-image": urlImg
            })
            $(boxClass).html(letters[num].letter);
            letters[num].count -= 1;

            availableLetters[i-1] = letters[num].letter;
            foundCount += 1;
        } else { // if letter is not avaialbe then search for it again
            if(max >= 7) {
                i--; 
            }               
        }
    }
    //console.log('end loop +++')
}

// Check if the word is valid. Make sure there is atleast 2 letter.
function checkValidWord() {
    var enc_one = false;
    var count = 0;
    
    for(var i = 0; i < 7; i++) {
        if(boxStatus[i] == 1) {
            enc_one = true;
            count++;
            continue;
        } 
        if(boxStatus[i] == 0 && enc_one) {
            break;
        }
    }

    if(count >= 2)
        return true;
    
    errorMessage = "Must have move than 2 letters."
    return false;
}

// Function called when use starts dragging
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    dragElementID = ev.target.id;
}

// Called when user drops a div on to scrabble board or back on the rack
function drop(ev) {
    ev.preventDefault();
    var targetIndex = 0; // index of where the div will be dropped
    var selectedIndex = 0; // index of what div was dragged
    let id = (ev.target.id);
    let targetElm = document.getElementById(id);
    let selectedElm = document.getElementById(dragElementID);
    let selectedLetter = selectedElm.innerHTML;
    var indexOfLetter = 0;

    // Switch case
    targetIndex = getIndexOfDiv(id)
    selectedIndex = getIndexOfDiv(dragElementID)

    // Dont let user move letters on board. They must put the letter back on rack then move back to board
    if(selectedIndex <= 6 && targetIndex <= 6) {
        console.log('first return')
        return;
    }
    
    // Dont let the user put the letter back from the middle of a word to prevent holes in the word
    if(selectedIndex <= 6) {
        if(boxStatus[selectedIndex + 1] == 1 && boxStatus[selectedIndex - 1] == 1) {
            console.log('second return')
            return;
        }
    }

    if(boxStatus[targetIndex] == 0) { // Only let it drop if the box is open
        if(startIndex == -1) { //First letter drop
            startIndex = targetIndex;
            var beforeIndex = 0;
            var afterIndex = 6;
            if(startIndex - 1 >= 0) {
                beforeIndex = startIndex - 1;
            }
            if(startIndex+1 <= 6) {
                afterIndex = startIndex + 1;
            }
            for(var i = 0; i <= 6; i++ ){
                if(i == beforeIndex || i == afterIndex) {

                } else {
                    boxStatus[i] = -1; // box status -1 means that you cannot drop anything on it and there is no letter there
                }
            }

            boxStatus[startIndex] = 1;
        }

        // Update the images on the div that was dragged and the div that was dropped on
        let myIndex = getIndexOfLetter(selectedElm.innerHTML);
        let myURL =  "url(" + letters[myIndex].image + ")"
       
        $("#" + id).css ({
            "background-image": myURL
        })
        $("#" + dragElementID).css({
            "background-image": "none"
        })
    
        // We also want to swap the drag and drop ability of the 2 divs. The div that gets dropped on is now 'draggable' and the div that was dragged becomes 'droppable'
        targetElm.setAttribute("draggable", "true");
        targetElm.setAttribute("ondragstart", "drag(event)");
        targetElm.innerHTML = selectedLetter;
    
        selectedElm.setAttribute("draggable", "false");
        selectedElm.setAttribute("ondrop", "drop(event)");
        selectedElm.setAttribute("ondragover", "allowDrop(event)");
        selectedElm.innerHTML = "";
        boxStatus[targetIndex] = 1;
        boxStatus[selectedIndex] = 0;
       
        indexOfLetter = getIndexOfLetter(targetElm.innerHTML);

        if(targetIndex == selectedIndex + 1 || targetIndex == selectedIndex - 1) {
            console.log('third return')
            return;
        }

        // Score keeping. Check whether the div is dropped on the board or the rack
        if(targetIndex <= 6) {
            if(selectedIndex > 6) { // Dragging from rack to board
                if(id == 'in2' || id == 'in5') { // double score for dropping on blue bordered divs
                    score += (2*(letters[indexOfLetter].value))
                } else {
                    score += letters[indexOfLetter].value;
                }
                chosenLetters[targetIndex] = letters[indexOfLetter];
            } else {
                if(selectedIndex == 1 || selectedIndex == 4) {
                    if(targetIndex != 1 || targetIndex != 4) {
                        score -= letters[indexOfLetter].value;
                    }
                    chosenLetters[selectedIndex] = -1;
                    chosenLetters[targetIndex] = letters[indexOfLetter];
                } else {
                    if(targetIndex == 1 || targetIndex == 4) {
                        score += letters[indexOfLetter].value;
                    }
                    chosenLetters[selectedIndex] = -1;
                    chosenLetters[targetIndex] = letters[indexOfLetter];
                }
            }

            // Open the box beore and after the dropped box
            if(boxStatus[targetIndex + 1] == -1){
                boxStatus[targetIndex + 1] = 0;  
            }
            if(boxStatus[targetIndex - 1] == -1) {
                boxStatus[targetIndex - 1] = 0;
            }          

        } else { // Put the letter back on rack
            chosenLetters[selectedIndex] = -1;
            if(dragElementID == 'in2' || dragElementID == 'in5') {
                score -= (2*(letters[indexOfLetter].value))
            } else {
                score -= letters[indexOfLetter].value;
            }

            // Close the box before and after the dragged 
            if(selectedIndex + 1 <= 6) {
                if(boxStatus[selectedIndex + 1] == 0){
                    boxStatus[selectedIndex + 1] = -1;  
                }
            }
            if(boxStatus[selectedIndex - 1] == 0) {
                boxStatus[selectedIndex - 1] = -1;
            }          
        }
    }
    console.log('box status: ' + boxStatus)
    // Show word on screen as its being built
    let myWord = ""
    for(var i = 0; i < chosenLetters.length; i++) {       
        if(chosenLetters[i] != -1) {
            myWord += chosenLetters[i].letter;
        }
    }
    document.getElementById("word").innerHTML = "Word: " + myWord

    // Validate word and only show score/ word if its valid
    if(checkValidWord()) {       
        document.getElementById("errMsg").innerHTML = ""
        document.getElementById("score").innerHTML = "Score: " + score;
        document.getElementById("play").disabled = false
    } else {
        document.getElementById("errMsg").innerHTML = errorMessage
        document.getElementById("score").innerHTML = "Score: error";
        document.getElementById("word").innerHTML = "Word: error";
        document.getElementById("play").disabled = true
    }

    // If no lettters on baord then user can drop the letters on any box to start off with
    var allClear = true;
    for(var i = 7; i <= 14; i++) {
        if(boxStatus[i] == 0) {
            allClear = false;
            break;
        }
    }
    if(allClear) {
        boxStatus = [0, 0, 0, 0, 0, 0, 0,              1, 1, 1, 1, 1, 1, 1];
        startIndex = -1;
    }
}   

function allowDrop(ev) {
    ev.preventDefault();
}

// Return the index of the given letter to use for array lookup
function getIndexOfLetter(letter) { 
    letter = letter.toLowerCase();
 
    if(letter == 'a') {
        return 0;
    } else if(letter == 'b') {
        return 1;
    } else if(letter == 'c') {
        return 2;
    } else if(letter == 'd') {
        return 3;
    } else if(letter == 'e') {
        return 4;
    } else if(letter == 'f') {
        return 5;
    } else if(letter == 'g') {
        return 6;
    } else if(letter == 'h') { 
        return 7;
    } else if(letter == 'i') {
        return 8;
    } else if(letter == 'j') {
        return 9; 
    } else if(letter == 'k') {
        return 10;
    } else if(letter == 'l') {
        return 11;
    } else if(letter == 'm') {
        return 12;
    } else if(letter == 'n') {
        return 13;
    } else if(letter == 'o') {
        return 14;
    } else if(letter == 'p') {
        return 15;
    } else if(letter == 'q') {
        return 16;
    } else if(letter == 'r') {
        return 17;
    } else if(letter == 's') {
        return 18;
    } else if(letter == 't') {
        return 19;
    } else if(letter == 'u') {
        return 20;
    } else if(letter == 'v') {
        return 21;
    } else if(letter == 'w') {
        return 22;
    } else if(letter == 'x') {
        return 23;
    } else if(letter == 'y') {
        return 24;
    } else if(letter == 'z') {
        return 25;
    } else if(letter == 'blank') {
        return 26;
    }
    
    return -1;
}

// Return the index of the given div to use for array lookup
function getIndexOfDiv(theID) {
    if(theID == "in1") {
        return 0;
    } else if(theID == "in2") {
        return 1;
    } else if(theID == "in3") {
        return 2;
    } else if(theID == "in4") {
        return 3;
    } else if(theID == "in5") {
        return 4;
    } else if(theID == "in6") {
        return 5;
    } else if(theID == "in7") {
        return 6;
    } else if(theID == "lt1") {
        return 7;
    } else if(theID == "lt2") {
        return 8;
    } else if(theID == "lt3") {
        return 9;
    } else if(theID == "lt4") {
        return 10;
    } else if(theID == "lt5") {
        return 11;
    } else if(theID == "lt6") {
        return 12;
    } else {
        return 13;
    }
}

// Update score and high score. Clear the table and generate new letters when user clicks on 'Next Word'
function submitPressed() {
    if(highestScore < score) {
        highestScore = score;
    }
    document.getElementById("highestScore").innerHTML = "Highest Score: " + highestScore;

    // Subtract 1 from the count of each used letter
    for(var i = 0; i < chosenLetters.length; i++) {
        if(chosenLetters[i] != -1) {
            //console.log("using: " + chosenLetters[i].letter)
            var found = false;
            for(var j = 0; j <= availableLetters.length; j++) {
                if(availableLetters[j] == chosenLetters[i].letter){
    
                    found = true;
                    availableLetters.splice(j, 1);
                    break;
                }
            } 
        }
    }
   
    var giveBack = 0;
    for(var i = 0; i < availableLetters.length; i++) {
        if(typeof availableLetters[i] === 'string') {
            let indexOfDaLetter = getIndexOfLetter(availableLetters[i]);
            var indexElm = letters[indexOfDaLetter];
            indexElm.count += 1;
            giveBack++;
        }
    }
    //.log("give back: " + giveBack)
    var remainingTiles = 0;
    var totalTiles = 0;
    for(var i = 0; i < letters.length; i++) {
        remainingTiles += letters[i].count;
        totalTiles += letters[i].origCount;
    }
   
    //document.getElementById("remainingTiles").innerHTML = "Remaining Tiles: " + remainingTiles + "/" + totalTiles

    resetBoard()
    getRandomLetters()
}

// Erase the board and get all tiles back. Reset score but keep high score.
function restartPressed() {
    resetBoard();
    score = 0;
    totalTiles = 100;
    remainingTiles = 0;
    for(var i = 0; i < letters.length; i++) {
        var currTile = letters[i];
        letters[i].count = letters[i].origCount;
        remainingTiles += letters[i].count;
    }

   // document.getElementById("remainingTiles").innerHTML = "Remaining Tiles: " + remainingTiles + "/" + totalTiles
    getRandomLetters()
}

// Go through all divs and reset them
function resetBoard() { 
    for(var i = 1; i <= 7; i++ )  {
        let inputDivID = "in" + i
        let letterDivID = "lt" + i
        let currInputDiv = document.getElementById(inputDivID);
        let currLetterDiv = document.getElementById(letterDivID)
        $("#"+inputDivID).css({
            "background-image": "none"
        })
        
        // Make the rack draggable and the board droppable for all divs
        currInputDiv.setAttribute("draggable", "false");
        currInputDiv.setAttribute("ondrop", "drop(event)");
        currInputDiv.setAttribute("ondragover", "allowDrop(event)")
       
        currLetterDiv.setAttribute("draggable", "true");
        currLetterDiv.setAttribute("ondragstar", "drag(event)")
       
    }

    startIndex = -1;
    chosenLetters = [-1, -1, -1, -1, -1, -1];
    boxStatus = [0, 0, 0, 0, 0, 0, 0,              1, 1, 1, 1, 1, 1, 1];   
    availableLetters = [-1, -1, -1, -1, -1, -1, -1];

    // Reset stats as well
    document.getElementById("score").innerHTML = "Score: ";
    document.getElementById("errMsg").innerHTML = ""
    document.getElementById("word").innerHTML = "Word: ";
    document.getElementById("play").disabled = true

    var remainingTiles = 0;
    for(var i = 0; i < letters.length; i++) {
        remainingTiles += letters[i].count;
    }

    if(remainingTiles <= 1) {
        alert("Game Over! Not enough tiles left to make a word!!");
        return;
    }
}