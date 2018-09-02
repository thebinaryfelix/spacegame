class Phaser {
    constructor(game) {

        this.game = game;

        this.x = 0;
        this.y = 0;

        this.vx = 10;

        this.w = 100;
        this.h = 100;

        this.image = new Image();
        this.image.src = "images/phaser.png";
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.x + SPACESHIP_W*0.55, this.y - 16, this.w, this.h);
    }

    move() {
        this.x += this.vx;
    };
}