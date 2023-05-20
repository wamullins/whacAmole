//// grab everything DOM ////
const menuBtn = document.getElementById('menuBtn');
const bonkText = document.getElementById('bonkText');
const bonkCount = document.getElementById('bonkCount');
const gameGrid = document.getElementById('gameGrid');
const timerText = document.getElementById('timerText');
const gameTimer = document.getElementById('gameTimer');

//// Additional Variables ////

let chosenDiff = sessionStorage.getItem('chosenDiff');
console.log(chosenDiff);

let gridSize = parseInt(sessionStorage.getItem('gridSize'));
console.log(gridSize);

let bonks;
let gameGridArr;


//// Event Listeners ////

//// Functions ////

function init() {
    bonks = 0;
    //CITATION: array constructor https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
    // creates an array with h and w dimensions based on the grid input from the menu
    let gameGridline = Array(gridSize);
    gameGridline.fill(0);
    gameGridArr = Array(gridSize);
    gameGridArr.fill(gameGridline);
    console.log(gameGridArr);   

    // populates the gameGrid div with divs for each hole with ids detailing where they are on the board
    for (i=0; i<gridSize; i++) {
        for (j=0; j<gridSize; j++) {
            gameGrid.innerHTML += `<div class='gameHole' id='row${i}col${j}'>ROW${i}COL${j}</div>`; 
        }
    }

    // defines the height and width of grid area based on the number of rows/columns and taking into account the grid gap
    let boardWidth = (10*gridSize)+(gridSize-1);
    let boardHeight = (5*gridSize)+(gridSize-1);
    gameGrid.style.width = `${boardWidth}rem`;
    gameGrid.style.height = `${boardHeight}rem`;
    
    // defines the grid parameters // using a similar method from the css in the connect four game
    
    gameGrid.style.gridTemplateRows = `repeat(${gridSize}, 5rem)`;
    gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 10rem)`;

    // set event listeners for each of the new holes
    const gameHoles = document.querySelectorAll('.gameHole');

    gameHoles.forEach(function(hole) {
        hole.addEventListener('click', () => whac(hole));
    })
}

function whac(hole) {
    console.log(hole.id);
}

//// RUN THE GAME! ////
init();