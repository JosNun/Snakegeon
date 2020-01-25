import Player from "./player";

class World {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new Player(ctx, 10, 10, 5);
  }

  update() {
    this.player.display();
  }
}

export default World;
