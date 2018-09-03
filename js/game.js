class Game {
    constructor(boardName) {
        this.board = document.getElementById(boardName);
        this.board.width = window.innerWidth;
        this.board.height = window.innerHeight;
        this.ctx = this.board.getContext("2d");

        this.background = new Background(this);
        this.spaceship = new Spaceship(this);
        this.enemies = [];
        this.enemyPhasers = [];

        this.started = true;
    }

    play() {
        this.spanEnemy = 0;
        this.enemyShoot = 0;
        if (this.started == true) {
            this.interval = setInterval(
                () => {
                    
                    this.draw();
                    this.move();
                    this.spaceship.setAction(playerInput(PLAYER_CONTROLS));
                    
                    this.spanEnemy++;
                    if (this.spanEnemy > 200 && this.enemies.length < ENEMY_QTY) {
                        this.createEnemy();
                        this.spanEnemy = 0;
                    }
                    this.checkEnemyLife();
                    
                    this.enemyShoot++;
                    if (this.enemyShoot > 100 && this.enemies.length != 0) {
                        for (let i = 0; i < this.enemies.length; i++) {
                            this.enemies[i].shoot();
                        }
                        this.enemyShoot = 0;
                    }
                    $("#life").text(this.spaceship.life);
                    if(this.started == false){
                        clearInterval(this.interval);
                    }
                },
                TIME_DELTA
            );
        }
    }

    draw() {
        this.background.draw();
        this.spaceship.draw();

        if (this.enemies.length != 0) {
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].draw();
            }
        }
        if (this.enemyPhasers.length != 0) {
            this.enemyPhasers.forEach((phaser) => {
                phaser.draw();
            })
        }
    }

    move() {
        this.background.move();
        this.spaceship.move();

        if (this.enemies.length != 0) {
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].move();
            }
        }

        this.enemyPhasers = this.enemyPhasers.filter((phaser) => {
            return phaser.x + phaser.w > 0;
        })

        this.enemyPhasers.forEach(function (phaser) {
            phaser.move();
        })
        
    }

    createEnemy() {
        let enemy = new Enemy(this);
        this.enemies.push(enemy);
    }

    checkEnemyLife() {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].life <= 0) {
                this.enemies.splice(i, 1);
            }
        }
    }
}