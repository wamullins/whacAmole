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

let gridSize = sessionStorage.getItem('gridSize');
console.log(gridSize);

//// Event Listeners ////

//// Functions ////