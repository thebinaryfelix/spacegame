let keys = {};

$(function () {
    loadBoard();
})

loadBoard = () => {
    const demoGame = new Game("main-board");
    demoGame.startGame();
};

//Keyboard listeners
document.addEventListener("keydown", function (pressedKey) {
    keys[pressedKey.keyCode] = true;
    if (DEFAULT_KEY.indexOf(pressedKey.keyCode) != -1) {
        pressedKey.preventDefault();
    }
});

document.addEventListener("keyup", function (releasedKey) {
    keys[releasedKey.keyCode] = false;
});