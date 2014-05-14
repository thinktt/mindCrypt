var x, y, secretNums = [], secretNumber;


for(x=10; x<=99; x++) {
	secretNumber = (x - (Math.floor(x/10) + (x%10))); 
	if(secretNums.indexOf(secretNumber) === -1) {
		secretNums.push(secretNumber); 
	}

}

console.log(secretNums); 

x = [9, 18, 27, 36, 45, 54, 63, 72, 81];
x = [8, 17, 26, 35, 44, 53, 62, 71, 80];

var string = 'abc';
string = string.replaceAt(8, 'e'); 
console.log(string); 
