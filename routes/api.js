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

    json.initUnit = json.initUnit === 'l' || json.initUnit === 'L' ? json.initUnit.toUpperCase() : json.initUnit.toLowerCase();
    const result = convertHandler.convert(json.initNum, json.initUnit);

    json = {...json, ...result};

    res.json(json);
  });
};
