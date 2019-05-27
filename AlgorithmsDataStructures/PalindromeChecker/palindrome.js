function palindrome(str) {
	let frontPtr = 0;
	let backPtr = str.length - 1;

	while(frontPtr <= backPtr){
		while(/[\W_]/.test(str[frontPtr])){
			frontPtr++;
		}

		while(/[\W_]/.test(str[backPtr])){
			backPtr--;
		}

		if(str[frontPtr].toLowerCase() !== str[backPtr].toLowerCase()){
			return false;
		}
		frontPtr++;
		backPtr--;
	}

	return true;
}

module.exports = palindrome; 
