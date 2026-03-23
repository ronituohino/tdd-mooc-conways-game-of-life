import { readFileSync } from "node:fs";
import { Pattern } from "./pattern.mjs";

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
  toPattern() {
    let sizeX;
    let sizeY;
    const characters = [];

    const lines = this.contents.split("\n");
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l];
      if (line.startsWith("#")) {
        continue;
      }
      if (line.startsWith("x")) {
        const headers = line.split(",");
        const parsedHeaders = {};
        headers.forEach((header) => {
          const [key, value] = header.trim().split("=");
          parsedHeaders[key.trim()] = parseInt(value.trim()) || value.trim();
        });

        sizeX = parsedHeaders.x;
        sizeY = parsedHeaders.y;
        continue;
      }

      // Shape data
      let runningCountChars = [];
      let runningCount = 1;
      let lineCharacterCount = 0;
      for (let c = 0; c < line.length; c++) {
        const character = line[c];

        switch (character) {
          case "b":
            // dead cell
            characters.push(".".repeat(runningCount).split(""));
            lineCharacterCount += runningCount;
            runningCount = 1;
            runningCountChars = [];
            continue;
          case "o":
            // alive cell
            characters.push("x".repeat(runningCount).split(""));
            lineCharacterCount += runningCount;
            runningCount = 1;
            runningCountChars = [];
            continue;
          case "$":
            // new line
            for (let i = 0; i < runningCount; i++) {
              characters.push(".".repeat(sizeX - lineCharacterCount).split(""));
              lineCharacterCount = 0;
            }
            runningCount = 1;
            runningCountChars = [];

            continue;
          case "!":
            break;
          default:
            // number
            if (parseInt(character) !== NaN) {
              runningCountChars.push(character);
              runningCount = parseInt(runningCountChars.join(""));
            }
            continue;
        }
      }
    }

    const finalString = [];
    characters.forEach((part) => finalString.push(part.join("")));

    return new Pattern(finalString.join(""), sizeX, sizeY);
  }
}
