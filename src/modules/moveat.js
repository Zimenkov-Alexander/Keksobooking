import createCard from './create-card';

function moveat (fieldset, address, mapPinMain) {

	const mapWrapper = document.querySelector('#map-wrapper');

	let cards;

	mapPinMain.addEventListener('mousedown', (evt) => {
		
		let shiftX = evt.clientX - mapPinMain.getBoundingClientRect().left;
		let shiftY = evt.clientY - mapPinMain.getBoundingClientRect().top;

		document.body.append(mapPinMain);

		mapWrapper.classList.remove('map--faded');
		
		moveAt(evt.pageX, evt.pageY);
	
		mapPinMain.addEventListener('mousemove', onMouseMove);
	
		mapPinMain.addEventListener('mouseup', () => {
			mapPinMain.removeEventListener('mousemove',onMouseMove);
			mapPinMain.onmouseup = null;
			address.value = `Улица: ${mapPinMain.offsetLeft-500} дом: ${mapPinMain.offsetTop}`; 	
		});
	
		fieldset.forEach(item => {item.removeAttribute('disabled');});
		document.querySelector('.notice__form').classList.remove('notice__form--disabled');
		
		if (!cards){
			cards = createCard(8, mapWrapper);
			cards.forEach(item => {item.render();});
		
		
			const btnCards = document.querySelectorAll('.map__pin.card'),
				  mapCard = document.querySelectorAll('.map__card');
		
			btnCards.forEach((item,i) => {
				item.addEventListener('click', () => {
					
					mapCard.forEach(item => item.classList.add('hidden'));
					mapCard[i].classList.remove('hidden');

					document.querySelectorAll('.popup__close')[i].addEventListener('click', () => {
					mapCard[i].classList.add('hidden');
					});
				});
			});
		}
		function moveAt(pageX, pageY) {
			mapPinMain.style.left = pageX - shiftX + 'px';
			mapPinMain.style.top = pageY - shiftY + 'px';
		}
		function onMouseMove(evt) {
			moveAt(evt.pageX, evt.pageY);
		  }
	});

	mapPinMain.ondragstart = function() {
		return false;
	};

}


export {moveat};