const gameSpots = Array.from(document.querySelectorAll(".game-spot"));
const newGameBtn = document.querySelector("#newgame-btn");

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

    return {renderBoard, updateBoardArray, wipeBoard, winnerCheck};
})();

const Player = (mark) => {
    const getMark = () => mark;
    return {getMark};
}

const flowControl = (() => {
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
            switchPlayer();
        }
    }

    const newGame = () => {
        gameboard.wipeBoard();
        gameboard.renderBoard();
        activePlayer = playerOne;
    }

    return {addMark, newGame};
})();

gameSpots.forEach(spot => spot.addEventListener("click", flowControl.addMark));
newGameBtn.addEventListener("click", flowControl.newGame);