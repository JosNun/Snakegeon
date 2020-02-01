import WorldData from './WorldData';
import Tile from './Tile';

class World {
  constructor(canvas) {
    const size =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;

    canvas.width = size;
    canvas.height = size;

    this.size = size;

    WorldData.setWorldSize(size);

    this.ctx = canvas.getContext('2d');

    this.level = this.loadLevel();
  }

  loadLevel() {
    const level = [];

    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        level.push(new Tile(x, y));
      }
    }

    return level;
  }

  render() {
    this.ctx.clearRect(0, 0, this.size, this.size);

    this.level.forEach(level => {
      level.render(this.ctx);
    });
  }

  update() {
    // do something...

    this.render(this.ctx);
  }
}

export default World;