"use strict";
/*Initial Declaration */
var Status = document.querySelector('.game--status');
var X_turn = 'X';
var O_turn = 'O';
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var playerTurn = function () { return "It's " + currentPlayer + "'s turn"; };
var DrawMessage = function () { return "Draw Match"; };
var WinningMessage = function () { return "Player " + currentPlayer + " has won."; };
var Active = true;
var currentPlayer = X_turn;
var gameState = ["", "", "", "", "", "", "", "", ""];
Status.innerHTML = playerTurn();
/*Handle cell click*/
function cellClick(clickedCellEvent) {
    var clicked = clickedCellEvent.target;
    var clickedCellIndex = parseInt(clicked.getAttribute("data-cell-index"));
    if (gameState[clickedCellIndex] !== "" || !Active) {
        return;
    }
    cellPlayed(clicked, clickedCellIndex);
    resultValidation();
}
/*Add player symbol to UI and updating status*/
function cellPlayed(clicked, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clicked.innerHTML = currentPlayer;
}
/*check if win/draw*/
function resultValidation() {
    var won = false;
    for (var i = 0; i <= 7; i++) {
        var winningCondition = winningConditions[i];
        var a = gameState[winningCondition[0]];
        var b = gameState[winningCondition[1]];
        var c = gameState[winningCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            won = true;
            break;
        }
    }
    if (won) {
        Status.innerHTML = WinningMessage();
        Active = false;
        return;
    }
    if (!gameState.includes("")) {
        Status.innerHTML = DrawMessage();
        Active = false;
        return;
    }
    PlayerChange();
}
/*change current player */
function PlayerChange() {
    currentPlayer = currentPlayer === X_turn ? O_turn : X_turn;
    Status.innerHTML = playerTurn();
}
/*restart */
function GameRestart() {
    Active = true;
    currentPlayer = X_turn;
    gameState = ["", "", "", "", "", "", "", "", ""];
    Status.innerHTML = playerTurn();
    document.querySelectorAll('.cell').forEach(function (cell) { return cell.innerHTML = ""; });
}
document.querySelectorAll('.cell').forEach(function (cell) { return cell.addEventListener('click', cellClick); });
document.querySelector('.restart').addEventListener('click', GameRestart);
