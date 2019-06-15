let moneyTable = {
	'ONE HUNDRED': 100.00,
	'TWENTY': 20.00,
	'TEN': 10.00,
	'FIVE': 5.00,
	'ONE': 1.00,
	'QUARTER': 0.25,
	'DIME': 0.10,
	'NICKEL': 0.05,
	'PENNY': 0.01
};

function checkCashRegister(price, cash, cid) {
	let result = { status: null, change: [] };
	let change = cash - price;
	let total = cid.reduce((total, curr) => total + curr[1], 0);

	if(total < change){ 
		result.status = "INSUFFICIENT_FUNDS";
	}
	else if(total === change) {
		result.status = "CLOSED";
		result.change = cid;
	}
	else{
		let changeArr = [];
		result.status = "OPEN";

		for(let i = cid.length - 1; i >= 0; i--){
			let currVal = 0;
			
			while(cid[i][1] > 0 && change - moneyTable[cid[i][0]] >= 0){
				change -= moneyTable[cid[i][0]];
				cid[i][1] -= moneyTable[cid[i][0]];
				currVal += moneyTable[cid[i][0]];

				change = Math.round(change * 100) / 100;
			}

			if(currVal > 0){
				changeArr.push([cid[i][0], currVal]);
			}
		}

		if(change > 0){
			result.status = "INSUFFICIENT_FUNDS";
			return result;
		}

		result.change = changeArr;
	}

	return result; 
}

module.exports = checkCashRegister;

// Example cash-in-drawer (cid) array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]
