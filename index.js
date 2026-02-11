"use strict";

let ZigZag = {};
//const sqrtThree = 1.732050807568877;

/**
 *
 * @param {*} initialU
 * @param {*} initialV
 * @param {*} finalU
 * @param {*} finalV
 * @param {*} leftOriented
 * @returns
 */
ZigZag.intersects = (initialU, initialV, finalU, finalV, preferClockwise) => {
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
  } else if (normalizedU >= 0 && normalizedV >= 0) {
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
  

  let traveledLesser = 0;
  let traveledGreater = 0;
  let lesserCount;
  let greaterCount;
  let lesser;
  let greater;
  let returnArray = [];
  let lastHex = [initialU, initialV];
  if (rightCount > leftCount || (rightCount == leftCount && preferClockwise)) {
    lesserCount = leftCount;
    greaterCount = rightCount;
    lesser = left;
    greater = right;
  } else {
    lesserCount = rightCount;
    greaterCount = leftCount;
    lesser = right;
    greater = left;
  }
  //Note there is supposed to be a sqrtThree* in the numerator of targetSlope. But due to how it is being used, it can be omitted
  let targetSlope = lesserCount/(0.5*lesserCount + greaterCount);
  let travelLesser = () => {
    traveledLesser++;
    lastHex = [lastHex[0] + lesser.u, lastHex[1] + lesser.v];
    returnArray.push(lastHex);
  };
  let travelGreater = () => {
    traveledGreater++;
    lastHex = [lastHex[0] + greater.u, lastHex[1] + greater.v];
    returnArray.push(lastHex);
  };

  // First step is always in the greater direction
  travelGreater();
  for (let i = 1; i < totalCount; i++) {
    if (traveledLesser == lesserCount) {
      travelGreater();
      continue;
    } else if (traveledGreater == greaterCount) {
      travelLesser();
      continue;
    }
    //Compare the difference between the prospective slopes and target slope
    let prospectiveGreaterSlope = traveledLesser/(0.5*traveledLesser + traveledGreater + 1);
    let prospectiveLesserSlope = (traveledLesser+1)/(0.5*(traveledLesser+1) + traveledGreater);

    // There was a sqrtThree* in the numerator of prospectiveGreaterSlope, prospectiveLesserSlope, and targetSlope.
    // Since this comparison is all they were used for, factored that multiplcation out
    if (targetSlope - prospectiveGreaterSlope < prospectiveLesserSlope - targetSlope) {
      travelGreater();
    } else {
      travelLesser();
    }
  }
  return returnArray;
};

export default ZigZag;
