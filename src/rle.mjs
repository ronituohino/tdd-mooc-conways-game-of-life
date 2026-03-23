import { readFileSync, writeFileSync } from "node:fs";
import { Pattern } from "./pattern.mjs";
import { cleanString } from "./utils.mjs";

export class RLE {
  static fromFile(path) {
    return new RLE(path);
  }
  static toFile(newFilePath, state, width, height) {
    let fileContents = "";
    fileContents += `x = ${width}, y = ${height}\n`;
    fileContents += RLE.encode(state);

    writeFileSync(newFilePath, fileContents, { encoding: "utf8" });
  }
  static decode(rleData, width, height) {
    const characterSets = [];

    let runCountCharacters = [];
    let runCountParsed = 1;

    let currentLineCharacterCount = 0;
    let lineCount = 0;
    for (let c = 0; c < rleData.length; c++) {
      const character = rleData[c];

      switch (character) {
        case "b": // dead cell
        case "o": // alive cell
          characterSets.push((character === "b" ? "." : "x").repeat(runCountParsed));
          currentLineCharacterCount += runCountParsed;
          runCountParsed = 1;
          runCountCharacters = [];
          continue;
        case "$":
          // new line
          for (let i = 0; i < runCountParsed; i++) {
            characterSets.push(".".repeat(width - currentLineCharacterCount));
            currentLineCharacterCount = 0;
            lineCount += 1;
          }
          runCountParsed = 1;
          runCountCharacters = [];
          continue;
        case "!":
          if (lineCount < height) {
            const diff = height - lineCount;
            for (let i = 0; i < diff; i++) {
              characterSets.push(".".repeat(width - currentLineCharacterCount));
              currentLineCharacterCount = 0;
              lineCount += 1;
            }
          }
          break;
        default:
          // number
          if (parseInt(character) !== NaN) {
            runCountCharacters.push(character);
            runCountParsed = parseInt(runCountCharacters.join(""));
          }
          continue;
      }
    }

    return characterSets.join("");
  }

  static encode(state, width, height) {
    const characters = cleanString(state);

    let result = [];
    let runCount = 0;
    let lastCharacter = undefined;
    for (let c = 0; c < characters.length; c++) {
      const character = characters[c];
      if (character === lastCharacter) {
        runCount += 1;
      } else {
        // apply previous run count
        if (lastCharacter !== undefined) {
          const symbol = `${runCount > 1 ? runCount : ""}${lastCharacter === "x" ? "o" : "b"}`;
          result.push(symbol);
        }

        runCount = 1;
        lastCharacter = character;
      }

      if (c > 0 && (c + 1) % width === 0) {
        // end of line, start run count again
        if (character === "x") {
          const symbol = `${runCount}o`;
          result.push(symbol);
        }
        result.push("$");

        runCount = 0;
        lastCharacter = undefined;
      }
    }

    // compress end of line chars
    result.push("!");
    const encoded = result.join("");
    let runCountEOL = 0;
    const final = [];
    for (let c = 0; c < encoded.length; c++) {
      const character = encoded[c];
      if (character === "$") {
        runCountEOL += 1;
      } else {
        if (runCountEOL === 1) {
          final.push("$");
        } else if (runCountEOL > 1 && runCountEOL < height) {
          final.push(`${runCountEOL}\$`);
        }
        final.push(character);
        runCountEOL = 0;
      }
    }

    return final.join("");
  }

  contents;
  constructor(path) {
    this.contents = readFileSync(path, { encoding: "utf8" });
  }

  toString() {
    return this.contents;
  }
  toPattern() {
    let width;
    let height;

    const rleData = [];
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

        width = parsedHeaders.x;
        height = parsedHeaders.y;
        continue;
      }

      // RLE data
      rleData.push(line);
    }

    return new Pattern(RLE.decode(rleData.join(""), width, height), width, height);
  }
}
