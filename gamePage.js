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
    let gameGridline = Array(gridSize);
    gameGridline.fill(0);
    gameGridArr = Array(gridSize);
    gameGridArr.fill(gameGridline);
    console.log(gameGridArr);   

}


//// RUN THE GAME! ////
init();