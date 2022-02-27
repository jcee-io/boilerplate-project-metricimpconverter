const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Number Inputs', function() {
    test('convertHandler should correctly read a whole number input.', function() {
      assert.equal(12, convertHandler.getNum(12), 'a number should return a number');
      assert.equal(12, convertHandler.getNum('12oz'));
    });
    test('convertHandler should correctly read a decimal number input.', function() {
      assert.equal(12.12, convertHandler.getNum('12.12'));
    });
    test('convertHandler should correctly read a fractional input.', function() {
      assert.equal(12, convertHandler.getNum('108/9'));
    });
    test('convertHandler should correctly read a fractional input with a decimal.', function() {
      assert.equal(12, convertHandler.getNum('18/1.5'));
    });
    test('convertHandler should correctly read a fractional number input with a decimal.', function() {
      assert.equal(12, convertHandler.getNum('18/1.5'));
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function() {
      assert.equal('invalid number', convertHandler.getNum('18/1.5/2'));
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
      assert.equal(1, convertHandler.getNum('jcee'));
    });
  });

  suite('Unit Inputs', function() {
    test('convertHandler should correctly read each valid input unit.', function() {
      assert.equal('gal', convertHandler.getUnit('12gal'));
      assert.equal('L', convertHandler.getUnit('12l'));
      assert.equal('mi', convertHandler.getUnit('12mi'));
      assert.equal('km', convertHandler.getUnit('12km'));
      assert.equal('lbs', convertHandler.getUnit('12lbs'));
      assert.equal('kg', convertHandler.getUnit('12kg'));
    });
    test('convertHandler should correctly return an error for an invalid input unit.', function() {
      assert.equal('invalid unit', convertHandler.getUnit('12jcee'));
    });   
    test('convertHandler should return the correct return unit for each valid input unit.', function() {
      assert.equal('L', convertHandler.getReturnUnit('gal'));
      assert.equal('gal', convertHandler.getReturnUnit('L'));
      assert.equal('km', convertHandler.getReturnUnit('mi'));
      assert.equal('mi', convertHandler.getReturnUnit('km'));
      assert.equal('kg', convertHandler.getReturnUnit('lbs'));
      assert.equal('lbs', convertHandler.getReturnUnit('kg'));
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
      assert.equal('gallons', convertHandler.spellOutUnit('gal'));
      assert.equal('liters', convertHandler.spellOutUnit('L'));
      assert.equal('miles', convertHandler.spellOutUnit('mi'));
      assert.equal('kilometers', convertHandler.spellOutUnit('km'));
      assert.equal('pounds', convertHandler.spellOutUnit('lbs'));
      assert.equal('kilograms', convertHandler.spellOutUnit('kg'));
    });
  });

  suite('Conversions', function() {
    test('convertHandler should correctly convert gal to L.', function() {
      const { returnNum, returnUnit, string } = convertHandler.convert(1, 'gal');
      assert.equal(3.78541, returnNum);
      assert.equal('L', returnUnit);
      assert.equal('1 gallons converts to 3.78541 liters', string);
    });

    test('convertHandler should correctly convert L to gal.', function() {
      const { returnNum, returnUnit, string } = convertHandler.convert(1, 'L');
      const roundedNumber = convertHandler.round(1/3.78541, 5);

      assert.equal(roundedNumber, returnNum);
      assert.equal('gal', returnUnit);
      assert.equal('1 liters converts to 0.26417 gallons', string);
    });
    
    test('convertHandler should correctly convert mi to km.', function() {
      const { returnNum, returnUnit, string } = convertHandler.convert(1, 'mi');
      const roundedNumber = convertHandler.round(1.60934, 5);

      assert.equal(roundedNumber, returnNum);
      assert.equal('km', returnUnit);
      assert.equal('1 miles converts to 1.60934 kilometers', string);
    });   

    test('convertHandler should correctly convert km to mi.', function() {
      const { returnNum, returnUnit, string } = convertHandler.convert(1, 'km');
      const roundedNumber = convertHandler.round(1/1.60934, 5);

      assert.equal(roundedNumber, returnNum);
      assert.equal('mi', returnUnit);
      assert.equal('1 kilometers converts to 0.62137 miles', string);
    });

    test('convertHandler should correctly convert lbs to kg.', function() {
      const { returnNum, returnUnit, string } = convertHandler.convert(1, 'lbs');
      const roundedNumber = convertHandler.round(0.453592, 5);

      assert.equal(roundedNumber, returnNum);
      assert.equal('kg', returnUnit);
      assert.equal('1 pounds converts to 0.45359 kilograms', string);
    });

    test('convertHandler should correctly convert kg to lbs.', function() {
      const { returnNum, returnUnit, string } = convertHandler.convert(1, 'kg');
      const roundedNumber = convertHandler.round(1/0.453592, 5);

      assert.equal(roundedNumber, returnNum);
      assert.equal('lbs', returnUnit);
      assert.equal('1 kilograms converts to 2.20462 pounds', string);
    });  
  });
});