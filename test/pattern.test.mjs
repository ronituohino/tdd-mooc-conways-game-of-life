import { describe, test } from "vitest";
import { expect } from "chai";
import { Pattern } from "../src/pattern.mjs";
import { cleanString } from "../src/utils.mjs";

describe("Pattern", () => {
  test("is initialized empty", () => {
    expect(new Pattern().toCharacters()).to.equal("");
  });
  test("can be given a pattern and dimensions", () => {
    expect(new Pattern("...x..x..", 3, 3).toCharacters()).to.equal("...x..x..");
  });
  test("contains a GLIDER pattern", () => {
    expect(Pattern.GLIDER.toCharacters()).to.equal(".x...xxxx");
  });
});
