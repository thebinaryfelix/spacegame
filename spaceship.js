class Spaceship {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = this.game.board.height / 2;

        this.directionX = 0;
        this.directionY = 0;

        this.image = new Image();
        this.image.src = "images/spaceship.png";

        this.speed = 100;
        this.phasers = [];
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.x, this.y, SPACESHIP_W, SPACESHIP_H);
        this.phasers.forEach(function (phaser) {
            phaser.draw();
        })
    }

    setBoardLimits() {
        let limit = {
            w: this.game.board.width,
            h: this.game.board.height
        };

        if (this.x < 0) {
            this.x = 0;
            return false;
        } else if (this.x + SPACESHIP_W > limit.w) {
            this.x = limit.w - SPACESHIP_W;
            return false;
        } else if (this.y < 0) {
            this.y = 0;
            return false;
        } else if (this.y + SPACESHIP_H > limit.h) {
            this.y = limit.h - SPACESHIP_H;
            return false;
        } else {
            return true;
        }
    };

    setAction(action) {
        document.onkeyup = (event) => {
            if (event.keyCode === 32) {
                this.shoot();
            }
        }
        if (action.movingX == -1) {
            if (action.movingY == -1) {
                this.directionX = -DIAGONAL_COS;
                this.directionY = -DIAGONAL_COS;
            } else if (action.movingY == 1) {
                this.directionX = -DIAGONAL_COS;
                this.directionY = DIAGONAL_COS;
            } else {
                this.directionX = -1;
                this.directionY = 0;
            }
        } else if (action.movingX == 1) {
            if (action.movingY == -1) {
                this.directionX = DIAGONAL_COS;
                this.directionY = -DIAGONAL_COS;
            } else if (action.movingY == 1) {
                this.directionX = DIAGONAL_COS;
                this.directionY = DIAGONAL_COS;
            } else {
                this.directionX = 1;
                this.directionY = 0;
            }
        } else {
            if (action.movingY == -1) {
                this.directionX = 0;
                this.directionY = -1;
            } else if (action.movingY == 1) {
                this.directionX = 0;
                this.directionY = 1;
            } else {
                this.directionX = 0;
                this.directionY = 0;
            }
        }
    };

    move() {
        if (this.setBoardLimits()) {
            this.x += this.directionX * this.speed / TIME_DELTA;
            this.y += this.directionY * this.speed / TIME_DELTA;
        }
        
        this.phasers = this.phasers.filter((phaser) => {
            return phaser.x < this.game.board.width;
        })

        this.phasers.forEach(function (phaser) {
            phaser.move();
        })
    }

    shoot() {
        console.log("shoooooooting!!!");
        let phaser = new Phaser(this.game);

        phaser.x = this.x;
        phaser.y = this.y;

        this.phasers.push(phaser);
    }
}