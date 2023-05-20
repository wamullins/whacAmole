//// grab everything DOM ////
const menuBtn = document.getElementById('menuBtn');
const bonkText = document.getElementById('bonkText');
const bonkCount = document.getElementById('bonkCount');
const gameGrid = document.getElementById('gameGrid');
const timerText = document.getElementById('timerText');
const gameTimer = document.getElementById('gameTimer');

//// Additional Variables ////

const holeContents = {
    '-1' : 'BONK!',
    '0' : '',
    '1' : 'MOLE!',
};


let chosenDiff = sessionStorage.getItem('chosenDiff');
console.log(chosenDiff);

let gridSize = parseInt(sessionStorage.getItem('gridSize'));
console.log(gridSize);

let bonks;
let gameGridArr=[];


//// Event Listeners ////

//// Functions ////

function init() {
    bonks = 0;
    //CITATION: array constructor https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
    // creates an array with h and w dimensions based on the grid input from the menu
    
    // let gameGridline = new Array(gridSize).fill(0);
    // gameGridArr = new Array(gridSize).fill(gameGridline);
   
    /// THIS ABOVE AREA WAS CAUSING ALL KINDS OF WEIRD ISSUES WITH INDEXING LATER ON. SWITCHING TO A NESTED FOR LOOP

    for (i=0; i<gridSize; i++) {
        let gridline = [];
        for (j=0;j<4;j++) {
            gridline.push(0);
        }
        gameGridArr.push(gridline);
    }

    gameGridArr[3][3] = 1;
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


    testArray = [[0,0,0],[0,0,0],[0,0,0]];
    console.log(testArray);
    testArray[0][0] = 1;
    console.log(testArray);

    render();
}

function render() {
    // very similar to the connect 4 game //
    gameGridArr.forEach(function(rowArray, rowIndex) {
        rowArray.forEach(function(cell, colIndex) {
            let cellId = `row${rowIndex}col${colIndex}`;
            let cellSpace = document.getElementById(cellId);
            cellSpace.innerHTML = holeContents[cell];
        })
    })
}

function whac(hole) {
    hole.innerHTML='BONK'
}

//// RUN THE GAME! ////
init();