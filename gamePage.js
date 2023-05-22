//// grab everything DOM ////
const menuBtn = document.getElementById('menuBtn');
const bonkText = document.getElementById('bonkText');
const bonkCount = document.getElementById('bonkCount');
const gameGrid = document.getElementById('gameGrid');
const timerText = document.getElementById('timerText');
const gameTimer = document.getElementById('gameTimer');

//// Additional Variables ////


/// can add additoinal options for moles of varrying point values
const holeContents = {
    '-1': 'BONK',
    '0' : '',
    '1' : 'MOLE!',
};


let chosenDiff = sessionStorage.getItem('chosenDiff');
console.log(chosenDiff);

let gridSize = parseInt(sessionStorage.getItem('gridSize'));
console.log(gridSize);

let bonks = 0;
let gameGridArr=[];
bonkCount.innerHTML = bonks;


//// Event Listeners ////

//// Functions ////

function init() {
    ////////////////// Weird array issues //////////////////
    //CITATION: array constructor https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
    // creates an array with h and w dimensions based on the grid input from the menu
    // let gameGridline = new Array(gridSize).fill(0);
    // gameGridArr = new Array(gridSize).fill(gameGridline);
    /// THIS ABOVE AREA WAS CAUSING ALL KINDS OF WEIRD ISSUES WITH INDEXING LATER ON. SWITCHING TO A NESTED FOR LOOP
    ////////////////// ////////////////// ////////////////// 

    for (i=0; i<gridSize; i++) {
        let gridline = [];
        for (j=0;j<gridSize;j++) {
            gridline.push(0);
        }
        gameGridArr.push(gridline);
    }  

    // populates the gameGrid div with divs for each hole with ids detailing where they are on the board // can probably combine this with the top for loop, but keeping it seperate for now to keep things more clear. 
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

    // CITATION: setInverval work - https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    // every 3 secodns a mole will pop up. Need to make this number random 
    // const popUpsIntervalID = setInterval(moleUpRandom, 3000);


    // this function is now responsible to causing a mole to pop up at a random interval
    popUpInterval();

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

function popUpInterval() {
    let testTime = Math.floor(Math.random()*2000)+500;
    setTimeout(moleUpRandom,testTime);
    console.log(`Time between mole appearence is ${testTime}`)
}

function whac(hole) {
    // this will give the coordinates of which hole was clicked so that the gameGridArr can be properly changed and not conflict with the render functionss
    holeRow = hole.id[3];
    holeCol = hole.id[7];
    console.log(`You clicked row ${holeRow} and col ${holeCol}`);

    if (gameGridArr[holeRow][holeCol] === 1) {
        hole.innerHTML='BONK'
        gameGridArr[holeRow][holeCol] = -1;
        bonks += 1;
        bonkCount.innerHTML = bonks;
        render();
    }
}

function moleUpRandom() {
    // CITATION: how to use .random together with .floor https://www.w3schools.com/js/js_random.asp
    let rowCor = Math.floor(Math.random()*gridSize);
    let colCor = Math.floor(Math.random()*gridSize);
    gameGridArr[rowCor][colCor]=1;
    render();


    // if (difficulty = medium... etc.) change the stuff around the moleDownTimer

    // mole will appear for somewhere between 1 and 3 seconds;
    let moleDownTimer = Math.floor(Math.random()*2000)+1000;
    console.log(moleDownTimer);
    setTimeout(moleDown, moleDownTimer, rowCor, colCor);
    popUpInterval();
}

function moleDown(row,col) {
    gameGridArr[row][col]=0;
    render();
}
//// RUN THE GAME! ////
init();