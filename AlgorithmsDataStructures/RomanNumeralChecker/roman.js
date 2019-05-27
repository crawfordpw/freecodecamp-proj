function convertToRoman(num) {
	if(num < 1 || num > 3999){ return ""; }

	symbolTable = [
		["M", 1000],	
		["CM", 900],	
		["D", 500],	
		["CD", 400],	
		["C", 100],	
		["XC", 90],	
		["L", 50],	
		["XL", 40],	
		["X", 10],	
		["IX", 9],	
		["V", 5],	
		["IV", 4],	
		["I", 1]	
	];

	let i = 0;
	let result = "";
	while(num > 0){
		if(symbolTable[i][1] <= num){
			result += symbolTable[i][0];
			num -= symbolTable[i][1];
		}
		else{
			i++;
		}
	}
	return result;
}

module.exports = convertToRoman;
