const gameSpots = Array.from(document.querySelectorAll(".game-spot"));
const newGameBtn = document.querySelector("#newgame-btn");
const gamemodeBtn = document.querySelector("#gamemode-btn");

const gameboard = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];
    
    const printBoard = () => {
        console.log(boardArray);
    }

    const updateBoardArray = (spot, mark) => {
        boardArray[spot] = mark;
    }

    const renderBoard = () => {
        gameSpots.forEach(spot => spot.textContent = boardArray[spot.id]);
    }

    const wipeBoard = () => {
        boardArray = boardArray.map(item => "");
        winner = undefined;
        gameSpots.forEach(spot => spot.disabled = false);
    }

    // combinations of the same mark (X or O) on a board that warrant a victory
    const winningCombinationsArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    // converted to string in order to compare with selections made by players
    const winningCombinationsStr = winningCombinationsArray.map(item => String(item));

    // function checking whether, based on board, there is a winner
    const winnerCheck = () => {    
        let winner;
        let xIndices = boardArray.map((item, index) => {
            if(item == "X") {
                return index;
            }
        });

        let oIndices = boardArray.map((item, index) => {
            if(item == "O") {
                return index;
            }
        });

        xIndices = String(xIndices.filter(element => element != undefined).sort());
        oIndices = String(oIndices.filter(element => element != undefined).sort());
        winningCombinationsStr.forEach(combination => {
            if(xIndices.includes(combination)) {
                winner = "Player One (X)";
            } else if(oIndices.includes(combination)) {
                winner = "Player Two (O)";
            }
        });
        if(winner != undefined) {
            alert(`The winner is ${winner}!`);
            gameSpots.forEach(spot => spot.disabled = true);
        } else if(winner == undefined && !boardArray.includes("")) {
            alert(`It's a tie!`);
        }
    }

    // generate an array of unoccupied spots on the board
    let availableSpots = () => {
        avSpot = boardArray
        .map((spot, index) =>  {
            if(spot == "") {
                return index;
            }
        })
        .filter(item => item != undefined);
        return avSpot;
    }

    return {renderBoard, updateBoardArray, wipeBoard, winnerCheck, availableSpots, printBoard};
})();

// factory function for players
const Player = (mark) => {
    const getMark = () => mark;
    return {getMark};
}

// module for the control of the game flow
const flowControl = (() => {
    // section controlling the pvp and pvc modes
    /* THIS NEEDS SOME WORK */
    let gamemode = "PLAYER VS COMPUTER";
    const switchMode = () => {
        if(gamemode == "PLAYER VS PLAYER") {
            gamemode = "PLAYER VS COMPUTER";
        } else if(gamemode == "PLAYER VS COMPUTER") {
            gamemode = "PLAYER VS PLAYER";
        }
        gamemodeBtn.textContent = gamemode;
    }
    gamemodeBtn.addEventListener("click", switchMode);
    
    // create the players, "X" is always first
    const playerOne = Player("X");
    const playerTwo = Player("O");
    let activePlayer = playerOne;
    
    // function for switching the current active player
    const switchPlayer = () => {
        if(activePlayer == playerOne) {
            activePlayer = playerTwo;
        } else if(activePlayer == playerTwo) {
            activePlayer = playerOne;
        }
    }
    
    // function for marking the selected board spot
    const addMark = (e) => {
        let targetedDiv = e.target;
        // check if the selected spot is unoccupied
        if(targetedDiv.textContent == "") {
            // update the array holding the board with the active player's mark
            gameboard.updateBoardArray(targetedDiv.id, activePlayer.getMark());
            gameboard.renderBoard();
            gameboard.winnerCheck();
            // if it's pvp, switch to the other player
            // if it's pvc, make the AI decision
            /* THIS NEEDS SOME WORK */
            if(gamemode = "PLAYER VS PLAYER") {
                switchPlayer();
            } else if(gamemode == "PLAYER VS COMPUTER") {
                ai.makemove();
                    gameboard.renderBoard();
                    console.log(gameboard.winnerCheck());
                    gameboard.printBoard();
            }
        }
    }

    const newGame = () => {
        gameboard.wipeBoard();
        gameboard.renderBoard();
        activePlayer = playerOne;
    }

    return {addMark, newGame};
})();

// AI module to control the behaviour in the pvc mode
/* THIS NEEDS SOME WORK */
const ai = (() => {
    // function to make a move by AI
    const makemove = () => {
        let availableSpots = gameboard.availableSpots();
        let selectedSpotIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
        gameboard.updateBoardArray(selectedSpotIndex, "O");
    }
    return {makemove};
})();


gameSpots.forEach(spot => spot.addEventListener("click", flowControl.addMark));
newGameBtn.addEventListener("click", flowControl.newGame);