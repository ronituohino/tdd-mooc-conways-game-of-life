export class Game {
  seed;
  state;
  constructor(seed) {
    this.seed = seed;
    this.state = seed;
  }
  toString() {
    if (this.state) {
      return this.state;
    } else {
      return "";
    }
  }
  tick() {
    this.state = `
        ...
        x.x
        .xx
        .x.
      `;
  }
}
