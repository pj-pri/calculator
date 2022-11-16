import returnCalculate from './calculate.js';

/**
 * stete
 * 0 : 아무것도 입력되지 않은 상태 (default)
 * 1 : 첫번째 숫자가 입력된 상태
 * 2 : 연산자가 입력된 상태
 * 3 : 연산자가 입력되고 두번째 숫자가 입력된 상태
 * 4 : 등호나 엔터가 입력된 상태
 */
function Viewer({ target }) {
	this._target = target;
	this._element = document.createElement('div');
	this._element.className = 'viewer';
	this._inputElement = document.createElement('input');
	this._inputElement.className = 'input-data';
	this._inputElement.setAttribute('readonly', true);
	this._tempElement = document.createElement('div');
	this._tempElement.className = 'temp';
	this._state = 0;

	this.setTemp = (word) => {
		this._tempElement.innerText = word;
	};
	this.getTemp = () => {
		return this._tempElement.innerText;
	};
	this.setInput = (word) => {
		word = word.toString();
		if (word === '.' && word.match(/\./g).length > 1) return;
		if (word[0] === '0' && word[1]?.match(/[0-9]/)) {
			word = word.slice(1, word.length);
		} else if (
			word[0] === '-' &&
			word[1] === '0' &&
			word[2].match(/[0-9]/)
		) {
			word = word[0] + word.slice(2, word.length);
		}
		this._inputElement.value = word;
	};
	this.getInput = () => {
		return this._inputElement.value;
	};

	this.onKeyPress = (e) => {
		if (e.keyCode === 8) {
			this.clean();
			return;
		}
		if (!e.key.match(/[0-9]|[+,\-,\/,*,%,=,.]/) || e.keyCode === 13)
			return false;
		this.setData(e.key);
	};

	this.onClick = (word) => {
		if (word === 'clear') {
			this.clean();
			return;
		}
		if (word === 'clearAll') {
			this.cleanAll();
			return;
		}
		if (word === 'invert') {
			this.numberInvert();
			return;
		}
		if (!word.match(/[0-9]|[+,\-,\/,*,%,=,.]/)) return false;
		this.setData(word);
		this._inputElement.focus();
	};

	this.cleanAll = () => {
		this.setInput('0');
		this.setTemp('');
		this._state = 0;
	};

	this.clean = () => {
		let value = this.getInput();
		value = value.slice(0, value.length - 1);
		this.setInput(value || '0');
	};

	this.addDot = (state) => {
		if (state) {
			this.setInput('0.');
		} else {
			if (this.getInput().match(/./)) {
				return;
			}
			this.setInput(this.getInput() + '.');
		}
	};

	this.numberInvert = () => {
		let value = Number(this.getInput()) * -1;
		this.setInput(value);
	};

	this.setData = (word) => {
		let isOerator = word.match(/[+,\-,\/,*,%]/);
		let isEqual = word.match('=');
		switch (this._state) {
			case 0:
				if (isEqual) return;
				if (isOerator) {
					this.setTemp('0' + word);
					this._state = 2;
				} else {
					if (word === '.') word = '0.';
					this.setInput(word);
					this._state = 1;
				}
				break;
			case 1:
				if (isEqual) return;
				word = this.getInput() + word;
				if (isOerator) {
					this.setTemp(word);
					this._state = 2;
				} else {
					this.setInput(word);
				}
				break;
			case 2:
				if (isEqual) return;
				if (isOerator) {
					word =
						this.getTemp().slice(0, this.getTemp().length - 1) +
						word;
					this.setTemp(word);
				} else {
					this._state = 3;
					this.setInput(word);
				}
				break;
			case 3:
				if (isEqual) {
					let result = this.getCalculate();
					if (result === false) return;

					let fomula = this.getTemp().split('');
					let operator = fomula[fomula.length - 1];
					let fisrtNumber = fomula
						.map((word, i) => {
							if (
								!word.match(/[+,\-,\/,*,%]/) ||
								(word === '-' && i === 0)
							)
								return word;
						})
						.join('');
					let secondNumber = this.getInput();

					this.setTemp(fisrtNumber + operator + secondNumber + '=');
					this.setInput(result);
					this._state = 4;
				} else if (isOerator) {
					let result = this.getCalculate();
					this.setInput(result);
					this.setTemp(result + word);
					this._state = 2;
				} else {
					word = this.getInput() + word;
					this.setInput(word);
				}
				break;
			case 4:
				if (isEqual) {
					let fomula = this.getTemp().split('');
					let fisrtNumber = this.getInput();
					let secondNumber = '';
					let operator;
					fomula.forEach((word, i) => {
						word = word.toString();
						if (
							word.match(/[+,\-,\/,*,%]/) &&
							i !== 0 &&
							!operator
						) {
							operator = word;
						} else if (operator && word !== '=') {
							secondNumber += word;
						}
					});
					let result = returnCalculate(
						fisrtNumber,
						operator,
						secondNumber
					);
					if (result === false) return;
					this.setTemp(fisrtNumber + operator + secondNumber + '=');
					this.setInput(result);
				} else {
					this.setTemp('');
					this.setInput(word);
					this._state = 1;
				}
				break;

			default:
				break;
		}
	};

	this.getCalculate = () => {
		let fomula = this.getTemp();
		let operator = fomula[fomula.length - 1];
		let fisrtNumber = fomula.slice(0, fomula.length - 1);
		let secondNumber = this.getInput();

		return returnCalculate(fisrtNumber, operator, secondNumber);
	};

	this.rendor = () => {
		this._element.append(this._tempElement);
		this._element.append(this._inputElement);
		this._target.append(this._element);
		this._inputElement.addEventListener('keyup', this.onKeyPress);
		this._inputElement.value = 0;
		this._inputElement.focus();
	};

	this.rendor();
}

export default Viewer;
