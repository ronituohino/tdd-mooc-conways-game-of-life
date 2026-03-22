import { cleanString } from "./utils.mjs";

export class Pattern {
  characters;
  width;
  height;
  constructor(pattern, width, height) {
    this.characters = cleanString(pattern || "");
    this.width = width;
    this.height = height;
  }

  toCharacters() {
    return this.characters;
  }

  // Collection of Patterns
  static GLIDER = new Pattern(
    `
    .x.
    ..x
    xxx
    `,
    3,
    3,
  );
  static BLINKER = new Pattern("xxx", 3, 1);
}
