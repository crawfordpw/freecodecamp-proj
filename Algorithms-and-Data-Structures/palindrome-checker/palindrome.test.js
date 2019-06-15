const palindrome = require('./palindrome.js')

let allTests = [["eye", true], ["_eye", true], ["race car", true], ["not a palindrome", false], ["A man, a plan, a canal. Panama", true], ["never odd or even", true], ["nope", false], ["almostomla", false], ["My age is 0, 0 si ega ym.", true], ["1 eye for of 1 eye.", false], ["0_0 (: /-\\ :) 0-0", true], ["five|\\_/|four", false]];
let failedTests = [];

for(let i = 0; i < allTests.length; i++){
	let result = palindrome(allTests[i][0]);
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
palindrome("eye") should return true.
palindrome("_eye") should return true.
palindrome("race car") should return true.
palindrome("not a palindrome") should return false.
palindrome("A man, a plan, a canal. Panama") should return true.
palindrome("never odd or even") should return true.
palindrome("nope") should return false.
palindrome("almostomla") should return false.
palindrome("My age is 0, 0 si ega ym.") should return true.
palindrome("1 eye for of 1 eye.") should return false.
palindrome("0_0 (: /-\ :) 0-0") should return true.
palindrome("five|\_/|four") should return false.
*/
