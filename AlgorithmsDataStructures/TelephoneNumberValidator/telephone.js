function telephoneCheck(str) {
	/*
	 * ^(1\s?)?  1 with an optional space at start. optional
	 * (\(\d{3}\)|\d{3})  (3 digits) or 3 digits. need to escape paren 
	 * [\s\-]?  a space or - is optional. need to escape -
	 * \d{3} 3 digits
	 * \d{4}$  4 digits at the end
	 */


	let regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/; 
	return regex.test(str);
}

module.exports = telephoneCheck;
