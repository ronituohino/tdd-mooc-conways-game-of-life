import { describe, test } from "vitest";
import { expect } from "chai";
import { cleanString } from "../src/utils.mjs";

describe("String cleaning function", () => {
  test("returns a clean string the same", () => {
    expect(cleanString("")).to.equal("");
  });
  test("trims start and end of string", () => {
    expect(cleanString("\t\t asda\t \t")).to.equal("asda");
  });
  test("removes newline characters", () => {
    expect(
      cleanString(`
      asd
      
      `),
    ).to.equal("asd");
  });
  test("removes newline characters and trims lines", () => {
    expect(
      cleanString(`
      \t \t asd \n
       asdf
      \t
      `),
    ).to.equal("asdasdf");
  });
});
