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
    }

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
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

        xIndices = xIndices.filter(element => element != undefined).sort();
        oIndices = oIndices.filter(element => element != undefined).sort();

        console.log(xIndices);
        console.log(oIndices);

        // NEED TO FIGURE OUT THE LOGIC TO FIGURE OUT THE WINNER AS SOON AS IT HAPPENS
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
