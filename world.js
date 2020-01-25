class world {
  constructor() {
    this.player = new player(10, 10, 5);
  }

  update() {
    this.player.display();
  }
}
