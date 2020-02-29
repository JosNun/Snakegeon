class WorldData {
  setWorldSize(size, { scale } = {}) {
    this.worldSize = size;

    this.blockSize = Math.floor(size / (scale || 16));
  }
}

export default new WorldData();
