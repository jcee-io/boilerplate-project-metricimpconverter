'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

const isInvalidInput = (num, unit, res) => {
  if(num === 'invalid number' || unit === 'invalid unit') {
    if(num === 'invalid number' && unit === 'invalid unit') {
      res.json({ error: 'invalid number and unit' });
      return true;
    }
  
    if(num === 'invalid number') {
      res.json({ error: 'invalid number' });
      return true;        
    }
  
    res.json({ error: 'invalid unit' });
    return true;      
  }

  return false;
};

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let json = {};
    const { input } = req.query;
  
    json.initNum = convertHandler.getNum(input);
    json.initUnit = convertHandler.getUnit(input);

    if(isInvalidInput(json.initNum, json.initUnit, res)) {
      return;
    }
    
    const result = convertHandler.convert(json.initNum, json.initUnit);

    json = {...json, ...result};

    res.json(json);
  });
};
