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
  });

  // suite('Conversions', function() {
    
  // });
});