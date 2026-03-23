import { readFileSync } from "node:fs";
import { Pattern } from "./pattern.mjs";

export class RLE {
  static fromFile(path) {
    return new RLE(path);
  }
  static decode(rleData, width, height) {
    const characterSets = [];

    // Shape data
    let runningCountChars = [];
    let runningCount = 1;
    let lineCharacterCount = 0;
    let lineCount = 0;
    for (let c = 0; c < rleData.length; c++) {
      const character = rleData[c];

      switch (character) {
        case "b":
          // dead cell
          characterSets.push(".".repeat(runningCount));
          lineCharacterCount += runningCount;
          runningCount = 1;
          runningCountChars = [];
          continue;
        case "o":
          // alive cell
          characterSets.push("x".repeat(runningCount));
          lineCharacterCount += runningCount;
          runningCount = 1;
          runningCountChars = [];
          continue;
        case "$":
          // new line
          for (let i = 0; i < runningCount; i++) {
            characterSets.push(".".repeat(width - lineCharacterCount));
            lineCharacterCount = 0;
            lineCount += 1;
          }
          runningCount = 1;
          runningCountChars = [];

          continue;
        case "!":
          if (lineCount < height) {
            for (let i = 0; i < height - lineCount; i++) {
              characterSets.push(".".repeat(width - lineCharacterCount));
              lineCharacterCount = 0;
              lineCount += 1;
            }
          }
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

    return characterSets.join("");
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
    }

    const finalString = [];
    characters.forEach((part) => finalString.push(part.join("")));

    return new Pattern(finalString.join(""), sizeX, sizeY);
  }
}
