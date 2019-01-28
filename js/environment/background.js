class Background {
  constructor(game) {
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.dx = 2; // Increment of background position
    this.image = new Image();
    this.image.src = 'resources/images/stars.jpg';
  }

  move() {
    // Moves the background to the left
    this.x -= this.dx;
    if (this.x < -this.game.board.width) this.x = 0;
  }

  draw() {
    // Draws two identical background images for rendering in Canvas while they move from right to left
    this.game.ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.game.board.width,
      this.game.board.height
    );
    this.game.ctx.drawImage(
      this.image,
      this.x + this.game.board.width,
      this.y,
      this.game.board.width,
      this.game.board.height
    );
  }
}
