//// grab everything DOM ////
const easyHard = document.querySelectorAll('input[name="diffSel"]');
const gridPrompt = document.getElementById('gridPrompt');
const playBtn = document.getElementById('playBtn');
const menuMoles = document.getElementById('menuMoles');
const menuHoleOne = document.getElementById('menuHoleOne');
const menuHoleTwo = document.getElementById('menuHoleTwo');
const menuHoleThree = document.getElementById('menuHoleThree');

//// Additional Variables ////

let chosenDiff = 'medium';

//// Event Listeners ////

playBtn.addEventListener('click', () => playGame());


//// Functions ////

function playGame() {

    // CITATION used this link for learning about session storage https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    easyHard.forEach(function(diff){
        chosenDiff = diff.checked ? diff.value : chosenDiff;
        sessionStorage.setItem('chosenDiff', chosenDiff);
    })

    sessionStorage.setItem('gridSize', gridPrompt.value);
}

function moleMovement() {
    
}

function firstMove() {
    menuHoleThree.style.order = '-1';
    console.log('moving');
    setTimeout(secondMove, 4000);
}
function secondMove() {
    menuHoleTwo.style.order = '-1'
    setTimeout(thirdMove, 4000);
}
function thirdMove() {
    menuHoleOne.style.order = '';
    menuHoleTwo.style.order = '';
    menuHoleThree.style.order = '';
    setTimeout(firstMove, 4000);
}

setTimeout(firstMove,4000);