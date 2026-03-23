#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Program } from "./program.mjs";
const argv = yargs(hideBin(process.argv)).parse();

const inputRle = argv.input;
const generations = parseInt(argv.n);
const outputPath = argv.output;

if (!inputRle || !generations || !outputPath) {
  console.log("Missing --input=, --output=, or --n= params.");
}

const p = new Program(inputRle, generations, outputPath);
p.simulate();
p.export();
