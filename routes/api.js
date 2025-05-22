'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Gestion des erreurs
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.status(400).json({ error: "invalid number and unit" });
    }
    if (initNum === "invalid number") {
      return res.status(400).json({ error: "invalid number" });
    }
    if (initUnit === "invalid unit") {
      return res.status(400).json({ error: "invalid unit" });
    }

    // Conversion
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Réponse finale
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });

};
