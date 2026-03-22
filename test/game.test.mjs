import { describe, test } from "vitest";
import { expect } from "chai";
import { Game } from "../src/game.mjs";
import { cleanString } from "../src/utils.mjs";
import { Pattern } from "../src/pattern.mjs";

describe("Game", () => {
  test("is initialized empty", () => {
    expect(new Game().toString()).to.equal("");
  });
  test("can be seeded with a pattern", () => {
    expect(new Game(Pattern.GLIDER).toString()).to.equal(Pattern.GLIDER.toCharacters());
  });
  test.skip("can be ticked forward", () => {
    const game = new Game(GLIDER);
    game.tick();
    expect(cleanString(game.toString())).to.equal(
      cleanString(`
        ...
        x.x
        .xx
        .x.
      `),
    );
  });
});

describe("Game respects rule", () => {
  test("1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.", () => {
    const game = new Game(
      new Pattern(
        `...
         .x.
         ...`,
        3,
        3,
      ),
    );
    game.tick();
    expect(cleanString(game.toString())).to.equal(
      cleanString(`
        ...
        ...
        ...
      `),
    );
  });
  test("2: Any live cell with two or three live neighbours lives on to the next generation.", () => {
    const game = new Game(
      new Pattern(
        `..x
         .xx
         ...`,
        3,
        3,
      ),
    );
    game.tick();
    expect(cleanString(game.toString())).to.equal(
      cleanString(`
        ..x
        .xx
        ...
      `),
    );
  });
  test("3: Any live cell with more than three live neighbours dies, as if by overpopulation.", () => {
    const game = new Game(
      new Pattern(
        `.xx
         .xx
         ..x`,
        3,
        3,
      ),
    );
    game.tick();
    expect(cleanString(game.toString())).to.equal(
      cleanString(`
        .xx
        ...
        ..x
      `),
    );
  });
  test("4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", () => {});
});
