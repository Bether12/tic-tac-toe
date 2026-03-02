const gameBoard =(function(){
    let board =[[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    
    const displayMaster = (function(){

        const board = document.querySelector(".board");

        const createBoard = function(){
            for(let i = 0; i<3; i++){
                for(let j = 0; j<3; j++){
                    const cell = document.createElement("div");
                    cell.dataset.row =`${i}`;
                    cell.dataset.column = `${j}`;
                    board.append(cell);
                }
            }
        };

        const showBoard = function(
            
        ){};

        return {createBoard};
    })();

    //TODO: erase this function
    const showBoard = function(){
        for (let row of board){
            console.log(`| ${row[0]} | ${row[1]} | ${row[2]} |`)
        }
    };
    //TODO: erase this function
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
        if(typeof(row) != 'Number'|| row > board.length || row < 1){
            throw Error("Your row number must be an integer between 1 and 3");
        }else if(typeof(column) != 'Number'|| column > board[0].length || column < 1){
            throw Error("Your column number must be an integer between 1 and 3")
        }

        let rowZeroth = row-1;
        let columnZeroth = column-1;

        //position rewriting prevention
        if(board[rowZeroth][columnZeroth] === 'X' || board[rowZeroth][columnZeroth] === 'O'){
            throw Error("You can't add a mark to to a place with a existing one");
        }

        board[rowZeroth][columnZeroth]= mark;
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

    return {displayMaster, showBoard, addMark, resetBoard, checkBoard};
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
    const play = function(){
        //player initialization
        let name1 = prompt("Player 1 name: ");
        let name2 = prompt("Player 2 name: ");

        if(name1 === '' || name1 === null || name2 === '' || name2 === null){
            throw Error("Player names should not be empty");
        }else if(name1 === name2){
            throw Error("Player names must not be te same");
        }

        const player1 = Player(name1, 1);
        const player2 = Player(name2, 2);

        //game turns
        for(let turn =0; turn<4; turn++){
            let place=prompt(`${player1.getName()} turn, add your X`);
            let [row, column] = place.split(' ');
            gameBoard.addMark(player1, Number.parseInt(row), Number.parseInt(column));

            gameBoard.showBoard();
            
            place=prompt(`${player2.getName()} turn, add your O`);
            [row, column] = place.split(' ');
            gameBoard.addMark(player2, Number.parseInt(row), Number.parseInt(column));

            gameBoard.showBoard();

            //win or tie checking from round 2
            if(turn>=2){
                let result=gameBoard.checkBoard();
                if(result === "X"){
                    console.log(`${player1.getName()} wins!`);
                    return
                }else if(result === "O"){
                    console.log(`${player2.getName()} wins!`);
                    return
                }else if(turn === 4){
                    console.log("Tie!");
                    return
                }else{
                    continue;
                }
            }
        }
    };
    
    return {play};
})();

gameBoard.displayMaster.createBoard();

gameMaster.play();