class Spaceship {
  constructor(game) {
    this.game = game;
    this.life = 500;
    this.x = 0;
    this.y = this.game.board.height / 2;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = V_UNITS;
    this.image = new Image();
    this.image.src = 'resources/images/spaceship.png';
    this.phasers = [];
  }

  draw() {
    this.game.ctx.drawImage(this.image, this.x, this.y, SPACESHIP_W, SPACESHIP_H);
    this.phasers.forEach(phaser => {
      phaser.draw();
    });
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
  }

  setAction(action) {
    document.onkeyup = event => {
      if (event.keyCode === 32) {
        this.shoot();
      }
    };
    if (action.movingX == -1) {
      // Spaceship is moving to the left
      if (action.movingY == -1) {
        // Spaceship also moving up
        this.directionX = -DIAGONAL_COS;
        this.directionY = -DIAGONAL_COS;
      } else if (action.movingY == 1) {
        // Spaceship also moving down
        this.directionX = -DIAGONAL_COS;
        this.directionY = DIAGONAL_COS;
      } else {
        // Speceship only moving left
        this.directionX = -1;
        this.directionY = 0;
      }
    } else if (action.movingX == 1) {
      // Spaceship is moving to the right
      if (action.movingY == -1) {
        // Spaceship also moving up
        this.directionX = DIAGONAL_COS;
        this.directionY = -DIAGONAL_COS;
      } else if (action.movingY == 1) {
        // Spaceship also moving down
        this.directionX = DIAGONAL_COS;
        this.directionY = DIAGONAL_COS;
      } else {
        // Spaceship only moving right
        this.directionX = 1;
        this.directionY = 0;
      }
    } else {
      // Spaceship only moving on Y axe
      if (action.movingY == -1) {
        // Spaceship moving up
        this.directionX = 0;
        this.directionY = -1;
      } else if (action.movingY == 1) {
        // Spaceship moving down
        this.directionX = 0;
        this.directionY = 1;
      } else {
        // Spaceship stopped moving
        this.directionX = 0;
        this.directionY = 0;
      }
    }
  }

  move() {
    if (this.setBoardLimits()) {
      this.x += (this.directionX * this.speed) / TIME_DELTA;
      this.y += (this.directionY * this.speed) / TIME_DELTA;
    }

    this.checkPhaserImpact();
    this.checkDamageTaken();

    this.phasers = this.phasers.filter(phaser => {
      return phaser.x < this.game.board.width;
    });

    this.phasers.forEach(phaser => {
      phaser.move();
    });
  }

  shoot() {
    let phaser = new Phaser(this.game);
    const shootingSound = new Sound('resources/audio/goodShoot.wav');
    shootingSound.play();

    phaser.x = this.x + SPACESHIP_W * 0.55;
    phaser.y = this.y + 30;

    this.phasers.push(phaser);
  }

  checkPhaserImpact() {
    if (this.game.enemies != 0 && this.phasers.length != 0) {
      this.game.enemies.forEach(enemy => {
        this.phasers.forEach((phaser, idx) => {
          const impact = [
            phaser.x + phaser.w - 30 >= enemy.x, // [0] right side projectile impact
            phaser.x + phaser.w - 30 <= enemy.x + enemy.w, // [1] left side projectile impact
            phaser.y >= enemy.y, // [2] upper side projectile impact
            phaser.y + phaser.h >= enemy.y, // [3] lower side projectile impact
            phaser.y <= enemy.y + enemy.h // [4] upper side enemy impacting with projectile
          ];
          if (impact[0] && impact[1] && (impact[2] || impact[3]) && impact[4]) {
            enemy.life = enemy.life - phaser.damage;
            this.phasers.splice(idx, 1);
          }
        });
      });
    }
  }

  checkDamageTaken() {
    if (this.game.enemyPhasers.length !== 0) {
      this.game.enemyPhasers.forEach((enemyPhaser, idx) => {
        const impact = [
          enemyPhaser.x <= this.x + SPACESHIP_W - 30, // [0] left side projectile impact on ship's right side
          enemyPhaser.x >= this.x, // [1] right side projectile impact on ship's left side
          enemyPhaser.y >= this.y, // [2] upper side projectile impact on ship's top
          enemyPhaser.y + enemyPhaser.h >= this.y, // [3] lower side projectile impact on ship's top
          enemyPhaser.y <= this.y + SPACESHIP_H // [4] upper side projectile impact on ship's bottom
        ];
        if (impact[0] && impact[1] && (impact[2] || impact[3]) && impact[4]) {
          this.life = this.life - enemyPhaser.damage;
          this.game.enemyPhasers.splice(idx, 1);
          if (this.life <= 0) {
            // Spaceship was destroied
            this.game.started = false;
          }
        }
      });
    }
  }
}
