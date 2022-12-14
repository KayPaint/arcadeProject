// Tic-Tac-Toe

// As users playing a two player game we want to:
// [Y] enter our names and have them displayed
// [Y] have our order chosen for us by the game
// [Y] take turns placing our marks in empty spaces
// [Y] not be able to place our marks in an occupied space
// [Y] be told when a move causes a player to win, or to draw
// [Y] start the game over without having to reset the browser

// As a user playing a one player game I want to:
// [Y] see the name 'Computer' displayed as my opponent
// [] have the Computer player make moves as if it were a human player with the correct mark in an empty space 

// What are the winning positions
    // // Board
    // [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    // ]
    // // 3 Horizontal
    //     [0, 1, 2] // Win
    //     [3, 4, 5] // Win
    //     [4, 5, 6] // Win
    // // 3 Vertical
    //     [0, 3, 6] // Win
    //     [1, 4, 7] // Win
    //     [2, 5, 8] // Win
    // // 2 Diagonal
    //     [0, 4, 8] // Win
    //     [2, 4, 6] // Win


// Gameplay Flow
    // User selects 1 player or 2 players
    // User(s) enter names
    // buildInitialState runs

    // Player X always starts first  

    // Player 1 "X" clicks a square, adding X to that square
    // function checks for any win situations, otherwise change turn

    // Player 2 "O" clicks a square, adding O to that square
    // function checks for any win situations, otherwise change turn

    // Upon win condition, display alert telling who won

    // "Reset Game" resets to initial state

// DOM SELECTORS

let playerVSComputer = document.getElementById("player-vs-computer");
let playerVSPlayer = document.getElementById("player-vs-player");
let playerTwoNameDiv = document.getElementById("playertwo-name-div");
let playerTwoNameStatus = document.getElementById("playertwo-name-status");
let playerOneName = document.getElementById("playerone-name-status");
let playerOneInput = document.getElementById("name-one-input");
let playerTwoName = document.getElementById("playertwo-name-status");
let playerTwoInput = document.getElementById("name-two-input");
let cellDiv = document.getElementById("cell-div");
let resetButton = document.getElementById("reset-button");
let currentTurn = document.getElementById("current-turn-status");

//  STATE

let state = {};

// Function builds initial game state
function buildInitialState() {
    
    //                0    1
    state.players = ['X', 'O'];

    // Initially, currentPlayer set to 0, AKA "X"
    state.currentPlayer = 0;

    // Initial board
    state.board = [
        { owner: null, marked: null },
        { owner: null, marked: null },
        { owner: null, marked: null },
        { owner: null, marked: null },
        { owner: null, marked: null },
        { owner: null, marked: null },
        { owner: null, marked: null },
        { owner: null, marked: null },
        { owner: null, marked: null },
    ];

    // Used to announce game victory
    state.victor;

}

// (State -> HTML)
// Reads state object
// Writes/modifies HTML
function renderState() {
    // Clear container HTML
    cellDiv.innerHTML = "";
    // This loop creates the div cells for the game
    for (i = 0; i < state.board.length; i++) {
        // Create a div element
        let cellElement = document.createElement("div");
        // Append the new div element to the container
        cellDiv.appendChild(cellElement);
        // Add numbered IDs to the div
        cellElement.setAttribute('id', [i])
        // Add the div to class="cell"
        cellElement.classList.add("cell");
        // Add a data index of current loop index
        cellElement.dataset.index = [i];

        if (state.board[i].marked === true) {
            cellElement.innerText = state.board[i].owner
        }

        if (state.currentPlayer === 0) {
            currentTurn.innerText = "Current Turn: X";
        }
        
        if (state.currentPlayer === 1) {
            currentTurn.innerText = "Current Turn: O";
        }

        if (state.victor) {
            currentTurn.innerText = state.victor;
        }
    }
}

// (User Input -> State)
// Reads HTML
// Writes/modifies State
// After modification trigger render
function onBoardClick(clickedCellIdx) {

    if (state.board[clickedCellIdx].marked === true) {
        return;
    } else {
        // Sets cell 'marked' property to true;
        state.board[clickedCellIdx].marked = true;

        // Sets cell 'owner' to the current player;
        if (state.currentPlayer === 0) {
            state.board[clickedCellIdx].owner = 'X';
            console.log("Adding X...")
        } else {
            state.board[clickedCellIdx].owner = 'O';
            console.log("Adding O...")
        }

    }

    // Switch Turns
    console.log("Swapping turns...")
    swapTurns()
  
    // Check for any victory conditions
    check()

    // Run render
    renderState()
}


// HELPER FUNCTIONS

// This function checks the board for win conditions
// This function hides the option to input a second name
function onePlayer() {
    // When the radio button "Player VS Computer" is clicked, run this function

    // If the user has selected Player VS Player
    if (playerVSPlayer.checked === true) {
        // Set Player VS Player.checked to false
        playerVSPlayer.checked = false;
        // Set Player VS Computer.checked to true
        playerVSComputer.checked = true;
    }

    // Next, if Player VS Computer.checked is true
    if (playerVSComputer.checked === true) {
        // Hide visibility of the second name input
        playerTwoNameDiv.style.visibility = 'hidden';
        // Change second name status to "Computer"
        playerTwoNameStatus.innerText = "Computer" + " " + ": X";
    } 
}

// This function negates the action by function onePlayer
function twoPlayer() {
    // When the radio button "Player VS Player" is clicked, run this function

    // If the user has selected Player VS Computer
    if (playerVSComputer.checked === true) {
        // Set Player VS Computer.checked to false
        playerVSComputer.checked = false;
        // Set Player VS Player.checked to true
        playerVSPlayer.checked = true;
    }

    // Next, if Player VS Player is checked
    if (playerVSPlayer.checked === true) {
        // Show visibility of the second name input
        playerTwoNameDiv.style.visibility = 'visible';
        // Reset second name status to two player
        playerTwoNameStatus.innerText = "Player 2: O";
    } 
}

// This function updates the player one name
function updateNameOne() {
    // Updating innerText with input value
    playerOneName.innerText = playerOneInput.value + " " + ": X";
}

// This function updates the player two name
function updateNameTwo() {
    // Updating innerText with input value
    playerTwoName.innerText = playerTwoInput.value + " " + ": O";
}

// This function switches turns between players
function swapTurns() {
    // currentPlayer initializes at 0, AKA player "X"

    // If currentPlayer is 0, set it to 1
    // If currentPlayer is 1, set it to 0
    if (state.currentPlayer === 0) {
        return state.currentPlayer += 1;
    } else if (state.currentPlayer === 1) {
        return state.currentPlayer -= 1;
    }
}

function resetCurrentTurn() {
    currentTurn.innerText = "Current Turn: X";
}

function checkHorizontal() {

    //  Horizontal Wins
    //     [0, 1, 2] 
    //     [3, 4, 5] 
    //     [6, 7, 8] 

    if (state.board[0].owner === "X" && state.board[1].owner === "X" && state.board[2].owner === "X") {
        let win = "X has won!"
        console.log("X has won!")
        return win;
    } else if (state.board[0].owner === "O" && state.board[1].owner === "O" && state.board[2].owner === "0") {
        let win = "O has won!"
        console.log("O has won!")
        return win;
    } 
    
    if (state.board[3].owner === "X" && state.board[4].owner === "X" && state.board[5].owner === "X") {
        let win = "X has won!"
        console.log("X has won!")
        return win;
    } else if (state.board[3].owner === "O" && state.board[4].owner === "O" && state.board[5].owner === "O") {
        let win = "O has won!"
        console.log("O has won!")
        return win;
    }
    
    if (state.board[6].owner === "X" && state.board[7].owner === "X" && state.board[8].owner === "X") {
        let win = "X has won!"
        console.log("X has won!")
        return win;
    } else if (state.board[6].owner === "O" && state.board[7].owner === "O" && state.board[8].owner === "O") {
        let win = "O has won!"
        console.log("O has won!")
        return win;
    }
    
}

function checkVertical() {

    //    Vertical Wins
    //     [0, 3, 6] 
    //     [1, 4, 7] 
    //     [2, 5, 8] 

    if (state.board[0].owner === "X" && state.board[3].owner === "X" && state.board[6].owner === "X") {
        let win = "X has won!"
        console.log("X has won!")
        return win;
    } else if (state.board[0].owner === "O" && state.board[3].owner === "O" && state.board[6].owner === "0") {
        let win = "O has won!"
        console.log("O has won!")
        return win;
    } 
    
    if (state.board[1].owner === "X" && state.board[4].owner === "X" && state.board[7].owner === "X") {
        let win = "X has won!"
        console.log("X has won!")
        return win;
    } else if (state.board[1].owner === "O" && state.board[4].owner === "O" && state.board[7].owner === "O") {
        let win = "O has won!"
        console.log("O has won!")
        return win;
    }
    
    if (state.board[2].owner === "X" && state.board[5].owner === "X" && state.board[8].owner === "X") {
        let win = "X has won!"
        console.log("X has won!")
        return win;
    } else if (state.board[2].owner === "O" && state.board[5].owner === "O" && state.board[8].owner === "O") {
        let win = "O has won!"
        console.log("O has won!")
        return win;
    }
}

function checkDiagonal() {

    //    Diagonal Wins
    //     [0, 4, 8] 
    //     [2, 4, 6] 

    if (state.board[0].owner === "X" && state.board[4].owner === "X" && state.board[8].owner === "X") {
        let win = "X has won!"
        console.log("X has won!")
        return win;
    } else if (state.board[0].owner === "O" && state.board[4].owner === "O" && state.board[8].owner === "O") {
        let win = "O has won!"
        console.log("O has won!")
        return win;
    } 
    
    if (state.board[2].owner === "X" && state.board[4].owner === "X" && state.board[6].owner === "X") {
        let win = "X has won!"
        console.log("X has won!")
        return win;
    } else if (state.board[2].owner === "O" && state.board[4].owner === "O" && state.board[6].owner === "O") {
        let win = "O has won!"
        console.log("O has won!")
        return win;
    }

}

function check() {
    let checkHorizontalVar = checkHorizontal();
    let checkVerticalVar = checkVertical();
    let checkDiagonalVar = checkDiagonal();
    
    if (checkHorizontalVar != undefined) {
        state.victor = checkHorizontalVar
        return checkDiagonalVar;
    } else if (checkVerticalVar != undefined) {
        state.victor = checkVerticalVar
        return checkVerticalVar;
    } else if (checkDiagonalVar != undefined) {
        state.victor = checkDiagonalVar;
        return checkDiagonalVar;
    }
}

// EVENT LISTENERS

cellDiv.addEventListener('click', function (event) {
    if (event.target.className !== "cell") {
        return;
    }
    clickedCellIdx = event.target.id;
    console.log("Target Index:", clickedCellIdx);
    onBoardClick(clickedCellIdx);

    renderState();
});

resetButton.addEventListener('click', function (event) {
    resetCurrentTurn();
    buildInitialState();
    renderState();
})

// FUNCTION CALL
buildInitialState();
renderState();