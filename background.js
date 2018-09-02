class Background {
    constructor(game) {
        this.x = 0;
        this.y = 0;
        this.game = game;

        this.dx = 2;

        this.image = new Image();
        this.image.src = "images/stars.jpg";
    }

    move() {
        this.x -= this.dx;
        if (this.x < -this.game.board.width) this.x = 0;
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.x, this.y, this.game.board.width, this.game.board.height);
        this.game.ctx.drawImage(this.image, this.x + this.game.board.width, this.y, this.game.board.width, this.game.board.height);
    };
}