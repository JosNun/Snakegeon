import player from "./player";

class world {
  constructor(ctx) {
    this.ctx = ctx;
    this.player = new player(ctx, 10, 10, 5);
  }

  update() {
    this.player.display();
  }
}

export default world;
