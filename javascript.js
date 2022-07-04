const gameBoard = (() => {
    const generateGrid = () => {
        const playGrid = document.querySelector('#playGrid');
    
        let iRow = 0;
        let arrayNum = 0;
        while (iRow < 3){
            const row = document.createElement('div');
            row.className = 'rows';
            playGrid.appendChild(row);
    
            let iColumn = 0;
            while (iColumn < 3){
                const column = document.createElement('div');
                column.className = `columns ${arrayNum}`;
                column.id = arrayNum;
                row.appendChild(column);
                column.addEventListener('mousedown', testFunction);         
                arrayNum++;
                iColumn++;
            }
        iRow++;
        };
    };
    const boardState = [                // will use this array to check the board state and declare game state
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    return {generateGrid, boardState};
})();

const testFunction = () => {
    console.log('test');
}

// dictate player turn order and assigning either a O or X based on turn order. follows a simple toggle
const gameFlow = (() => {
    let i = 0;
    const turnOrder = () => {
        let turnText = document.querySelector('#turnTextBox');
        if (i % 2 === 0){
            turnText.textContent = `${playerOne}'s Turn!`;
        } else{
            turnText.textContent = `${playerTwo}'s Turn!`;
        }
        i++
    }

    const playerAction = (num) => {
        if (i % 2 === 0){
            console.log(num);
        }
        turnOrder();
    }
    console.log(i);
    return {turnOrder, playerAction};
})();


const playerOne = 'Player One';
const playerTwo = 'Player Two';

gameBoard.generateGrid();
gameFlow.turnOrder();
console.log(gameBoard.boardState);