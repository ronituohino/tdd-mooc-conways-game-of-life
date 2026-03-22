import { describe, test } from "vitest";
import { expect } from "chai";
import { Game } from "../src/game.mjs";

const GLIDER = `
.x.
..x
xxx
`;

describe("Game", () => {
  test("is initialized empty", () => {
    expect(new Game().toString()).to.equal("");
  });
  test("can be seeded with a pattern", () => {
    expect(new Game(GLIDER).toString()).to.equal(GLIDER);
  });
  test("can be ticked forward", () => {
    const game = new Game(GLIDER);
    game.tick();
    expect(game.toString()).to.equal(`
        ...
        x.x
        .xx
        .x.
      `);
  });
});

describe("Game respects rule", () => {
  test("1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.", () => {});
  test("2: Any live cell with two or three live neighbours lives on to the next generation.", () => {});
  test("3: Any live cell with more than three live neighbours dies, as if by overpopulation.", () => {});
  test("4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", () => {});
});
