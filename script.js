const gameBoard =(function(){
    let board =[[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    
    const displayMaster = (function(){

        const boardDiv = document.querySelector(".board");

        const createBoard = function(){
            for(let i = 0; i<3; i++){
                for(let j = 0; j<3; j++){
                    const cell = document.createElement("div");
                    cell.className = 'cell';
                    cell.dataset.row =`${i+1}`;
                    cell.dataset.column = `${j+1}`;
                    boardDiv.append(cell);
                }
            }
        };

        const showBoard = function(){
            const cells = boardDiv.childNodes;
            for(let i = 0; i<9; i++){
                let row = cells[i].dataset.row;
                let column = cells[i].dataset.column;
                cells[i].textContent=board[row-1][column-1];
            }
        };

        const getPlayersName = function(handle){
            const dialog = document.querySelector('dialog');
            dialog.showModal();

            const startButton = document.querySelector('#start');
            startButton.addEventListener('click',(e)=>{
                const player1Name = document.querySelector('#player1').value;
                const player2Name = document.querySelector('#player2').value;
                dialog.close();
                handle(player1Name, player2Name);
            });
        };

        return {createBoard, showBoard, getPlayersName};
    })();

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
        if(typeof row != 'number'|| row > board.length || row < 1){
            throw Error("Your row number must be an integer between 1 and 3");
        }else if(typeof column  != 'number'|| column > board[0].length || column < 1){
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

    return {displayMaster, addMark, resetBoard, checkBoard};
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
        gameBoard.displayMaster.createBoard();
        
        const boardDiv = document.querySelector(".board");
        const h1 = document.querySelector('h1');

        //player initialization
        gameBoard.displayMaster.getPlayersName(function(name1, name2){
            if(name1 === '' || name1 === null || name2 === '' || name2 === null){
                throw Error("Player names should not be empty");
            }else if(name1 === name2){
                throw Error("Player names must not be te same");
            }

            const player1 = Player(name1, 1);
            const player2 = Player(name2, 2);

            let currentTurn = player1;
            h1.textContent = `${currentTurn === player1 ? player1.getName() : player2.getName()} turn`;
            
            //game logic
            boardDiv.addEventListener('click', (e)=>{
                const cell = e.target.closest('.cell');
                if(!cell) return;

                const row = parseInt(cell.dataset.row);
                const column = parseInt(cell.dataset.column);

                //game turns logic
                gameBoard.addMark(currentTurn, row, column);
                gameBoard.displayMaster.showBoard();

                currentTurn = (currentTurn === player1 ? player2 : player1);
                h1.textContent = `${currentTurn === player1 ? player1.getName() : player2.getName()} turn`;

                //checking for a winner
                let winner = gameBoard.checkBoard();
                if(winner != ' '){
                    h1.textContent = `${winner === 'X'? player1.getName() : player2.getName()} wins!`;
                } 
            });
        });
    };
    
    return {play};
})();

gameMaster.play();