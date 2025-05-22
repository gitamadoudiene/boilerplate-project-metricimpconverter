function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let numRegex = /^[\d.\/]+/;
    let match = input.match(numRegex);

    if (!match) return 1; // aucun chiffre = on retourne 1

    let numStr = match[0];
    if ((numStr.match(/\//g) || []).length > 1) return "invalid number";

    if (numStr.includes("/")) {
      let [numerator, denominator] = numStr.split("/");
      result = parseFloat(numerator) / parseFloat(denominator);
    } else {
      result = parseFloat(numStr);
    }

    return isNaN(result) ? "invalid number" : result;
  };

  
  this.getUnit = function(input) {
    const result = input.match(/[a-zA-Z]+$/);
    if (!result) return 'invalid unit';

    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) return 'invalid unit';

    return unit === 'l' ? 'L' : unit;
  };

  
  this.getReturnUnit = function(initUnit) {
    const map = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs"
    };

    return map[initUnit];
  };


  this.spellOutUnit = function(unit) {
  const spellMap = {
    gal: "gallons",
    L: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms"
  };

  return spellMap[unit];
  };

  
  this.convert = function(initNum, initUnit) {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  switch (initUnit) {
    case "gal": return parseFloat((initNum * galToL).toFixed(5));
    case "L": return parseFloat((initNum / galToL).toFixed(5));
    case "lbs": return parseFloat((initNum * lbsToKg).toFixed(5));
    case "kg": return parseFloat((initNum / lbsToKg).toFixed(5));
    case "mi": return parseFloat((initNum * miToKm).toFixed(5));
    case "km": return parseFloat((initNum / miToKm).toFixed(5));
    default: return "invalid unit";
  }
  };

  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
  const initUnitFull = this.spellOutUnit(initUnit);
  const returnUnitFull = this.spellOutUnit(returnUnit);
  return `${initNum} ${initUnitFull} converts to ${returnNum} ${returnUnitFull}`;
  };

  
}

module.exports = ConvertHandler;
