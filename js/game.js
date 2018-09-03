class Game {
    constructor(boardName) {
        this.board = document.getElementById(boardName);
        this.board.width = window.innerWidth;
        this.board.height = window.innerHeight;
        this.ctx = this.board.getContext("2d");

        this.background = new Background(this);
        this.spaceship = new Spaceship(this);
        this.enemies = [];
    }

    play() {
        this.spanEnemy = 0;
        this.interval = setInterval(
            () => {
                this.draw();
                this.move();
                this.spaceship.setAction(playerInput(PLAYER_CONTROLS));

                this.spanEnemy++;
                if(this.spanEnemy > 200 && this.enemies.length < ENEMY_QTY){
                    this.createEnemy();
                    this.spanEnemy = 0;
                }
            },
            TIME_DELTA
        );
    }

    draw() {
        this.background.draw();
        this.spaceship.draw();

        if(this.enemies.length != 0){
            for(let i=0 ; i<this.enemies.length ; i++){
                this.enemies[i].draw();
            }
        }
    }

    move() {
        this.background.move();
        this.spaceship.move();

        if(this.enemies.length != 0){
            for(let i=0 ; i<this.enemies.length ; i++){
                this.enemies[i].move();
            }
        }
    }

    createEnemy(){
        let enemy = new Enemy(this);
        this.enemies.push(enemy);
    }
}