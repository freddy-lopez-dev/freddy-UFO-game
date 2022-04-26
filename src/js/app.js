// When player collides with sun
// - level increases
// - the player position is reset

// When player collides with enemy
// - lives decreases
// - player position is reset

// When lives gets to zero
// - game is reset
// -- level set to zero
// -- lives set to 3
// -- player position is reset

// When the level goes up
// - the speed of the enemies increases

// How do we detect a collision?
// Where do you check for collisions?

class Sun {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  checkCollision(x, y) {
    // check if the player has collided with the sun
    // console.log('Sun collision check:', x, y);
    const xDiff = Math.abs(x - this.x);
    const yDiff = Math.abs(y - this.y);
    if (xDiff < 105 && yDiff < 105) {
      console.log('Collision with the sun!!!');
    }
  }
}

class Enemy {
  constructor(x, y, direction, style) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
  }

  update(dt) {
    // this method is called constantly by the engine
    // implement enemy movements
    // check the direction of the enemy
    // move the enemy in the right direction
    // until it hits the edge of the canvas
    // turn the enemy around and move in the other direction
    if (this.direction === 'ltr') {
      this.x += 40 * dt;
    }

    if (this.direction === 'rtl') {
      this.x -= 40 * dt;
    }

    if (this.x <= 0) {
      this.direction = 'ltr';
    }

    if (this.x >= canvas.width - 105) {
      this.direction = 'rtl';
    }
  }

  checkCollision(x, y) {
    // check if the player has collided with the enemy
    // console.log('Enemy collision check', x, y);
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(dt) {
    // this method is called constantly by the engine
    this.checkCollision();
  }

  checkCollision() {
    // run the check collision methods from player and sun
    for (let enemy of allEnemies) {
      enemy.checkCollision(this.x, this.y);
    }
    sun.checkCollision(this.x, this.y);
  }

  handleInput(key) {
    // keyboard input (arrow keys) should move the player sprite
    // add or subtract from x or y depending on the key pressed
    switch (key) {
      case 'ArrowUp':
        if (this.y >= 0) {
          this.y -= 40;
        }
        break;
      case 'ArrowDown':
        if (this.y <= canvas.height - 105) {
          this.y += 40;
        }
        break;
      case 'ArrowLeft':
        if (this.x > 0) {
          this.x -= 40;
        }

        break;
      case 'ArrowRight':
        if (this.x <= canvas.width - 105) {
          this.x += 40;
        }
        break;
    }
  }
}

// Instantiate objects

const allEnemies = [
  new Enemy(0, 105, 'ltr', 'enemy1'),
  new Enemy(750, 210, 'rtl', 'enemy2'),
  new Enemy(0, 315, 'ltr', 'enemy3'),
];
const player = new Player(400, 420);
const sun = new Sun(400, 0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  player.handleInput(e.key);
});
