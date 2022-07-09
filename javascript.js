
//factory for the gameBoard
const GameBoard = () => {
    let boardState = [                // will use this array to check the board state and declare game state
    'O', 'O', '',
    'X', '', '',
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

    const toggleWinState = () => {
        displayController.updateText(playerName);
        winState = true;
    }

    const checkWinState = (currentBoard, playerName, symbol) => {
        let i = 0;
        let iR = 0;
        while (i < 9){
            if (currentBoard[i] === symbol && currentBoard[i+1] === symbol  && currentBoard[i+2] === symbol){   //check columns
                return true;
            } else if (currentBoard[iR] === symbol && currentBoard[iR+3] === symbol && currentBoard[iR+6] === symbol){  //check rows
                return true;
            } else if (currentBoard[0] === symbol && currentBoard[4] === symbol && currentBoard[8] === symbol){
                return true;
            } else if (currentBoard[2] === symbol && currentBoard[4] === symbol && currentBoard[6] === symbol){
                return true;
            }
            i+=3;
            iR++;
        }
        i = 0;
    }

    return {updateBoardState, boardStateEmptyCheck, boardState, getWinState, toggleWinState, checkWinState};
};

//factory for the players
const Player = (userName, symbol) => {
    const getUserName = () => userName;
    const getSymbol = () => symbol;

    return {getUserName, getSymbol};
};

//module to control the flow of the game. 
const gameFlow = (() => {
    let i = 0;
    // assigns the turn order based on a simple toggle. this turn order then allows either an X or O to be placed.
    const turnOrder = (columnID, gameType, oneName, oneSymbol, twoName, twoSymbol) => {
        if (!gameBoardObject.boardStateEmptyCheck(columnID) || gameBoardObject.getWinState()){
            return;
        } else if ((i % 2) === 0){
            gameBoardObject.updateBoardState(columnID, oneSymbol);
            displayController.updateGrid(columnID, oneSymbol, twoName);
            if (gameBoardObject.checkWinState(gameBoardObject.boardState, oneName, oneSymbol)){
                gameBoardObject.toggleWinState();
            };
            if (gameType === 'easy' && !gameBoardObject.getWinState()){
                playerTwoTurn(playerModule.easyAIAction(gameBoardObject.boardState), twoName, twoSymbol, oneName);//add logic to easy ai module. pass on the boardState through to the function. function will return a position on the array. use that to update everything.
                i++;
            };
            if (gameType === 'hard' && !gameBoardObject.getWinState()){
                playerModule.hardAIAction(gameBoardObject.boardState);
            }
        } else if (gameType === 'two'){
            playerTwoTurn(columnID,twoName, twoSymbol, oneName);
        } 
        i++;
        
        if (i === 9 && !gameBoardObject.getWinState()){
            displayController.updateText('draw');
        }
    }

    const playerTwoTurn = (columnID, twoName, twoSymbol, oneName) => {
        gameBoardObject.updateBoardState(columnID, twoSymbol);
        displayController.updateGrid(columnID, twoSymbol, oneName);
        gameBoardObject.checkWinState(gameBoardObject.boardState, twoName, twoSymbol);
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
                column.addEventListener('mousedown', () => gameFlow.turnOrder(column.id, gameType, playerModule.getPOneName(), playerModule.getPOneSymbol(), playerModule.getPTwoName(), playerModule.getPTwoSymbol()));         
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
    const playerOneNameDisplay = document.querySelector('#playerOneNameDisplay');
    const playerTwoNameDisplay = document.querySelector('#playerTwoNameDisplay');

    startGameBtn.addEventListener('click', () => {
        playerModule.getPlayerName();
        document.getElementById('popUpEnterPlayerContainer').style.display = 'none';
        document.getElementById('restart').style.display = 'flex';
        playerOneNameDisplay.textContent = `${playerModule.getPOneName()}'s`;
        playerTwoNameDisplay.textContent = `${playerModule.getPTwoName()}'s`;
        generateGrid();
        turnText.textContent = `${playerModule.getPOneName()}'s turn`;
    })

    // select player buttons
    const twoPlayerBtn = document.querySelector('#twoPlayerBtn');
    const easyAIBtn = document.querySelector('#easyAIBtn');
    const hardAIBtn = document.querySelector('#impossibleAIBtn');
    let gameType = null;

    twoPlayerBtn.addEventListener('click', () => {
        document.getElementById('popUpEnterPlayerContainer').style.display = 'flex';
        document.getElementById('popUpPlayerSelectContainer').style.display = 'none';
        gameType = 'two';
    });

    easyAIBtn.addEventListener('click', () => {
        document.getElementById('popUpEnterPlayerContainer').style.display = 'flex';
        document.getElementById('popUpPlayerSelectContainer').style.display = 'none';
        document.getElementById('playerTwoPopUp').style.display = 'none';
        gameType = 'easy';
    });

    hardAIBtn.addEventListener('click', () => {
        document.getElementById('popUpEnterPlayerContainer').style.display = 'flex';
        document.getElementById('popUpPlayerSelectContainer').style.display = 'none';
        document.getElementById('playerTwoPopUp').style.display = 'none';
        gameType = 'hard';
    });

    const pushGameType = () => {
        return gameType;
    }

    return {updateGrid, updateText, pushGameType};
})();

const playerModule = (() => {
    const playerOneName = document.querySelector('#playerOneName');
    const playerTwoName = document.querySelector('#playerTwoName');
    let playerOne = '';
    let playerTwo = '';
    
    function getPlayerName(){
        playerOne = Player(playerOneName.value, 'X'); 
        if (displayController.pushGameType() === 'easy'){
            playerTwo = Player('Easy Bot', 'O');
        } else if (displayController.pushGameType() === 'hard'){
            playerTwo = Player('Hard Bot', 'O');
        } else {
            playerTwo = Player(playerTwoName.value, 'O');
        }
    }

    const getPOneName = () => playerOne.getUserName();
    const getPOneSymbol = () => playerOne.getSymbol();
    const getPTwoName = () => playerTwo.getUserName();
    const getPTwoSymbol = () => playerTwo.getSymbol();

    const easyAIAction = (boardState) => {
        let randNum = Math.floor(Math.random()*9);
        let i = 0;
        while (i < 8){
            if (!boardState[randNum]){
                return randNum;
            }
            randNum = Math.floor(Math.random()*9);
            i++;
        }
    }

    //gameBoardObject.checkWinState(oneName, oneSymbol);

    const minMax = (boardState, columnId) => {
        let tempBoard = boardState;
        tempBoard[columnId] = 'O';
        if (gameBoardObject.checkWinState(tempBoard, 'Hard Bot', 'O')){
            tempBoard[columnId] = '';
            return 10;
        } else {
            tempBoard[columnId] = '';
            return 0;
        }
    }

    const hardAIAction = (boardState) => {
        console.log(boardState);
        let moves = [];
        let value = [];

        let i = 0;
        while (i < 9) {
            if (boardState[i] === ''){
                value.push(minMax(boardState, i));
                moves.push(i);
            };
            i++;
        }
    };


    return {getPOneName, getPOneSymbol, getPTwoName, getPTwoSymbol, easyAIAction, getPlayerName, hardAIAction};
})();


let gameBoardObject = GameBoard();