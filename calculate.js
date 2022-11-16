const returnCalculate = (fisrtNumber, operator, secondNumber) => {
	if (
		(!fisrtNumber && fisrtNumber !== 0) ||
		!operator ||
		(!secondNumber && fisrtNumber !== 0)
	)
		return false;

	fisrtNumber = Number(fisrtNumber);
	secondNumber = Number(secondNumber);
	// console.log(typeof fisrtNumber);
	// console.log(typeof operator);
	// console.log(typeof secondNumber);
	let result;

	switch (operator) {
		case '+':
			result = fisrtNumber + secondNumber;
			break;

		case '-':
			result = fisrtNumber - secondNumber;
			break;

		case '/':
			result = fisrtNumber / secondNumber;
			break;

		case '*':
			result = fisrtNumber * secondNumber;
			break;

		case '%':
			result = fisrtNumber % secondNumber;
			break;

		default:
			result = false;
			break;
	}

	return result;
};

export default returnCalculate;
