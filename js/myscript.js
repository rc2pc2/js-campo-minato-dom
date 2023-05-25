const playButton = document.querySelector('header button.button-play');
playButton.addEventListener(('click'), function(){
    startNewGame();
});

function startNewGame(){
    const gridElement = document.querySelector('div.grid');
    const level = parseInt(document.getElementById('level-select').value);
    const outputBanner = document.querySelector('h2.info-banner');

    let userScore = 0;
    let cellsNumber = 0;
    let cellsClass;
    let isGameOver = false;

    if (level === 0){
        cellsNumber = 100;
        cellsClass = 'cell-easy';
    } else if (level === 1){
        cellsNumber = 81;
        cellsClass = 'cell-medium';
    } else {
        cellsNumber = 49;
        cellsClass = 'cell-hard';
    }

    const bombsList = getRandomUniqueNumber(1, cellsNumber, 16);
    console.log(bombsList);

    outputBanner.innerHTML = "Welcome! Click a cell to get a point!";
    gridElement.innerHTML = "";
    gridElement.classList.remove('game-over');

    for (let index = 0; index < cellsNumber; index++) {
        const newCell = createElement('div','cell '+ cellsClass,
        ``);
        const isThisABomb = bombsList.includes(index + 1);

        if (isThisABomb){
            newCell.classList.add('bomb');
            newCell.innerHTML = '<p><i class="fa-solid fa-bomb"></i></p>';
        }

        newCell.addEventListener('click', function(){
            if (!isGameOver){
                if ( isThisABomb ){ // user clicked a bomb
                    outputBanner.innerHTML = "Game over, your score is: "+ userScore;
                    gridElement.classList.add('game-over');
                    isGameOver = true;
                } else { // not a bomb
                    userScore++;
                    outputBanner.innerHTML = "You scored a point! Your score is: "+ userScore;
                    console.log(index + 1, userScore);
                    this.classList.add('active'); // this === newCell
                    this.innerHTML = '<img src="./img/flower.png" alt="A tiny little flower">';

                    if ( userScore === cellsNumber - bombsList.length){
                        outputBanner.innerHTML = "WOW!! YOU WON!! HIGHSCORE: "+ userScore;
                        isGameOver = true;
                    }
                }
            } else {
                alert('La partita è finita, per continuare inizia una nuova partita');
            }
        }, {once: true});

        gridElement.appendChild(newCell);
    }
}

/**
 * Function that creates a custom HTML element with the given tag and classes (as a string)
 *
 * @param {string} tagName The tag of the element to be created as a string
 * @param {string} className The classes of the element to be created as a string
 * @param {string} htmlContent The content of the element to be created as a string, including html tags.
 */
function createElement(tagName, className, htmlContent){
    const htmlElement = document.createElement(tagName);
    htmlElement.className = className;
    htmlElement.innerHTML = htmlContent;
    return htmlElement;
}

/**
 * Function that generates an array of random unique numbers between two values (both included).
 *
 * @param minNum The minimum interval for the random generated numbers
 * @param maxNum The maximum interval for the random generated numbers
 * @param elements The number of elements to be generated
 * @returns The list of random unique generated numbers, or an empty array if it is not possibile to generate that amount of numbers within the given interval.
 */
function getRandomUniqueNumber( minNum, maxNum, elements ){
    const numbersList = [];

    if ( (maxNum - minNum) < elements ){
        return [];
    }

    while (numbersList.length < elements){
        const newRandomNumber = getRandomInt(minNum, maxNum);
        if (!numbersList.includes(newRandomNumber)){
            numbersList.push(newRandomNumber);
        }
    }

    return numbersList;
}

/**
 * Function that generates a random number (not secure) between two values, both included.
 *
 * @param minumNumber the included minium value of the random generated number range.
 * @param maximumNumber the included maximum value of the random generated number range
 * @returns A randomly generated number.
 */
function getRandomInt(minumNumber, maximumNumber){
    const randomNumber = Math.floor( Math.random() * ( maximumNumber - minumNumber +1) + minumNumber);

    return randomNumber;
}