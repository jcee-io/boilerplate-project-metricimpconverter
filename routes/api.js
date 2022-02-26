'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let json = {};
    const { input } = req.query;
  
    console.log('before num');
    json.initNum = convertHandler.getNum(input);
    json.initUnit = convertHandler.getUnit(input);
    const result = convertHandler.convert(json.initNum, json.initUnit);

    json = {...json, ...result};
    console.log(json.string);
    res.json(json);
  });
};
