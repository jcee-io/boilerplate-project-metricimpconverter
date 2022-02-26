'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let json = {};
    const { input } = req.query;
  
    json.initNum = convertHandler.getNum(input);
    json.initUnit = convertHandler.getUnit(input);

    if(json.initNum === 'invalid number' || json.initUnit === 'invalid unit') {
      if(json.initNum === 'invalid number' && json.initUnit === 'invalid unit') {
        res.json({ error: 'invalid number and unit' });
        return;
      }

      if(json.initNum === 'invalid number') {
        res.json({ error: 'invalid number' });
        return;        
      }

      res.json({ error: 'invalid unit' });
      return;      
    }
    const result = convertHandler.convert(json.initNum, json.initUnit);

    json = {...json, ...result};

    res.json(json);
  });
};
