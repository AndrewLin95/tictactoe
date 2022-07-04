const gameBoard = (() => {
    const generateGrid = () => {
        const playGrid = document.querySelector('#playGrid');
    
        let iRow = 0;
        while (iRow < 3){
            const row = document.createElement('div');
            row.className = 'rows';
            playGrid.appendChild(row);
    
            let iColumn = 0;
            while (iColumn < 3){
                const column = document.createElement('div');
                column.className = `columns ${iRow}_${iColumn}`;
                row.appendChild(column);
                //column.addEventListener('click', )         To add eventlistner and function for when these divs are clicked
                iColumn++;
            }
        iRow++;
        }
    }
    return {generateGrid};
})();


gameBoard.generateGrid();