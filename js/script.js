//DEFINE VARIABLES
let NUMBER_OF_TRIALS
let LEVEL, SPECIAL_NUMBER, NUMBER_OF_TRIALS_LEFT, MAXIMUM_NUMBER, FONT_SIZE;
let message = ''
let hint = true;
let action;
console.log(document.querySelector('.test-text'));



//SELECTED ELEMENTS
let startButton = document.querySelector('.start');
let menuButton = document.querySelector('.menu-button');
let closeButton = document.querySelectorAll('.close-button');
let rulesButton = document.querySelector('.rules-button');
let creditsButton = document.querySelector('.credits-button');
let welcomePage = document.querySelector('.welcome-page');
let guessButton = document.querySelector('.btn-guess');
let restartButton = document.querySelector('.restart');
let selectLevel = document.querySelector('.select-level');
let yesButton = document.querySelector('.yes');
let noButton = document.querySelector('.no');
let playAgainButton = document.querySelector('.play-again');
let selectDifficultyButton = document.querySelector('.select-difficulty'); 
let keys = document.querySelector('.keys');
let delButton = document.querySelector('.btn-del');
let clearButton = document.querySelector('.btn-clr');

document.querySelector('.toggle-button').addEventListener('click', function () {
    if (hint == true) {
        document.querySelector('.toggle-button').classList.remove('on')
        hint = false;
    } else if (hint == false) {
        document.querySelector('.toggle-button').classList.add('on')
        hint = true;
    }
})

keys.addEventListener('click', function (e) {
    
    let clickedNumber = e.target.textContent;
    if (!isNaN(clickedNumber)) {
        document.querySelector('.input-number-field').textContent += clickedNumber;
        document.querySelector('.input-field div').style.border = 'solid 5px #808080';
    }
})

document.querySelector('.input-field div').addEventListener('click', function () {
    document.querySelector('.input-field div').style.border = 'solid 5px #808080';
})

delButton.addEventListener('click', function () {
    let currrentInput = document.querySelector('.input-number-field').textContent;
    if (currrentInput) {
        let newInput = currrentInput.substring(0, currrentInput.length - 1);
        document.querySelector('.input-number-field').textContent = newInput;
    }
})

clearButton.addEventListener('click', function () {
    let currrentInput = document.querySelector('.input-number-field').textContent;
    if (currrentInput) {
        let newInput = null;
        document.querySelector('.input-number-field').textContent = newInput;
    }
})


function display(querySelector, displaySet) {
    if (displaySet) {
        document.querySelector(querySelector).classList.add('show');
    } else if (!displaySet) {
        document.querySelector(querySelector).classList.remove('show');
    } 
}



menuButton.addEventListener('click', function () {
    display('nav', true);
})

for (const button of closeButton) {
     button.addEventListener('click', function (e) {
            this.parentNode.classList.remove('show');
        })   
}

rulesButton.addEventListener('click', function () {
    display('nav', false)
    display('.rules', true);
})

creditsButton.addEventListener('click', function () {
    display('nav', false);
    display('.credits', true);
})

startButton.addEventListener('click', function () {
    welcomePage.classList.add('welcome-page-hide');
    initiateValues();
    document.querySelector('.hidden-number').style.fontSize = `${FONT_SIZE}px`
    document.querySelector('.level').textContent = `${LEVEL} (1 - ${MAXIMUM_NUMBER})`;
    document.querySelector('.current-trials-left').textContent = NUMBER_OF_TRIALS_LEFT;
    document.querySelector('.message-log').innerHTML = message;
})

guessButton.addEventListener('click', function () {
    let input = document.querySelector('.input-number-field').textContent;
    if (input == '') {
        message = message + 'Please enter a number'
    } else if (isNaN(input)) {
        message = `${message} \u000A The input must be a number`
    } else if (input > MAXIMUM_NUMBER) {
        message = `${message} \u000A The number must not be greater than ${MAXIMUM_NUMBER}`;
    } else {
        NUMBER_OF_TRIALS_LEFT--;
        document.querySelector('.current-trials-left').textContent = NUMBER_OF_TRIALS_LEFT;
        if (input == SPECIAL_NUMBER) {
            document.querySelector('.hidden-number').textContent = SPECIAL_NUMBER;
            displaySuccess();
        } else {
            if (NUMBER_OF_TRIALS_LEFT == 0) {
                document.querySelector('.hidden-number').textContent = SPECIAL_NUMBER;
                displayGameFailure()
            } else {
                message = `${message} <br/> Wrong, Try Again`
                if (hint) {
                    if (input > SPECIAL_NUMBER) {
                        message = `${message} <br/><br/> You went too <strong> high </strong>`;
                    } else {
                        message = `${message} <br/><br/> You went too <strong> low </strong>`;
                    }
                }
            }
        }
    }

    if (message) {
        document.querySelector('.message-log').innerHTML = message;
        document.querySelector('.input-field div').style.border = 'solid 5px #ff6464';
        message = '' //clears message log
    }

    document.querySelector('.input-number-field').textContent = null;
})

restartButton.addEventListener('click', function () {
    display('nav', false);
    display('.confirmation', true);
    action = {key:'restart', msg:'restart'}
    document.querySelector('.action').textContent = action.msg;
})

selectLevel.addEventListener('click', function () {
    display('nav', false);
    display('.confirmation', true);
    action = {key:'exit', msg:'exit'}
    document.querySelector('.action').textContent = action.msg;
})

yesButton.addEventListener('click', function () {
    if (action.key == 'restart') {
        updateValues();
        display('.confirmation', false);
        document.querySelector('.current-trials-left').textContent = NUMBER_OF_TRIALS_LEFT;
        document.querySelector('.message-log').innerHTML = message;
    } else if (action.key == 'exit') {
        deleteValues();
        display('.confirmation', false);
        welcomePage.classList.remove('welcome-page-hide');
    }
})

playAgainButton.addEventListener('click', function () {
    updateValues();
    display('.game-results', false);
    document.querySelector('.current-trials-left').textContent = NUMBER_OF_TRIALS_LEFT;
    document.querySelector('.message-log').innerHTML = message;
})

selectDifficultyButton.addEventListener('click', function () {
     deleteValues();
     display('.game-results', false);
    welcomePage.classList.remove('welcome-page-hide');
})

noButton.addEventListener('click', function () {
    display('.confirmation', false);
})

function getDifficulty() {
    return parseInt(document.querySelector('.difficulty select').value);
}

function getRandomNoAndTrials() {
    let randomNumber
    let trialNo
    let max
    let fontSize
    switch (LEVEL) {
        case 1:
            randomNumber = Math.ceil(Math.random() * 10);
            trialNo = 5;
            max = 10;
            fontSize = 70;
            break;
        
        case 2:
            randomNumber = Math.ceil(Math.random() * 100);
            trialNo = 10;
            max = 100;
            fontSize = 50;
            break;
        
        case 3:
            randomNumber = Math.ceil(Math.random() * 1000);
            trialNo = 15;
            max = 1000;
            fontSize = 35;
        default:
            break;
    }

    return [randomNumber, trialNo, max, fontSize]
}


function initiateValues() {
    document.querySelector('.hidden-number').textContent = '';
    LEVEL = getDifficulty();
    [SPECIAL_NUMBER, NUMBER_OF_TRIALS_LEFT, MAXIMUM_NUMBER, FONT_SIZE] = getRandomNoAndTrials();
    NUMBER_OF_TRIALS = NUMBER_OF_TRIALS_LEFT;
}

function displaySuccess() {
    document.querySelector('.remark').textContent = 'You Win';
    let trialsUsed = NUMBER_OF_TRIALS - NUMBER_OF_TRIALS_LEFT;
    document.querySelector('.game-results p').innerHTML = `in ${trialsUsed} trial(s)`;
    display('.game-results', true);
}

function displayGameFailure() {
    document.querySelector('.remark').textContent = 'Game Over';
    document.querySelector('.game-results p').innerHTML = 'You Loose';
    display('.game-results', true);
}

function updateValues() {
    document.querySelector('.hidden-number').textContent = '';
    SPECIAL_NUMBER = getRandomNoAndTrials()[0];
    NUMBER_OF_TRIALS_LEFT = NUMBER_OF_TRIALS;
    FONT_SIZE = getRandomNoAndTrials[3];
 }
function deleteValues() {
    document.querySelector('.hidden-number').textContent = '';
    SPECIAL_NUMBER = null;
    NUMBER_OF_TRIALS = null;
    NUMBER_OF_TRIALS_LEFT = null;
    LEVEL = null;
    FONT_SIZE = null;
 }