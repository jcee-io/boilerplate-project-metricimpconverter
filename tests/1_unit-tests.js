const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Whole Number Inputs', function() {
    test('convertHandler should correctly read a whole number input.', function() {
      assert.equal(12, convertHandler.getNum(12), 'a number should return a number');
      assert.equal(12, convertHandler.getNum('12oz'), 'should return number with a unit');
    });
  });

  // suite('Everything working fine with input units', function() {
    
  // });

  // suite('Conversions', function() {
    
  // });
});