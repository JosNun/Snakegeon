class WorldData {
  setWorldSize(size, { scale } = {}) {
    this.worldSize = size;

    this.blockSize = Math.ceil(size / (scale || 16));
  }
}

export default new WorldData();
