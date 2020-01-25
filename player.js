class player {
  constructor(x, y, l) {
    this.x = x;
    this.y = y;

    this.body = [];

    for (let i = 0; i < l; i++) {
      this.body.push({ x: this.x - i, y: this.y });
    }
  }

  display() {
    for (let i in this.body) {
      ctx.fillRect(this.body[i].x * 20, this.body[i].y * 20, 18, 18);
    }
  }
}
