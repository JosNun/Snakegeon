import Tile from './Tile';
import { keys } from './keys';

class Player extends Tile {
  constructor(x, y) {
    super(x, y, { color: '#00ff00' });

    this.canMove = true;
    this.pressed = {};
  }

  move() {
    if (keys['w']) {
      if (!this.pressed['w']) {
        this.pressed['w'] = true;

        this.y--;
      }
    } else if (keys['s']) {
      if (!this.pressed['s']) {
        this.pressed['s'] = true;

        this.y++;
      }
    } else if (keys['a']) {
      if (!this.pressed['a']) {
        this.pressed['a'] = true;

        this.x--;
      }
    } else if (keys['d']) {
      if (!this.pressed['d']) {
        this.pressed['d'] = true;

        this.x++;
      }
    } else {
      this.pressed = {};
    }
  }

  update() {
    this.move();
  }
}

export default Player;
