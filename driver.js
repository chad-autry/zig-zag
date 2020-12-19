"use strict";

let ZigZag = require("./index.js");

let result = ZigZag.intersects(
  process.argv[2],
  process.argv[3],
  process.argv[4],
  process.argv[5],
  process.argv[6]
);
console.log(result);
