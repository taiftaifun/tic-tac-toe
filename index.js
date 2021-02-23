const gameSpots = Array.from(document.querySelectorAll(".game-spot"));
const newGameBtn = document.querySelector("#newgame-btn");

const gameboard = (() => {
    const boardArr = ["", "", "", "", "", "", "", "", ""];
    const renderBoard = () => {
        gameSpots.forEach(spot => {
            spot.textContent = boardArr[spot.id];
        });
    }
    return {renderBoard, boardArr}; 
})();

const Player = (number, selection) => {
    const addMark = (e) => {
        gameboard.boardArr[e.target.id] = selection;
    }
    return {addMark, selection};
}

const gameflow = (() => {
    const playerOne = Player(1, "X");
    const playerTwo = Player(2, "O");
    let activePlayer = playerOne;
    const switchPlayers = () => {
        if(activePlayer == playerOne) {
            activePlayer = playerTwo;
        } else if(activePlayer == playerTwo) {
            activePlayer == playerOne;
        }
    }
    gameSpots.forEach(spot => {
        spot.addEventListener("click", (e) => {
            activePlayer.addMark(e);
            gameboard.renderBoard();
            switchPlayers();
        });
    })
    return {activePlayer};
})();

