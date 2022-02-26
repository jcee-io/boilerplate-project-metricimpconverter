function ConvertHandler() {
  
  this.getNum = function(input) {
    if(Number(input)) return input;
    
    let result = '';

    for(let char of input) {
      if(isNaN(char)) {
        break;
      }

      result += char;
    }

    return Number(result);
  };
  
  this.getUnit = function(input) {
    let result = '';
    for(let char of input) {
      if(isNaN(char)) {
        break;
      }
      if(char !== undefined) {
        result += char;
      }
      
    }
    
    result = input.slice(result.length);
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const convertUnit = {
      mi: 'km',
      lbs: 'kg',
      gal: 'L',
      L: 'gal',
      l: 'gal',
      km: 'mi',
      kg: 'lbs',
    };
 
    return convertUnit[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const convertFullWord = {
      mi: 'miles',
      lbs: 'pounds',
      gal: 'gallons',
      L: 'liters',
      l: 'liters',
      kg:' kilograms',
      Kg: 'kilograms',
      km: 'kilometers',
      Km: 'kilometers',
    };
    
    return convertFullWord[unit];
  };

  this.round = function(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const convertMap = {
      mi: miToKm,
      lbs: lbsToKg,
      gal: galToL,
      L: 1/galToL,
      l: 1/galToL,
      km: 1/miToKm,
      Km: 1/miToKm,
      kg: 1/lbsToKg,
      Kg: 1/lbsToKg,
    };
  
    let result = {};
    result.returnUnit = this.getReturnUnit(initUnit);
    result.returnNum = convertMap[initUnit] * initNum;
    result.string = this.getString(initNum, initUnit, result.returnNum, result.returnUnit);

    result.returnNum = this.round(result.returnNum,5);
    
    // result.returnNum = String(result.returnNum);

    // const splittedNum = result.returnNum.split('.');
    // splittedNum[1] = splittedNum[1].slice(0,5);
    // result.returnNum = splittedNum.join('.');
    // result.returnNum = parseFloat(result.returnNum);
    
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
