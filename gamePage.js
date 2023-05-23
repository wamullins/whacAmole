//// grab everything DOM ////
const topMenuBtn = document.getElementById('topMenuBtn');
const bonkCount = document.getElementById('bonkCount');
const gameGrid = document.getElementById('gameGrid');
const gameTimer = document.getElementById('gameTimer');
const gameOver = document.getElementById('gameover');

//// Additional Variables ////


/// can add additoinal options for moles of varrying point values. 
const holeContents = {
    '-1': 'BONK',
    '0' : '',
    '1' : '<img class="mole" src="mole.png"/>',
    '5' : '<img class="mole" src="goldenMole.png"/>'
};


let chosenDiff = sessionStorage.getItem('chosenDiff');
console.log(chosenDiff);

let gridSize = parseInt(sessionStorage.getItem('gridSize'));
console.log(gridSize);

let bonks = 0;
let gameGridArr=[];
bonkCount.innerHTML = bonks;
let timeLeft = 3;


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
    
    // display the 60s at the very beginning
    gameTimer.innerHTML = `${timeLeft}s`

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
    //moles will pop up between .25 and 2 seconds
    let popUpTime = Math.floor(Math.random()*1750)+250;
    console.log(`Next mole in ${popUpTime} seconds`);
    setTimeout(moleUpRandom,popUpTime);
}

function whac(hole) {
    // this will give the coordinates of which hole was clicked so that the gameGridArr can be properly changed and not conflict with the render functionss
    holeRow = hole.id[3];
    holeCol = hole.id[7];
    console.log(`You clicked row ${holeRow} and col ${holeCol}`);

    if (gameGridArr[holeRow][holeCol] > 0 && timeLeft>0) {
        bonks += parseInt(gameGridArr[holeRow][holeCol])
        gameGridArr[holeRow][holeCol] = -1;
        bonkCount.innerHTML = bonks;
        render();
    }
    
}

function moleUpRandom() {
    // CITATION: how to use .random together with .floor https://www.w3schools.com/js/js_random.asp
    let rowCor = Math.floor(Math.random()*gridSize);
    let colCor = Math.floor(Math.random()*gridSize);

    //set possibility for the golden mole and leave room for additional mole figures. 10% chance for golden mole to appear. 
    let moleProbRoller = Math.random();
    if (moleProbRoller>=0.90) {
        gameGridArr[rowCor][colCor]=5;
    } else {
        gameGridArr[rowCor][colCor]=1;
    }
    

    // if (difficulty = medium... etc.) change the stuff around the moleDownTimer
    let moleDownTimer;
    switch(chosenDiff) {
        case 'easy':
            //between 1.5 and 4 seconds
            moleDownTimer = Math.floor(Math.random()*2500)+1500;
            break;
        case 'medium':
            //between 1 and 2 seconds
            moleDownTimer = Math.floor(Math.random()*1000)+1000;
            break;
        case 'hard':
            //between .25 and 1 seconds
            moleDownTimer = Math.floor(Math.random()*750)+250;
            break;
    }

    console.log(`Difficulty: ${chosenDiff} -  Mole up for ${moleDownTimer} seconds`);

    if (timeLeft>0) {
        render();
        setTimeout(moleDown, moleDownTimer, rowCor, colCor);
        popUpInterval(); 
    }
     
}

function moleDown(row,col) {
    if (timeLeft<=0) {return;} // this will cause the function to stop immediatly if there isn't time left on the clock.

    gameGridArr[row][col]=0;
    render();
}

function gameTimerCountDown() {
    timeLeft -= 1;
    gameTimer.innerHTML = `${timeLeft}s `;
    checkClock();
}

function checkClock() {
    if (timeLeft<=0) {
        clearInterval(gameTimerGoing);
        
        //this adds the hidden class to 


        //this removes the hidden class from the gameOver screen which then allows it to transition onto the page
        gameOver.classList = [];
        setTimeout(allMolesEndGame, 3000);
    }
}
 
function allMolesEndGame() {
    for (i=0; i<gridSize; i++) {
        for (j=0;j<gridSize;j++) {
            gameGridArr[i][j] = 1;
            render();
        }
    }
}

//// RUN THE GAME! ////
// CITATION: setInverval work - https://developer.mozilla.org/en-US/docs/Web/API/setInterval
const gameTimerGoing = setInterval(gameTimerCountDown, 1000);
init();