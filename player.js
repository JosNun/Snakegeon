class player {
  constructor(ctx, x, y, l) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.body = [];

    for (let i = 0; i < l; i++) {
      this.body.push({ x: this.x - i, y: this.y });
    }
  }

  display() {
    for (let i in this.body) {
      this.ctx.fillRect(this.body[i].x * 20, this.body[i].y * 20, 18, 18);
    }
  }
}

export default player;