const gameSpots = Array.from(document.querySelectorAll(".game-spot"));
const newGameBtn = document.querySelector("#newgame-btn");
const gamemodeBtn = document.querySelector("#gamemode-btn");

const gameboard = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];
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
    
    const winningCombinationsStr = winningCombinationsArray.map(item => String(item));

    let winner;
    const winnerCheck = () => {
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

    return {renderBoard, updateBoardArray, wipeBoard, winnerCheck, availableSpots};
})();

const Player = (mark, human) => {
    const getMark = () => mark;
    return {getMark};
}

const flowControl = (() => {
    let gamemode = gamemodeBtn.textContent;
    const switchMode = () => {
        if(gamemode == "PLAYER VS PLAYER") {
            gamemode = "PLAYER VS COMPUTER";
        } else if(gamemode == "PLAYER VS COMPUTER") {
            gamemode = "PLAYER VS PLAYER";
        }
        gamemodeBtn.textContent = gamemode;
        console.log(gamemode);
    }
    gamemodeBtn.addEventListener("click", switchMode);
    
    const playerOne = Player("X");
    const playerTwo = Player("O");
    let activePlayer = playerOne;
    
    const switchPlayer = () => {
        if(activePlayer == playerOne) {
            activePlayer = playerTwo;
        } else if(activePlayer == playerTwo) {
            activePlayer = playerOne;
        }
    }
    
    const addMark = (e) => {
        let targetedDiv = e.target;
        if(targetedDiv.textContent == "") {
            gameboard.updateBoardArray(targetedDiv.id, activePlayer.getMark());
            gameboard.renderBoard();
            gameboard.winnerCheck();
            console.log(gamemode);
            // idk why the mode keeps switching back to pvp even when pvc is on
            if(gamemode = "PLAYER VS PLAYER") {
                switchPlayer();
            } else if(gamemode == "PLAYER VS COMPUTER") {
                aiModule.makemove();
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

const aiModule = (() => {
    const makemove = () => {
        let availableSpots = gameboard.availableSpots();
        let selectedSpotIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
        gameboard.updateBoardArray(selectedSpotIndex, "O");
        return availableSpots;
    }
    return {makemove};
})()


gameSpots.forEach(spot => spot.addEventListener("click", flowControl.addMark));
newGameBtn.addEventListener("click", flowControl.newGame);