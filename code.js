/**
 * Calculates Premium price with Black-Scholes model
 *
 * @param {string} optionType call or put.
 * @param {number} underlyingPrice Stock price.
 * @param {number} strikePrice strike level.
 * @param {number} riskFreeRate Free Rate
 * @param {number} timeToMaturity time to exp, 11 days example.
 * @param {number} volatility IV or VIX.
 * @return The Premium price.
 * @customfunction
 */
function BSModel(optionType, underlyingPrice, strikePrice, riskFreeRate, timeToMaturity, volatility) {
  if(timeToMaturity==0){
    timeToMaturity=0.000001;
  }
  timeToMaturity = timeToMaturity/365;
  var d1 = (Math.log(underlyingPrice / strikePrice) + (riskFreeRate + (Math.pow(volatility, 2) / 2)) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));
  var d2 = d1 - (volatility * Math.sqrt(timeToMaturity));
  
  if (optionType === "call") {
    var callOptionPrice = underlyingPrice * normalCDF(d1) - strikePrice * Math.exp(-riskFreeRate * timeToMaturity) * normalCDF(d2);
    return callOptionPrice;
  } else if (optionType === "put") {
    var putOptionPrice = strikePrice * Math.exp(-riskFreeRate * timeToMaturity) * normalCDF(-d2) - underlyingPrice * normalCDF(-d1);
    return putOptionPrice;
  } else {
    return null; // Invalid option type
  }
}

function normalCDF(x) {
  var t = 1 / (1 + 0.2316419 * Math.abs(x));
  var d = 0.3989423 * Math.exp(-Math.pow(x, 2) / 2);
  var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  
  if (x > 0) {
    return 1 - p;
  } else {
    return p;
  }
}


/**
 * Calculates Call Premium price with Black-Scholes model
 *
 * @param {number} spot Stock price.
 * @param {number} strike strike level.
 * @param {number} time time to exp, 11 days example.
 * @param {number} IV volatility or VIX.
 * @return The Call Premium price.
 * @customfunction
 */
function getCall(spot,strike,time,iv){
  riskFreeRate = 0.0525;
  underlyingPrice = spot;
  return BSModel("call", spot, strike, riskFreeRate, time, iv);
}

/**
 * Calculates Put Premium price with Black-Scholes model
 *
 * @param {number} spot Stock price.
 * @param {number} strike strike level.
 * @param {number} time time to exp, 11 days example.
 * @param {number} IV volatility or VIX.
 * @return The Put Premium price.
 * @customfunction
 */
function getPut(spot,strike,time,iv){
  riskFreeRate = 0.0525;
  underlyingPrice = spot;
  return BSModel("put", spot, strike, riskFreeRate, time, iv);
}


/**
 * Calculates a sequence between 2 numbers. 
 *
 * @param {number} numStart Start Sequence.
 * @param {number} numEnd End Sequence.
 * @param {number} numRows numbers of rows.
 * @return The sequence.
 * @customfunction
 */
function setSequence(numStart, numEnd,numRows){
  var ans = [];
  var step = (numEnd-numStart)/numRows;
  numEnd = numEnd + 0.000000000001;
  while(numStart<=numEnd){
    ans.push(numStart);
    numStart = numStart + step;
  }
    //ans.push(numStart);
    return ans;
}

