import Buttons from './Buttons.js';
import Viewer from './Viewer.js';

const app = document.querySelector('.app');

function App({ target }) {
	const viewer = new Viewer({ target: target });
	const buttons = new Buttons({
		target: target,
		data: [],
		onClick: viewer.setData,
	});
}

App({ target: app });
