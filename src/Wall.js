import Tile from './Tile';

class Wall extends Tile {
  constructor(x, y) {
    super(x, y, { color: '#00ff00' });
  }

  update(ctx) {
    this.move();
    super.render(ctx);
  }
}

export default Wall;
