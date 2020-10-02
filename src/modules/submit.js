
function submit(selector) {
	document.querySelector(selector).addEventListener('submit', (evt) => {
		evt.preventDefault();

		let modal = document.querySelector('.modal__wrapper');
		
		function showModal () {
			modal.classList.remove('hidden');
			setTimeout(hideModal, 2000);
		}
		function hideModal () {
			modal.classList.add('hidden');
		}

		setTimeout(showModal, 500);
	});
}

export default submit;