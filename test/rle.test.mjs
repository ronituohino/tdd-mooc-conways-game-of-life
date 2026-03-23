import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { RLE } from "../src/rle.mjs";
import { cleanString } from "../src/utils.mjs";

describe("RLE", () => {
  let rle;
  beforeEach(() => {
    rle = RLE.fromFile("./test/shapes/gosper_glider_gun.rle");
  });
  test("can read a .rle file", () => {
    expect(rle.toString().startsWith("#N Gosper glider gun")).to.be.true;
  });
  test.skip("can produce a Pattern", () => {
    expect(rle.toPattern().characters).to.deep.equal(
      cleanString(`
        ........................x...........
        ......................x.x...........
        ............xx......xx............xx
        ...........x...x....xx............xx
        xx........x.....x...xx..............
        xx........x...x.xx....x.x...........
        ..........x.....x.......x...........
        ...........x...x....................
        ............xx......................
      `),
    );
  });
});
