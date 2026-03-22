import { describe, test } from "vitest";
import { expect } from "chai";
import { RLE } from "../src/rle.mjs";

describe("RLE", () => {
  test("can read a .rle file", () => {
    expect(RLE.fromFile("./test/shapes/gosper_glider_gun.rle").toString().startsWith("#N Gosper glider gun")).to.be
      .true;
  });
  test("can produce a Pattern", () => {});
});
