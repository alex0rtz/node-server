exports.float = (number, decimals_number = 2) => parseFloat(parseFloat(number).toFixed(decimals_number));
    
exports.is = (number) => !isNaN(parseFloat(number)) && isFinite(number);