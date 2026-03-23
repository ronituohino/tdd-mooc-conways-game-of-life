import { Game } from "./game.mjs";

import { RLE } from "./rle.mjs";

export class Program {
  game;
  state;
  simulationRounds;
  constructor(rleFile, simulationRounds) {
    this.game = new Game(RLE.fromFile(rleFile).toPattern());
    this.simulationRounds = simulationRounds;
    this.state = this.game.toString();
  }

  simulate() {
    for (let i = 0; i < this.simulationRounds; i++) {
      this.game.tick();
    }
    this.state = this.game.toString();
    return this.state;
  }
}
