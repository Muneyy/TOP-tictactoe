const Module = (function () {
    const moduleGameBoard = {};
    const createPlayers = {}
    let squareArray = [];
    let playerArray = [];
    let randomArrayAI = [];
    const textResult = document.querySelector(".text-result");
    const playerOneResult = document.getElementById("player-1-result");
    const playerTwoResult = document.getElementById("player-2-result");
    let playerOneWins = 0;
    let playerTwoWins = 0;
    let gameIsOver = 0;
    let playingAI = 0;

    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener('click', () => {
        Module.moduleGameBoard.resetGame();
        Module.createPlayers.createPlayer();
        Module.createPlayers.resetAI();
        Module.moduleGameBoard.gameBoard();
    })

    const playAI = document.querySelector(".ai-button");
    playAI.addEventListener('click', () => {
        // Module.moduleGameBoard.resetGame();
        Module.moduleGameBoard.resetGame();
        Module.createPlayers.createPlayer();
        Module.moduleGameBoard.gameBoard();
        Module.createPlayers.resetAI();
        Module.createPlayers.createAI();
        // Module.moduleGameBoard.gameBoard();
    })


    //creates interactable square Object 
    const squareObject = (index, status) => {
        return {index, status};
    };

    const squareFactory = function (index) {
        const squareObj = squareObject(index, 0);
        // creating DOM element, does not include square object
        const square = document.createElement("div");
        if (index % 2 == 0) {
            square.classList.add("square-even");
        } else {
            square.classList.add("square-odd");
        }
        square.classList.add(`no${index}`);


        // Reminder!
        // it's better to create in a separate function for a cleaner code
        square.addEventListener('click', () => {
            let arrayIndex = index-1;
            
            // no object interaction yet
            // markes status of each clicked square as either 1 or 2
            // 1 is for player 1 and 2 is for player 2
            if (playingAI == 0) {
                if (playerArray[0].turn == 1 && squareArray[arrayIndex].status == 0) {
                    // square.classList.remove("marked-1");
                    square.classList.add("marked-0");
                    squareArray[arrayIndex].status = 1;
                    playerArray[0].turn = 0;
                } else if (playerArray[0].turn == 0 && squareArray[arrayIndex].status == 0) {
                    // square.classList.remove("marked-0");
                    square.classList.add("marked-1");
                    playerArray[0].turn = 1;
                    squareArray[arrayIndex].status = 2;
                }
    
                gameChecker();
            } else if (playingAI == 1 && randomArrayAI.length != 8) {
                if (playerArray[0].turn == 1 && squareArray[arrayIndex].status == 0) {
                    // square.classList.remove("marked-1");
                    square.classList.add("marked-0");
                    squareArray[arrayIndex].status = 1;
                    playerArray[0].turn = 0;
                    randomArrayAI.push(arrayIndex);
                    gameChecker();
                    if (gameIsOver != 1) {
                        turnAI(arrayIndex);
                        gameChecker();
                    }
                }
            } else if (playingAI == 1 && randomArrayAI.length == 8) {
                if (playerArray[0].turn == 1 && squareArray[arrayIndex].status == 0) {
                    // square.classList.remove("marked-1");
                    square.classList.add("marked-0");
                    squareArray[arrayIndex].status = 1;
                    playerArray[0].turn = 0;
                    gameChecker();
                }
            }
        })
        return [square, squareObj];
    };

    const turnAI = function (arrayIndex) {
        let random = Math.floor(Math.random()* 9);
        while (randomArrayAI.includes(random)) {
            random = Math.floor(Math.random()* 9);
        }
        if (squareArray[random].status == 0) {
            let squareDomAI = document.querySelector(`.no${random+1}`);
            squareDomAI.classList.add("marked-1");
            squareArray[random].status = 2;
            playerArray[0].turn = 1;
        }
        console.log(random);
        randomArrayAI.push(random);

    }

    moduleGameBoard.gameBoard = function () {

        // This block is to reset the board
        const content = document.querySelector(".content");
        const div = document.querySelector(".container");
        content.removeChild(div)
        const replacement = document.createElement("div")
        replacement.classList.add("container");
        content.appendChild(replacement);
        // This block is to reset the board

        if (squareArray.length == 0) {
            for (i=1; i < 10; i++) {
                let squareResult = squareFactory(i);
                squareArray.push(squareResult[1]);
                document.querySelector(".container").appendChild(squareResult[0]);
                // console.log(squareResult[1].status);
                // console.log(`This is the value of i: ${i}`);
            };
            
        };
        
    };

    const playerFactory = function (name, turn, score) {
        return {name, turn, score};
    };

    createPlayers.createPlayer = function () {
        for (i=0; i<2; i++) {
            let player = playerFactory(i, 0, 0);
            playerArray.push(player);
        };
        playerArray[0].turn = 1;
    };

    createPlayers.createAI = function () {
        playingAI = 1;
        randomArrayAI = [];
        playAI.classList.add("ai-toggle");
    }

    createPlayers.resetAI = function () {
        playingAI = 0;
        randomArrayAI = [];
        playAI.classList.remove("ai-toggle");
    }

    // makes the game invalid because program does not recognize turn = 3
    const gameOver = function (winner) {
        playerArray[0].turn = 3;
        playerArray[1]. turn = 3;
        randomArrayAI = [];
        if (winner == 1 && gameIsOver == 0) {
            playerOneWins += 1;
            playerOneResult.textContent = `${playerOneWins}`
        } else if (winner == 2 && gameIsOver == 0) {
            playerTwoWins += 1;
            playerTwoResult.textContent = `${playerTwoWins}`
        }
        gameIsOver = 1;
    }


    const gameChecker = function () {
        //win conditions for player 1
        if (squareArray[0].status == 1 && squareArray[1].status == 1 && squareArray[2].status == 1) {
            textResult.textContent = "Player 1 has won the game!";
            gameOver(1);
        } else if (squareArray[3].status == 1 && squareArray[4].status == 1 && squareArray[5].status == 1) {
            textResult.textContent = "Player 1 has won the game!";
            gameOver(1);
        } else if (squareArray[6].status == 1 && squareArray[7].status == 1 && squareArray[8].status == 1) {
            textResult.textContent = "Player 1 has won the game!";
            gameOver(1);
        } else if (squareArray[0].status == 1 && squareArray[3].status == 1 && squareArray[6].status == 1) {
            textResult.textContent = "Player 1 has won the game!";
            gameOver(1);
        } else if (squareArray[1].status == 1 && squareArray[4].status == 1 && squareArray[7].status == 1) {
            textResult.textContent = "Player 1 has won the game!";
            gameOver(1);
        } else if (squareArray[2].status == 1 && squareArray[5].status == 1 && squareArray[8].status == 1) {
            textResult.textContent = "Player 1 has won the game!";
            gameOver(1);
        } else if (squareArray[0].status == 1 && squareArray[4].status == 1 && squareArray[8].status == 1) {
            textResult.textContent = "Player 1 has won the game!";
            gameOver(1);
        } else if (squareArray[2].status == 1 && squareArray[4].status == 1 && squareArray[6].status == 1) {
            textResult.textContent = "Player 1 has won the game!";
            gameOver(1);
        }

        //win conditions for player 1
        if (squareArray[0].status == 2 && squareArray[1].status == 2 && squareArray[2].status == 2) {
            textResult.textContent = "Player 2 has won the game!";
            gameOver(2);
        } else if (squareArray[3].status == 2 && squareArray[4].status == 2 && squareArray[5].status == 2) {
            textResult.textContent = "Player 2 has won the game!";
            gameOver(2);
        } else if (squareArray[6].status == 2 && squareArray[7].status == 2 && squareArray[8].status == 2) {
            textResult.textContent = "Player 2 has won the game!";
            gameOver(2);
        } else if (squareArray[0].status == 2 && squareArray[3].status == 2 && squareArray[6].status == 2) {
            textResult.textContent = "Player 2 has won the game!";
            gameOver(2);
        } else if (squareArray[1].status == 2 && squareArray[4].status == 2 && squareArray[7].status == 2) {
            textResult.textContent = "Player 2 has won the game!";
            gameOver(2);
        } else if (squareArray[2].status == 2 && squareArray[5].status == 2 && squareArray[8].status == 2) {
            textResult.textContent = "Player 2 has won the game!";
            gameOver(2);
        } else if (squareArray[0].status == 2 && squareArray[4].status == 2 && squareArray[8].status == 2) {
            textResult.textContent = "Player 2 has won the game!";
            gameOver(2);
        } else if (squareArray[2].status == 2 && squareArray[4].status == 2 && squareArray[6].status == 2) {
            textResult.textContent = "Player 2 has won the game!";
            gameOver(2);
        }

        
    }

    moduleGameBoard.resetGame = function () {
        squareArray = [];
        playerArray = [];
        textResult.textContent = "One more round!";
        // moduleGameBoard.gameBoard();
        gameIsOver = 0;
    }

    return {
        moduleGameBoard: moduleGameBoard, 
        createPlayers: createPlayers
    };
})();

Module.createPlayers.createPlayer();
Module.moduleGameBoard.gameBoard();

