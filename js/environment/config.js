const FPS = 60;
const TIME_DELTA = 1000 / FPS;
const SPACESHIP_W = 200;

// Sets the spaceship height in function of its width
const SPACESHIP_H = (870 * SPACESHIP_W) / 3500;

const ENEMY_QTY = 4;
const V_UNITS = 50; // Main speed value

// Sets a smooth movement when using a setInterval()
const SPEED = V_UNITS / TIME_DELTA;

// Equalizes speed while moving on diagonal
const DIAGONAL_COS = Math.cos(Math.PI / 4);

// keycodes for movement and firing projectiles
const DEFAULT_KEY = [37, 38, 39, 40];

const PLAYER_CONTROLS = {
  LEFT: 37, // ARROW_LEFT
  UP: 38, // ARROW_UP
  RIGHT: 39, // ARROW_RIGHT
  DOWN: 40 // ARROW_DOWN
};
