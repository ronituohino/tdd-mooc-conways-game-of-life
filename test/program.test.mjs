import { describe, test } from "vitest";
import { expect } from "chai";
import { Program } from "../src/program.mjs";
import { cleanString } from "../src/utils.mjs";

describe("Program", () => {
  test("accepts .rle file and simulation amount as input", () => {
    const p = new Program("./test/shapes/gosper_glider_gun.rle", 3);
    expect(p.state).to.not.be.undefined;
  });
  test("correctly simulates glider for 1 generation", () => {
    const p = new Program("./test/shapes/glider.rle", 1);
    expect(p.simulate()).to.equal(
      cleanString(`
         .....
         .....
         .x.x.
         ..xx.
         ..x..
      `),
    );
  });
  test("correctly simulates glider for 2 generations", () => {
    const p = new Program("./test/shapes/glider.rle", 2);
    expect(p.simulate()).to.equal(
      cleanString(`
         .....
         .....
         ...x.
         .x.x.
         ..xx.
      `),
    );
  });
  test.skip("correctly simulates gosper glider gun for 1 generation", () => {
    const p = new Program("./test/shapes/gosper_glider_gun.rle", 1);
    expect(p.simulate()).to.equal(
      cleanString(`
        .....................x.............
        ....................x.x.............
        ...........x.......x.x............xx
        ..........xx......x..x............xx
        xx.......xx....xx..x.x..............
        xx......xxx....xx...x.x.............
        .........xx....xx.....x.............
        ..........xx........................
        ...........x........................
      `),
    );
  });
});
