"use strict";

let Fraction = require("fraction.js");
let ZigZag = {};

/**
 *
 * @param {*} initialU
 * @param {*} initialV
 * @param {*} finalU
 * @param {*} finalV
 * @param {*} leftOriented
 * @returns
 */
ZigZag.intersects = (initialU, initialV, finalU, finalV, leftOriented) => {
  let normalizedU = finalU - initialU;
  let normalizedV = finalV - initialV;
  let absNormU = Math.abs(normalizedU);
  let absNormV = Math.abs(normalizedV);
  let left = null;
  let leftCount = 0;
  let right = null;
  let rightCount = 0;
  if (initialU == finalU && initialV == finalV) {
    return [[parseInt(finalU), parseInt(finalV)]];
  }
  else if (normalizedU >= 0 && normalizedV >= 0) {
    left = { u: 0, v: 1 };
    leftCount = normalizedV;
    right = { u: 1, v: 0 };
    rightCount = normalizedU;
  } else if (normalizedU <= 0 && normalizedV <= 0) {
    left = { u: 0, v: -1 };
    leftCount = absNormV;
    right = { u: -1, v: 0 };
    rightCount = absNormU;
  } else if (normalizedU == normalizedV && normalizedV == 0) {
    //Initial == final
    return [{ u: finalU, v: finalV }];
  } else if (absNormU >= absNormV) {
    left = { u: normalizedU / absNormU, v: 0 };
    leftCount = absNormU - absNormV;
    rightCount = absNormV;
    right = { u: normalizedU / absNormU, v: normalizedV / absNormV };
  } else if (absNormU < absNormV) {
    right = { u: 0, v: normalizedV / absNormV };
    rightCount = absNormV - absNormU;
    leftCount = absNormU;
    left = { u: normalizedU / absNormU, v: normalizedV / absNormV };
  } else {
    //Panic! This shouldn't happen. Invalid co-ordinates
    return [];
  }
  let totalCount = leftCount + rightCount;
  let targetRightOverLeft = Fraction(rightCount, Math.max(leftCount, 1));
  let targetLeftOverRight = Fraction(leftCount, Math.max(rightCount, 1));

  let traveledRight = 0;
  let traveledLeft = 0;
  let returnArray = [];
  let lastHex = [0,0];
  let travelRight = () => {traveledRight++;
    lastHex = [lastHex[0] + right.u,lastHex[1] + right.v];
    returnArray.push(lastHex);};
  let travelLeft = () => {traveledLeft++;
    lastHex = [lastHex[0] + left.u,lastHex[1] + left.v ];
    returnArray.push(lastHex);};
  for (let i = 0; i < totalCount; i++) {
    if (rightCount == 0) {
      travelLeft();
      continue;
    } else if (leftCount == 0) {
      travelRight();
      continue;
    }
    //Compare the difference between the prospective slopes and target slope
    let prospectiveRightOverLeftDiff = targetRightOverLeft
      .sub(Fraction(traveledRight, traveledLeft + 1))
      .abs();
    let prospectiveLeftOverRightDiff = targetLeftOverRight
      .sub(Fraction(traveledLeft, traveledRight + 1))
      .abs();
    let comparison = prospectiveRightOverLeftDiff.compare(
      prospectiveLeftOverRightDiff
    );

    if (comparison > 0) {
      travelRight();
    } else if (comparison < 0) {
      travelLeft();
    } else {
      if (leftOriented) {
        travelLeft();
      } else {
        travelRight();
      }
    }
  }
  return returnArray;
};

module.exports = ZigZag;
