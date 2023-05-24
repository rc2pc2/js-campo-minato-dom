const playButton = document.querySelector('header button.button-play');
playButton.addEventListener(('click'), function(){
    startNewGame();
});

function startNewGame(){
    const gridElement = document.querySelector('div.grid');
    const level = parseInt(document.getElementById('level-select').value);

    let cellsNumber = 0;
    let cellsClass;

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

    gridElement.innerHTML = "";

    for (let index = 0; index < cellsNumber; index++) {
        const newCell = createElement('div','cell '+ cellsClass,
                        `<p>${index + 1}</p>`);

        newCell.addEventListener('click', function(){
            console.log(index + 1);
            this.classList.toggle('active'); // this === newCell
        });

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