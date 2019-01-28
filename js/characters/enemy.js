class Enemy {
  constructor(game) {
    this.game = game;
    this.life = 300;
    this.w = 120;
    this.h = (515 * this.w) / 974;
    this.x = this.game.board.width;
    this.y = Math.floor(Math.random() * (this.game.board.height - this.h));
    this.vx = 10;
    this.vy = 10;
    this.image = new Image();
    this.image.src = 'resources/images/enemy.png';
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x -= this.vx / TIME_DELTA;
    this.y += this.vy / TIME_DELTA;

    if (this.y + this.h > this.game.board.height) {
      this.vy *= -1;
    } else if (this.y < 0) {
      this.vy *= -1;
    }

    if (this.x < this.game.board.width / 2) {
      this.vx = 0;
    }

    this.game.enemies = this.game.enemies.filter(enemy => {
      return enemy.x > -enemy.w;
    });
  }

  shoot() {
    let phaser = new enemyPhaser(this.game);

    phaser.x = this.x - 20;
    phaser.y = this.y + 35;
    this.game.enemyPhasers.push(phaser);
  }
}
