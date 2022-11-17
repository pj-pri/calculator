const returnCalculate = (fisrtNumber, operator, secondNumber) => {
	if (
		(!fisrtNumber && fisrtNumber !== 0) ||
		!operator ||
		(!secondNumber && fisrtNumber !== 0)
	)
		return false;

	fisrtNumber = Number(fisrtNumber);
	secondNumber = Number(secondNumber);

	if (Number.isNaN(fisrtNumber) || Number.isNaN(secondNumber)) {
		alert('잘못된 수가 입력되었습니다.');
		return false;
	}

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

	// 너무 큰 수 방지
	if (result >= 9999999999999999) {
		alert('수가 너무 커서 계산할 수 없습니다.');
		return false;
	}

	// 소수점 쓰레기값 방지
	let str = result.toString();
	if (str.match('.') && str.length >= 18) {
		result = result.toFixed(str.length - (str.indexOf('.') + 4));
	}

	return result;
};

export default returnCalculate;
