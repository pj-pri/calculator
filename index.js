import Buttons from './Buttons.js?1';
import Viewer from './Viewer.js?1';

const app = document.querySelector('.app');

function App({ target }) {
	const viewer = new Viewer({ target: target });
	const buttons = new Buttons({
		target: target,
		data: [],
		onClick: viewer.onClick,
	});
}

App({ target: app });
