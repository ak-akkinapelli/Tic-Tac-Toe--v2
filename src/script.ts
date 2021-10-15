/*Initial Declaration */

const Status = document.querySelector('.game--status');
const X_turn = 'X';
const O_turn = 'O';
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const playerTurn = () => `It's ${currentPlayer}'s turn`;
const DrawMessage = () => `Draw Match`;
const WinningMessage =() => `Player ${currentPlayer} has won.`

let Active = true;
let currentPlayer = X_turn;
let gameState = ["","","","","","","","",""];

Status.innerHTML = playerTurn();

/*Handle cell click*/
function cellClick(clickedCellEvent : Event){
 const clicked = clickedCellEvent.target as HTMLButtonElement;
 const clickedCellIndex = parseInt(clicked.getAttribute(`data-cell-index`));

if(gameState[clickedCellIndex] !== "" || !Active)
{
    return;
}

cellPlayed(clicked, clickedCellIndex);
resultValidation();
}

/*Add player symbol to UI and updating status*/
function cellPlayed(clicked: HTMLButtonElement, clickedCellIndex: number)
{
gameState[clickedCellIndex] = currentPlayer;
clicked.innerHTML = currentPlayer;
}

/*check if win/draw*/
function resultValidation()
{
    let won = false;
 for(let i =0;i<=7;i++)
 {
     const winningCondition = winningConditions[i]; 
     let a= gameState[winningCondition[0]];
     let b= gameState[winningCondition[1]];
     let c= gameState[winningCondition[2]];
     if(a ==="" || b ===""||c ==="")
     {
     continue;
     }
     if(a=== b && b ===c)
     {
       won = true;
       break;
     }
    }
     if(won)
     {
        Status.innerHTML = WinningMessage();
        Active = false;
        return;
     }
    
    if(!gameState.includes(""))
    {
        Status.innerHTML = DrawMessage();
        Active= false;
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
    gameState=["","","","","","","","",""];
    Status.innerHTML = playerTurn();
    document.querySelectorAll('.cell').forEach(cell=> cell.innerHTML = "");

}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.restart').addEventListener('click',GameRestart);
