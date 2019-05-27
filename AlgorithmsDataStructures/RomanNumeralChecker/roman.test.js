const roman = require('./roman.js')

let allTests = [[2, "II"], [3, "III"], [4, "IV"], [5, "V"], [9, "IX"], [12, "XII"], [16, "XVI"], [29, "XXIX"], [44, "XLIV"], [45, "XLV"], [68, "LXVIII"], [83, "LXXXIII"], [97, "XCVII"], [99, "XCIX"], [400, "CD"], [500, "D"], [501, "DI"], [649, "DCXLIX"], [798, "DCCXCVIII"], [891, "DCCCXCI"], [1000, "M"], [1004, "MIV"], [1006, "MVI"], [1023, "MXXIII"], [2014, "MMXIV"], [3999, "MMMCMXCIX"]];
let failedTests = [];

for(let i = 0; i < allTests.length; i++){
	let result = roman(allTests[i][0]);
	if(result !== allTests[i][1]){
		failedTests.push([allTests[i], result]);
	}
}

console.log(`Passed ${allTests.length - failedTests.length}/${allTests.length} tests:\n`);
if(failedTests.length > 0){
	for(let i = 0; i < failedTests.length; i++){
		console.log(`${failedTests[i][0][0]} failed. result was ${typeof failedTests[i][1]} "${failedTests[i][1]}", expected ${typeof failedTests[i][0][1]} "${failedTests[i][0][1]}"`);
	}
}

/*
convertToRoman(2) should return "II".
convertToRoman(3) should return "III".
convertToRoman(4) should return "IV".
convertToRoman(5) should return "V".
convertToRoman(9) should return "IX".
convertToRoman(12) should return "XII".
convertToRoman(16) should return "XVI".
convertToRoman(29) should return "XXIX".
convertToRoman(44) should return "XLIV".
convertToRoman(45) should return "XLV"
convertToRoman(68) should return "LXVIII"
convertToRoman(83) should return "LXXXIII"
convertToRoman(97) should return "XCVII"
convertToRoman(99) should return "XCIX"
convertToRoman(400) should return "CD"
convertToRoman(500) should return "D"
convertToRoman(501) should return "DI"
convertToRoman(649) should return "DCXLIX"
convertToRoman(798) should return "DCCXCVIII"
convertToRoman(891) should return "DCCCXCI"
convertToRoman(1000) should return "M"
convertToRoman(1004) should return "MIV"
convertToRoman(1006) should return "MVI"
convertToRoman(1023) should return "MXXIII"
convertToRoman(2014) should return "MMXIV"
convertToRoman(3999) should return "MMMCMXCIX"
*/
