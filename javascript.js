
//factory for the gameBoard
const GameBoard = () => {
    let boardState = [                // will use this array to check the board state and declare game state
    '', '', '',
    '', '', '',
    '', '', ''
    ];

    const updateBoardState = (num, input) => {
        boardState[num] = input;
    }

    const boardStateEmptyCheck = (columnID) => {
        if (boardState[columnID] === ''){
            return true;
        } 
        return false;
    }

    let winState = false;

    const winStateCheck = () => {
        if (winState === true){
            return true;
        }
    }

    const checkWinState = (playerName, symbol) => {
        let i = 0;
        let iR = 0;
        while (i < 9){
            if (boardState[i] === symbol && boardState[i+1] === symbol  && boardState[i+2] === symbol){   //check columns
                displayController.updateText(playerName);
                winState = true;
            } else if (boardState[iR] === symbol && boardState[iR+3] === symbol && boardState[iR+6] === symbol){  //check rows
                displayController.updateText(playerName);
                winState = true;
            } else if (boardState[0] === symbol && boardState[4] === symbol && boardState[8] === symbol){
                displayController.updateText(playerName);
                winState = true;
            } else if (boardState[2] === symbol && boardState[4] === symbol && boardState[6] === symbol){
                displayController.updateText(playerName);
                winState = true;
            }
            i+=3;
            iR++;
        }
        i = 0;
    }

    return {updateBoardState, boardStateEmptyCheck, boardState, winStateCheck, checkWinState};
};

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
        if (!gameBoardObject.boardStateEmptyCheck(columnID) || gameBoardObject.winStateCheck()){
            return;
        } else if ((i % 2) === 0){
            gameBoardObject.updateBoardState(columnID, playerOne.getSymbol());
            displayController.updateGrid(columnID, playerOne.getSymbol(), playerTwo.getUserName());
            gameBoardObject.checkWinState(playerOne.getUserName(), playerOne.getSymbol());
        } else {
            gameBoardObject.updateBoardState(columnID, playerTwo.getSymbol());
            displayController.updateGrid(columnID, playerTwo.getSymbol(), playerOne.getUserName());
            gameBoardObject.checkWinState(playerTwo.getUserName(), playerTwo.getSymbol());
        }
        i++;
        
        if (i === 9 && !winState){
            displayController.updateText('draw');
        }
    }

    const restartGame = () => {
        i = 0;
        
        gameBoardObject = GameBoard();
        let allGrid = document.querySelectorAll('.columns');
        allGrid.forEach((item) => {
            item.setAttribute('src', './Icons/blank.png');
        })
    }
    return {turnOrder, restartGame};
})();

// module for displayController
const displayController = (() => {
    const turnText = document.querySelector('#turnTextBox');
    
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

    // function to update the grid with the symbols
    const updateGrid = (columnID, symbol, playerName) => {
        document.getElementById(columnID).setAttribute('src', `./Icons/${symbol}_icon.png`);
        turnText.textContent = `${playerName}'s turn`;
    }

    const updateText = (name) => {
        if (name === 'draw'){
            turnText.textContent = `Draw!`;
        } else {
            turnText.textContent = `${name} wins!`;
        }
    }

    // restart game button
    const restartBtn = document.querySelector('#restart');
    restartBtn.addEventListener('click', () => {
        gameFlow.restartGame();
    });

    // start game button
    const startGameBtn = document.querySelector('#startGame');
    startGameBtn.addEventListener('click', () => {
        generateGrid();
        turnText.textContent = `${playerOne.getUserName()}'s turn`;
    })

    return {updateGrid, updateText};
})();

// querySelectors to generate players
const playerOneName = document.querySelector('#playerOneName');
const playerTwoName = document.querySelector('#playerTwoName');

let playerOne = Player(playerOneName, 'X'); 
let playerTwo = Player(playerTwoName, 'O');

let gameBoardObject = GameBoard();