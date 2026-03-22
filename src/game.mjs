export class Game {
  seed;
  state;

  sizeX;
  sizeY;

  constructor(seed) {
    if (seed) {
      this.seed = seed;
      this.state = seed.toCharacters().split("");
      this.sizeX = seed.width;
      this.sizeY = seed.height;
    }
  }

  toString() {
    if (this.state) {
      return this.state.join("");
    } else {
      return "";
    }
  }

  getCell(x, y) {
    if (x < 0 || x >= this.sizeX) {
      return ".";
    }
    if (y < 0 || y >= this.sizeY) {
      return ".";
    }

    return this.state[y * this.sizeX + x];
  }

  getAmountNeighbors(x, y) {
    let total = 0;
    if (this.getCell(x - 1, y - 1) === "x") {
      total += 1;
    }
    if (this.getCell(x, y - 1) === "x") {
      total += 1;
    }
    if (this.getCell(x + 1, y - 1) === "x") {
      total += 1;
    }
    if (this.getCell(x - 1, y) === "x") {
      total += 1;
    }
    if (this.getCell(x + 1, y) === "x") {
      total += 1;
    }
    if (this.getCell(x - 1, y + 1) === "x") {
      total += 1;
    }
    if (this.getCell(x, y + 1) === "x") {
      total += 1;
    }
    if (this.getCell(x + 1, y + 1) === "x") {
      total += 1;
    }
    return total;
  }

  tick() {
    let cellsToDie = [];
    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        const cell = this.getCell(x, y);
        if (cell === "x" && this.getAmountNeighbors(x, y) < 2) {
          cellsToDie.push([x, y]);
        }
      }
    }

    for (let c = 0; c < cellsToDie.length; c++) {
      const [x, y] = cellsToDie[c];
      this.state[y * this.sizeX + x] = ".";
    }
  }
}
