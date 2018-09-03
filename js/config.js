FPS = 60;
TIME_DELTA = 1000 / FPS;

SPACESHIP_W = 200;
SPACESHIP_H = (870*SPACESHIP_W)/3500;

ENEMY_QTY = 4;

V_UNITS = 40;
SPEED = V_UNITS / TIME_DELTA;
DIAGONAL_COS = Math.cos(Math.PI / 4);

DEFAULT_KEY = [37, 38, 39, 40];

PLAYER_CONTROLS = {
    LEFT: 37, // ARROW_LEFT
    UP: 38, // ARROW_UP
    RIGHT: 39, // ARROW_RIGHT
    DOWN: 40, // ARROW_DOWN
};