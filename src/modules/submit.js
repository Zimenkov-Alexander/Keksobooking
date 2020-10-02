
function submit(selector) {
	console.log(selector);
	console.log(document.querySelector(selector));

	document.querySelector(selector).addEventListener('submit', (evt) => {
		evt.preventDefault();

		let modal = document.querySelector('.modal__wrapper');
		
		let showModal = () => {
			modal.classList.remove('hidden');
			setTimeout(hideModal, 2000);
		}
		let hideModal = () => {
			modal.classList.add('hidden');
		}

		setTimeout(showModal, 500);
	});
}

export default submit;