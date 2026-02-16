const gameBoard =(function(){
    let board =[[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

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
        if(row > board.length || row < 1){
            throw Error("Your row number must be an integer between 1 and 3");
        }else if(column > board[0].length || column < 1){
            throw Error("Your column number must be an integer between 1 and 3")
        }
        //test
        console.log(mark);
        board[row][column]= mark;
    };

    const checkBoard = function(){
        //first row check
        if(board[0][0]!==" " && board[0][0] === board[0][1] && board[0][0] === board[0][2]){
            return board[0][0];
        }
        //second row check
        else if(board[1][0]!==" " && board[1][0] === board[1][1] && board[1][0] === board[1][2]){
            return board[1][0];
        }
        //third row check
        else if(board[2][0]!==" " && board[2][0] === board[2][1] && board[2][0] === board[2][2]){
            return board[2][0];
        }
        //left column check
        else if(board[0][0]!==" " && board[0][0] === board[1][0] && board[0][0] === board[2][0]){
            return board[0][0];
        }
        //center column check
        else if(board[0][1]!==" " && board[0][1] === board[1][1] && board[0][1] === board[2][1]){
            return board[0][1];
        }
        //right column check
        else if(board[0][2]!==" " && board[0][2] === board[1][2] && board[0][2] === board[2][2]){
            return board[0][2];
        }    
        //upper left to lower right diagonal check
        else if(board[0][0]!==" " && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
            return board[0][0];
        }
        //upper right to lower left diagonal check
        else if(board[2][0]!==" " && board[2][0] === board[1][1] && board[2][0] == board[0][2]){
            return board[2][0];
        }
        else{
            return " ";
        }
    };

    return {showBoard, addMark, resetBoard, checkBoard};
})();

function Player(name, number){
    const playerName = name;
    const playerNumber = number;
    let score = 0;

    const getName = () => {return playerName};
    const getNumber = () => {return playerNumber};
    const getScore =() => {return score};
    const increaseScore = () => score ++;

    return {getName, getNumber, getScore, increaseScore};
};

const gameMaster = (function(){
    //TODO: method for each player turn
    const play = function(){
        let name1 = prompt("Player 1 name: ");
        let name2 = prompt("Player 2 name: ");
        const player1 = Player(name1, 1);
        const player2 = Player(name2, 2);
        for(let turn =0; turn<5; turn++){
            let place=prompt(`${player1.getName()} turn, add your X`);
            let [row, column] = place.split(' ');
            //test
            console.log(Number.parseInt(row), Number.parseInt(column));

            gameBoard.addMark(player1, Number.parseInt(row), Number.parseInt(column));
            place=prompt(`${player2.getName()} turn, add your O`);
            [row, column] = place.split(' ');
            //test
            console.log(row, column);

            gameBoard.addMark(player2, Number.parseInt(row), Number.parseInt(column));
            gameBoard.showBoard();
            if(turn>=3){
                let result=gameBoard.checkBoard();
                if(result === "X"){
                    console.log(`${player1.getName()} wins!`);
                }else if(result === "O"){
                    console.log(`${player2.getName()} wins!`);
                }else if(turn === 4){
                    console.log("Tie!");
                }else{
                    continue;
                }
            }
        }
    };
    
    return {play};
    //TODO: method to determine the winner
})();

gameMaster.play();