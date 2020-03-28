class TileFactory {
  constructor(size) {
    this.tileSize = size;
  }

  setTileSize(size) {
    this.tileSize = size;
  }

  createTile(type, ...tileParams) {
    return new type(this.tileSize, ...tileParams);
  }
}

export default new TileFactory();
