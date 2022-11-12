function Viewer({ target }) {
	this._target = target;
	this._element = document.createElement('input');
	this._element.className = 'viewer';

	this.fisrtNumber = '0';
	this.secondNumber = '';
	this.operator = '';
	this.result = this.fisrtNumber;

	this.setData = (word) => {
		if (!word) {
			return;
		}

		if (word === 'c') {
			this.clean();
			this.rendor();
		}

		if (word.match(/[+,\-,*,%,\/]/)) {
			this.operator = word;
			return;
		}

		if (word === '=') {
			if (!this.secondNumber) return;
			this.result = this.getCalculate();
			this.fisrtNumber = '0';
			this.secondNumber = '';
			this.operator = '';
			this.rendor();
			return;
		}

		if (word.match(/[0-9]/)) {
			if (this.operator) {
				this.secondNumber += word;
				this.secondNumber = Number(this.secondNumber);
				this.result = this.secondNumber;
				this.rendor();
			} else {
				this.fisrtNumber += word;
				this.fisrtNumber = Number(this.fisrtNumber);
				this.result = this.fisrtNumber;
				this.rendor();
			}
		}
	};

	this.clean = () => {
		this.fisrtNumber = '0';
		this.secondNumber = '';
		this.operator = '';
		this.result = '0';
	};

	this.getCalculate = () => {
		let fisrtNumber = Number(this.fisrtNumber);
		let secondNumber = Number(this.secondNumber);
		console.log(fisrtNumber, secondNumber);
		let result = '';

		switch (this.operator) {
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
				break;
		}

		return result;
	};

	this.onKeyPress = (e) => {
		if (e.keyCode === 8) this.clean();
		if (e.key.match(/[0-9]|[\/,+,*,%,-,=]/) || e.keyCode === 13)
			this.setData(e.key);
	};

	this.rendor = () => {
		this._target.prepend(this._element);
		this._element.addEventListener('keyup', this.onKeyPress);
		this._element.setAttribute('readonly', true);
		this._element.focus();
		this.setData();
		console.log(this.result);
		this._element.value = this.result;
	};

	this.rendor();
}

export default Viewer;
