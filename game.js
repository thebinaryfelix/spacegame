class Game {
    constructor(boardName) {
        this.board = document.getElementById(boardName);
        this.board.width = window.innerWidth;
        this.board.height = window.innerHeight;
        this.ctx = this.board.getContext("2d");

        this.background = new Background(this);
        this.spaceship = new Spaceship(this);
    }

    startGame() {
        this.interval = setInterval(
            () => {
                this.draw();
                this.move();
                this.spaceship.setAction(playerInput(PLAYER_CONTROLS));
            },
            TIME_DELTA
        );
    }

    draw() {
        this.background.draw();
        this.spaceship.draw();
    }

    move() {
        this.background.move();
        this.spaceship.move();
    }
}