const Player = (name, number, selection) => {
    const switchMark = () => {
        let otherPlayer;
        if(number == 1) {
            otherPlayer = playerTwo;
        } else if(number == 2) {
            otherPlayer = playerOne;
        }
        
        if(selection == undefined) {
            selection = "X";
            otherPlayer.selection = "O";
        } else if(selection == "X") {
            selection = "O";
            otherPlayer.selection = "X";
        } else if(selection == "O") {
            selection = "X";
            otherPlayer.selection = "O";
        }       
        playerOneMark.textContent = selection;
        playerTwoMark.textContent = otherPlayer.selection;      
    }

    const addMark = (e) => {
        e.target.textContent = selection;
        gameBoardArr[e.target.id] = selection;
    }

    return {switchMark, addMark}
}

const playerOne = Player("Player One", 1);
const playerTwo = Player("Player Two", 2);

const gameSpots = Array.from(document.querySelectorAll(".game-spot"));
gameSpots.forEach(spot => addEventListener("click", playerOne.addMark))
const playerOneMark = document.querySelector("#player-one-mark");
playerOneMark.addEventListener("click", playerOne.switchMark);
const playerTwoMark = document.querySelector("#player-two-mark");
playerTwoMark.addEventListener("click", playerTwo.switchMark);
let gameBoardArr = ["", "", "", "", "", "", "", "", ""]

function renderBoard(boardArr) {
    gameSpots.forEach(spot => {
        spot.textContent = boardArr[spot.id];
    })
}

renderBoard(gameBoardArr);


