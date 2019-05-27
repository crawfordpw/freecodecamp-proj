function rot13(str) { 
	let result = "";
	let regex = /[A-Z]/;

	for(let i = 0; i < str.length; i++){
		if(regex.test(str[i])){
			result += String.fromCharCode((str[i].charCodeAt() % 26) + 65);
		}
		else{
			result += str[i];
		}
	}
	return result;
}

module.exports = rot13;
