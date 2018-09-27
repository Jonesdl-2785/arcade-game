// game start
let game = true;

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.height = 65;
  this.width = 95;
  this.collision = false;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for gameOver
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the gameOver runs at the same speed for
  // all computers.
  // this.x += 180 * dt;
  if (this.x > ctx.canvas.width + this.width) {
    this.x = -200 * Math.floor(Math.random() * 4) + 1;
  } else {
    this.x += 250 * dt;
  }

  // collision with Player
  // // proximity
  if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
    this.collision = true;

    if (player) {
      player.x = 204;
      player.y = 400;
      alert('Boom!');

    } else {
      this.collision = false;
    }
  }
};

function collision(px, py, pw, ph, ex, ey, ew, eh) {
  return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}
// Draw the enemy on the screen, required method for gameOver
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, sprite) {
  // x and y position of player
  this.x = x;
  this.y = y;
  this.end = this.y - 50;
  this.sprite = sprite;
  this.height = 75;
  this.width = 65;
};

Player.prototype.update = function(dt) {
  for (let enemy of allEnemies) {
    if (game && this.y <= 40 && game && enemy.y >= 40) {
      game = false;
      youWin();
    }
  }

}
// Draw the player sprite on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  const horizontal = 101;
  const vertical = 83;

  if (direction === 'left' && this.x - horizontal >= 0) {
    this.x -= horizontal;
  } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
    this.x += horizontal;
  } else if (direction === 'up' && this.y - vertical > 0 - player.height) {
    this.y -= vertical;
  } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200) {
    this.y += vertical;
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// function collision(px, py, pw, ph, ex, ey, ew, eh) {
//     return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
// }

// play win
function youWin() {
  let name = prompt('What is your name?');
  // player.x = 204;
  // player.y = 400;
  alert('Congrats, ' + name + ' you Won!');
  reset();
};

// to clear enemies from board
function reset() {
  allEnemies = [];
  // player.x = 0;
  // player.y = 0;
};

// Variables
const enemyLocations = [60, 145, 227];
// const bug1 = new Enemy();
// const bug2 = new Enemy();
// const bug3 = new Enemy();

let allEnemies = enemyLocations.map((y, index) => {
  return new Enemy((-150 * (index + 1)), y)
});

let player = new Player(204, 400, 'images/char-pink-girl.png');
