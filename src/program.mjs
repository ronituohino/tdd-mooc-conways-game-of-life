import { Game } from "./game.mjs";

import { RLE } from "./rle.mjs";

export class Program {
  game;
  state;
  simulationRounds;
  outputPath;
  constructor(rleFile, simulationRounds, outputPath) {
    this.game = new Game(RLE.fromFile(rleFile).toPattern());
    this.simulationRounds = simulationRounds;
    this.state = this.game.toString();
    this.outputPath = outputPath;
  }

  simulate() {
    for (let i = 0; i < this.simulationRounds; i++) {
      this.game.tick();
    }
    this.state = this.game.toString();
    return this.state;
  }

  export() {
    RLE.toFile(this.outputPath, this.state, this.game.sizeX, this.game.sizeY);
  }
}
