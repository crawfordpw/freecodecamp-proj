const telephone = require('./telephone.js')

let allTests = [["1 555-555-5555", true], ["1 (555) 555-5555", true], ["5555555555", true], ["555-555-5555", true], ["(555)555-5555", true], ["1(555)555-5555", true], ["555-5555", false], ["5555555", false], ["1 555)555-5555", false], ["1 555 555 5555", true], ["1 456 789 4444", true], ["123**&!!asdf#", false], ["55555555", false], ["(6054756961)", false], ["2 (757) 622-7382", false], ["0 (757) 622-7382", false], ["-1 (757) 622-7382", false], ["2 757 622-7382", false], ["10 (757) 622-7382", false], ["27576227382", false], ["(275)76227382", false], ["2(757)6227382", false], ["2(757)622-7382", false], ["555)-555-5555", false], ["(555-555-5555", false], ["(555)5(55?)-5555", false]];
let failedTests = [];

for(let i = 0; i < allTests.length; i++){
	let result = telephone(allTests[i][0]);
	if(result !== allTests[i][1]){
		failedTests.push([allTests[i], result]);
	}
}

console.log(`Passed ${allTests.length - failedTests.length}/${allTests.length} tests:\n`);
if(failedTests.length > 0){
	for(let i = 0; i < failedTests.length; i++){
		console.log(`"${failedTests[i][0][0]}" failed. result was ${typeof failedTests[i][1]} ${failedTests[i][1]}, expected ${typeof failedTests[i][0][1]} ${failedTests[i][0][1]}`);
	}
}


/*
telephoneCheck("1 555-555-5555") should return true.
telephoneCheck("1 (555) 555-5555") should return true.
telephoneCheck("5555555555") should return true.
telephoneCheck("555-555-5555") should return true.
telephoneCheck("(555)555-5555") should return true.
telephoneCheck("1(555)555-5555") should return true.
telephoneCheck("555-5555") should return false.
telephoneCheck("5555555") should return false.
telephoneCheck("1 555)555-5555") should return false.
telephoneCheck("1 555 555 5555") should return true.
telephoneCheck("1 456 789 4444") should return true.
telephoneCheck("123**&!!asdf#") should return false.
telephoneCheck("55555555") should return false.
telephoneCheck("(6054756961)") should return false
telephoneCheck("2 (757) 622-7382") should return false.
telephoneCheck("0 (757) 622-7382") should return false.
telephoneCheck("-1 (757) 622-7382") should return false
telephoneCheck("2 757 622-7382") should return false.
telephoneCheck("10 (757) 622-7382") should return false.
telephoneCheck("27576227382") should return false.
telephoneCheck("(275)76227382") should return false.
telephoneCheck("2(757)6227382") should return false.
telephoneCheck("2(757)622-7382") should return false.
telephoneCheck("555)-555-5555") should return false.
telephoneCheck("(555-555-5555") should return false.
telephoneCheck("(555)5(55?)-5555") should return false.
*/
