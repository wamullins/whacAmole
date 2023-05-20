//// grab everything DOM ////
const easyHard = document.querySelectorAll('input[name="diffSel"]');
const gridPrompt = document.getElementById('gridPrompt');
const playBtn = document.getElementById('playBtn');

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