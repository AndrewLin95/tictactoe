const restartBtn = document.querySelector('#restart');

// gameBoard Factory
const gameBoard = (() => {
    // function that generates the grid area
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
                const column = document.createElement('img');
                column.className = `columns ${arrayNum}`;
                column.id = arrayNum;
                row.appendChild(column);
                column.addEventListener('mousedown', () => gameFlow.playerAction(column.id));         
                arrayNum++;
                iColumn++;
            }
        iRow++;
        };
    };

    //function that checks the board state and possible win conditions
    const checkBoardState = () => {
        let i = 0;

        let playerName = '';
        if (turnTracker = 'X'){ 
            playerName = 'player One'
        } else {
            playerName = 'player Two'
        }

        while (i < 9){
            if (boardState[i] === turnTracker && boardState[i+1] === turnTracker  && boardState[i+2] === turnTracker){   //check columns
                alert(`${playerName} wins!`)
                gameFlow.clearBoard();
            } else if (boardState[i] === turnTracker && boardState[i+3] === turnTracker && boardState[i+6] === turnTracker){  //check rows
                alert(`${playerName} wins!`)
                gameFlow.clearBoard();
            } else if (boardState[0] === turnTracker && boardState[4] === turnTracker && boardState[8] === turnTracker){
                alert(`${playerName} wins!`)
                gameFlow.clearBoard();
            } else if (boardState[2] === turnTracker && boardState[4] === turnTracker && boardState[6] === turnTracker){
                alert(`${playerName} wins!`)
                gameFlow.clearBoard();
            }
            i += 3;
        }
        i = 0;
    }

    return {generateGrid, checkBoardState};
})();

const gameFlow = (() => {
    let i = 0;

    // assigns the turn order based on a simple toggle. this turn order then allows either an X or O to be placed.
    const turnOrder = () => {
        let turnText = document.querySelector('#turnTextBox');
        if ((i % 2) === 0){
            turnText.textContent = `${playerOne}'s Turn!`;
            turnTracker = 'X';
        } else {
            turnText.textContent = `${playerTwo}'s Turn!`;
            turnTracker = 'O';
        }
        i++;
    }
    
    // based on turn order, amends the playgrid div with an "X" or "O". boardstate is checked after each piece is placed.
    const playerAction = (num) => {
        if (boardState[num]){
            return;
        } else if (turnTracker === 'X'){
            document.getElementById(num).setAttribute('src', './Icons/x_icon.png');
            boardState[num] = 'X';
        } else {
            document.getElementById(num).setAttribute('src', './Icons/o_icon2.png');
            boardState[num] = 'O';
        }
        gameBoard.checkBoardState();
        turnOrder();
    }

    // resets the board
    const clearBoard = () => {
        let allGrid = document.querySelectorAll('.columns');
        allGrid.forEach((item) => {
            item.textContent = '';
        })
        i = 0;
        boardState = [               
        '', '', '',
        '', '', '',
        '', '', ''
        ];
        turnOrder();
    }

    return {turnOrder, playerAction, clearBoard};
})();

let turnTracker = 'X';      // default is X to start

let boardState = [                // will use this array to check the board state and declare game state
'', '', '',
'', '', '',
'', '', ''
];

restartBtn.addEventListener('click', gameFlow.clearBoard);

const playerOne = 'Player One';
const playerTwo = 'Player Two';

gameBoard.generateGrid();
gameFlow.turnOrder();