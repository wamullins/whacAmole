//// DOM ////
const easyHard = document.querySelectorAll('input[name="diffSel"]');
const gridPrompt = document.getElementById('gridPrompt');
const playBtn = document.getElementById('playBtn');
const menuHoleOne = document.getElementById('menuHoleOne');
const menuHoleTwo = document.getElementById('menuHoleTwo');
const menuHoleThree = document.getElementById('menuHoleThree');

//// Additional Variables ////

let chosenDiff = 'medium';

//// Event Listeners ////

playBtn.addEventListener('click', () => playGame());
easyHard.forEach(function(diff) {
    diff.addEventListener('click', () => moleAdjustment(diff));
})

//// Functions ////

function playGame() {

    // CITATION used this link for learning about session storage https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    easyHard.forEach(function(diff){
        chosenDiff = diff.checked ? diff.value : chosenDiff;
        sessionStorage.setItem('chosenDiff', chosenDiff);
    })

    sessionStorage.setItem('gridSize', gridPrompt.value);
}

function moleAdjustment(diff) {
    switch(diff.id) {
        case 'easy':
            menuHoleTwo.innerHTML = `<img class="menuMole" src="mole.png"/>`;
            menuHoleThree.innerHTML = `<img class="menuGolden" src="goldenMole.png"/>`;
            break;
        case 'medium':
            menuHoleTwo.innerHTML = `<img class="menuSpike" src="spikeMole.png"/>`;
            menuHoleThree.innerHTML = `<img class="menuGolden" src="goldenMole.png"/>`;
            break;
        case 'hard':
            menuHoleTwo.innerHTML = `<img class="menuSpike" src="spikeMole.png"/>`;
            menuHoleThree.innerHTML = `<img class="menuSpike" src="spikeMole.png"/>`;
            break;
    }
}

function firstMove() {
    menuHoleThree.style.order = '-1';
    setTimeout(secondMove, 3000);
}
function secondMove() {
    menuHoleTwo.style.order = '-1';
    setTimeout(thirdMove, 3000);
}
function thirdMove() {
    menuHoleOne.style.order = '';
    menuHoleTwo.style.order = '';
    menuHoleThree.style.order = '';
    setTimeout(firstMove, 3000);
}
setTimeout(firstMove,3000);