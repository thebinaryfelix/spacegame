class enemyPhaser {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.vx = 10;
    this.w = 60;
    this.h = (216 * this.w) / 322;
    this.damage = 50;
    this.image = new Image();
    this.image.src = 'resources/images/red_beam.png';
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x -= this.vx;
  }
}
