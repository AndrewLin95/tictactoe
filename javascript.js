
//factory for the gameBoard
const GameBoard = (() => {
    let boardState = [                // will use this array to check the board state and declare game state
    '', '', '',
    '', '', '',
    '', '', ''
    ];

    const updateBoardState = (num, input) => {
        boardState[num] = input;
    }

    const checkWinState = () => {
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
    return {updateBoardState, checkWinState, boardState};
})();

//factory for the players
const Player = (userName, symbol) => {
    const getUserName = () => userName.value;
    const getSymbol = () => symbol;

    return {getUserName, getSymbol};
};

//module to control the flow of the game. 
const gameFlow = (() => {
    let i = 0;
    // assigns the turn order based on a simple toggle. this turn order then allows either an X or O to be placed.
    const turnOrder = (columnID) => {
        if(GameBoard.boardState === '' && (i % 2) === 0){
            GameBoard.updateBoardState(columnID, playerOne.getSymbol);
            
        } else {

        }
        i++;
    }
    return {turnOrder};
})();

// module for displayController
const displayController = (() => {
    // function to generate Grid
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
                column.addEventListener('mousedown', () => gameFlow.turnOrder(column.id));         
                arrayNum++;
                iColumn++;
            }
        iRow++;
        };
    }


    // restart game button
    const restartBtn = document.querySelector('#restart');
    restartBtn.addEventListener('click', () => {

    });

    // start game button
    const startGameBtn = document.querySelector('#startGame');
    const turnText = document.querySelector('#turnTextBox');
    startGameBtn.addEventListener('click', () => {
        generateGrid();
        turnText.textContent = `${playerOne.getUserName()}'s turn`;
    })

    return {};
})();

// querySelectors to generate players
const playerOneName = document.querySelector('#playerOneName');
const playerTwoName = document.querySelector('#playerTwoName');

let playerOne = Player(playerOneName, 'X'); 
let playerTwo = Player(playerTwoName, 'O');


