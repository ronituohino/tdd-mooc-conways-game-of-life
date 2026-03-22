import { readFileSync } from "node:fs";

export class RLE {
  static fromFile(path) {
    return new RLE(path);
  }

  contents;
  constructor(path) {
    this.contents = readFileSync(path, { encoding: "utf8" });
  }

  toString() {
    return this.contents;
  }
}
