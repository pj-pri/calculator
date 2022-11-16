const operators_top = [
	['ac', 'clearAll'],
	['+/-', 'invert'],
	// ['c', 'clear'],
	['%', '%'],
];
const operators_right = [
	['/', '/'],
	['x', '*'],
	['-', '-'],
	['+', '+'],
	['=', '='],
];

function Buttons({ target, data, onClick }) {
	this._target = target;
	this._element = document.createElement('div');
	this._element.className = 'buttons';
	this._onClick = (e) => {
		onClick(e.target.dataset.id);
	};

	this.makeNumberButtons = () => {
		let html = '';
		for (let i = 9; i >= 0; i--) {
			html += `<button data-id="${i}">${i}</button>`;
		}
		html += `<button data-id=".">.</button>`;

		return html;
	};

	this.rendor = () => {
		this._element.innerHTML = `
            <div class="buttons_top">${operators_top
				.map((item) => {
					return `<button data-id="${item[1]}">${item[0]}</button>`;
				})
				.join('')}</div>
            <div class="buttons_right">${operators_right
				.map((item) => {
					return `<button data-id="${item[1]}">${item[0]}</button>`;
				})
				.join('')}</div>
            <div class="buttons_number">
                ${this.makeNumberButtons()}
            </div>
        `;
		this._target.appendChild(this._element);
		this._element.querySelectorAll('button').forEach((item) => {
			item.addEventListener('click', this._onClick);
		});
	};
	this.rendor();
}

export default Buttons;
