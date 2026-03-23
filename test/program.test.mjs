import { describe, test } from "vitest";
import { expect } from "chai";
import { Program } from "../src/program.mjs";
import { cleanString } from "../src/utils.mjs";
import { readFileSync, unlink } from "node:fs";

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
  test("correctly simulates gosper glider gun for 1 generation", () => {
    const p = new Program("./test/shapes/gosper_glider_gun.rle", 1);
    expect(p.simulate()).to.equal(
      cleanString(`
        .......................x............
        .....................x.x............
        ............x.......x.x...........xx
        ...........xx......x..x...........xx
        xx........xx....xx..x.x.............
        xx.......xxx....xx...x.x............
        ..........xx....xx.....x............
        ...........xx.......................
        ............x.......................
      `),
    );
  });
  test("simulates gosper glider gun for 4 generations and saves the output to a file", () => {
    const newFilePath = "./test/tmp/gosper_output.rle";

    const p = new Program("./test/shapes/gosper_glider_gun.rle", 4, newFilePath);
    p.simulate();
    p.export();

    const newFile = readFileSync(newFilePath, { encoding: "utf8" });
    expect(
      newFile.startsWith(
        "x = 36, y = 9\n22bo$20b4o$11b2o5b4ob2o9b2o$9bo2bo3bo3b2ob3o8b2o$2o6bo7bo3b2ob2o$2o6bo6bo3b5o$8bo7b3o3bo$9bo2bo$11b2o$!",
      ),
    ).to.be.true;
    unlink(newFilePath, (err) => {
      if (err) throw err;
    });
  });
});
