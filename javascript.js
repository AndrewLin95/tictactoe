
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

    const getWinState = () => {
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

    return {updateBoardState, boardStateEmptyCheck, boardState, getWinState, checkWinState};
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
    const turnOrder = (columnID, oneName, oneSymbol, twoName, twoSymbol) => {
        if (!gameBoardObject.boardStateEmptyCheck(columnID) || gameBoardObject.getWinState()){
            return;
        } else if ((i % 2) === 0){
            gameBoardObject.updateBoardState(columnID, oneSymbol);
            displayController.updateGrid(columnID, oneSymbol, twoName);
            gameBoardObject.checkWinState(oneName, oneSymbol);
        } else {
            gameBoardObject.updateBoardState(columnID, twoSymbol);
            displayController.updateGrid(columnID, twoSymbol, oneName);
            gameBoardObject.checkWinState(twoName, twoSymbol);
        }
        i++;
        
        if (i === 9 && !gameBoardObject.getWinState()){
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
                column.addEventListener('mousedown', () => gameFlow.turnOrder(column.id, playerModule.getPOneName(), playerModule.getPOneSymbol(), playerModule.getPTwoName(), playerModule.getPTwoSymbol()));         
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
        turnText.textContent = `${playerModule.getPOneName()}'s turn`;
    })

    return {updateGrid, updateText};
})();

const playerModule = (() => {
    const playerOneName = document.querySelector('#playerOneName');
    let playerOne = Player(playerOneName, 'X'); 
    const playerTwoName = document.querySelector('#playerTwoName');
    let playerTwo = Player(playerTwoName, 'O');

    const getPOneName = () => playerOne.getUserName();
    const getPOneSymbol = () => playerOne.getSymbol();
    const getPTwoName = () => playerTwo.getUserName();
    const getPTwoSymbol = () => playerTwo.getSymbol();
    return {getPOneName, getPOneSymbol, getPTwoName, getPTwoSymbol};
})();


let gameBoardObject = GameBoard();