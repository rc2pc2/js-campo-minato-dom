const playButton = document.querySelector('header button.button-play');

const gridElement = document.querySelector('div.grid');

playButton.addEventListener(('click'), function(){
    gridElement.innerHTML = "";

    for (let index = 0; index < 100; index++) {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.innerHTML = `
            <p>
                ${index + 1}
            </p>`;

        newCell.addEventListener('click', function(){
            console.log(index + 1);
            newCell.classList.toggle('active');
        });

        gridElement.appendChild(newCell);
    }
});

