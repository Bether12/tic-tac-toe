const gameBoard =(function gameBoard(){
    let board =[['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' ']];

    const showBoard = function(){
        for (let row of board){
            console.log(`| ${row[0]} | ${row[1]} | ${row[2]} |`)
        }
    };

    const resetBoard = function(){
        board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    };

    const addMark = function(Player, row, column){
        let mark;
        if(Player.getNumber()===1){
            mark = 'X';
        }else{
            mark = 'O';
        }

        //edge cases handling
        if(row > board.length){
            throw Error("Your row number must be an integer between 1 and 3");
        }else if(column > board[0].length){
            throw Error("Your column number must be an integer between 1 and 3")
        }
    };

    return {showBoard, addMark};
})();

gameBoard.showBoard();