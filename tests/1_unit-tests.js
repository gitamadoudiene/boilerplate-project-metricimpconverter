const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  
  test('convertHandler should correctly read a whole number input.', function () {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input.', function () {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('convertHandler should correctly read a fractional input.', function () {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.approximately(convertHandler.getNum('5.4/3kg'), 1.8, 0.01);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('convertHandler should correctly read each valid input unit.', function () {
    const inputUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    inputUnits.forEach(unit => {
      assert.equal(convertHandler.getUnit(`10${unit}`), unit === 'l' ? 'L' : unit);
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    const pairs = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    for (let unit in pairs) {
      assert.equal(convertHandler.getReturnUnit(unit), pairs[unit]);
    }
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    const fullNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    for (let unit in fullNames) {
      assert.equal(convertHandler.spellOutUnit(unit), fullNames[unit]);
    }
  });

  test('convertHandler should correctly convert gal to L.', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('convertHandler should correctly convert L to gal.', function () {
    assert.approximately(convertHandler.convert(3.78541, 'L'), 1, 0.1);
  });

  test('convertHandler should correctly convert mi to km.', function () {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('convertHandler should correctly convert km to mi.', function () {
    assert.approximately(convertHandler.convert(1.60934, 'km'), 1, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg.', function () {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs.', function () {
    assert.approximately(convertHandler.convert(0.453592, 'kg'), 1, 0.1);
  });

});
