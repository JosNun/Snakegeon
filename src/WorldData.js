class WorldData {
  constructor(canvasSize, mapLayout) {
    this.layout = mapLayout;
    this.size = mapLayout.length;

    this.blockSize = Math.floor(canvasSize / this.size);
  }
}

export default WorldData;
