const cipher = require('./cipher.js')

let allTests = [["SERR PBQR PNZC", "FREE CODE CAMP"], ["SERR CVMMN!", "FREE PIZZA!"], ["SERR YBIR?", "FREE LOVE?"], ["GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.", "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."]];
let failedTests = [];

for(let i = 0; i < allTests.length; i++){
	let result = cipher(allTests[i][0]);
	if(result !== allTests[i][1]){
		failedTests.push([allTests[i], result]);
	}
}

console.log(`Passed ${allTests.length - failedTests.length}/${allTests.length} tests:\n`);
if(failedTests.length > 0){
	for(let i = 0; i < failedTests.length; i++){
		console.log(`"${failedTests[i][0][0]}" failed. result was ${typeof failedTests[i][1]} "${failedTests[i][1]}", expected ${typeof failedTests[i][0][1]} "${failedTests[i][0][1]}"`);
	}
}


/*
rot13("SERR PBQR PNZC") should decode to FREE CODE CAMP
rot13("SERR CVMMN!") should decode to FREE PIZZA!
rot13("SERR YBIR?") should decode to FREE LOVE?
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") should decode to THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
*/
