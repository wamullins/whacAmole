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
    '1' : `<svg class="mole" width="107" height="117" viewBox="0 0 107 117" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M85 74.5385C85 98.2159 67.6483 116 55.5 116C43.3517 116 46.2061 117.703 46.2061 94.0257C46.2061 70.3482 26.859 38 39.0073 38C51.1555 38 85 50.8611 85 74.5385Z" fill="#444444"/>
    <path d="M83 28.628C83 51.4894 78.3389 25.3353 65.0125 25.3353C51.6861 25.3353 31.6697 27.4996 31.6697 4.63826C29.0373 -9.94376 34.1373 14.5163 47.4637 14.5163C60.7901 14.5163 70 9 83 28.628Z" fill="#444444"/>
    <path d="M30.7593 29.5C30.7593 41.7126 51.2838 58 65.2376 58C79.1915 58 72.1283 50.11 72.1283 37.8974C72.1283 25.6848 94.351 8.99998 80.3972 8.99998C66.4433 8.99998 12.4132 26 30.7593 29.5Z" fill="#444444"/>
    <path d="M107 77.9422C107 102.118 88.6551 64.1874 79.2869 64.1874C69.9188 64.1874 58 91.5087 58 67.333C58 43.1572 61.0826 46.1142 70.4507 46.1142C79.8189 46.1142 107 53.7665 107 77.9422Z" fill="#444444"/>
    <path d="M1.26245e-07 69.9422C1.26245e-07 94.118 18.3449 56.1874 27.7131 56.1874C37.0812 56.1874 49 83.5087 49 59.333C49 35.1572 45.9174 38.1143 36.5493 38.1143C27.1811 38.1143 1.26245e-07 45.7665 1.26245e-07 69.9422Z" fill="#444444"/>
    </svg>`,
    '5' : 'GOLD!!!'
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
    if (timeLeft<=0) {return;}

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