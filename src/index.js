'use strict';
import {moveat} from './modules/moveat';
import submit from './modules/submit';

window.addEventListener('DOMContentLoaded', () => {
	
	const fieldset = document.querySelectorAll('fieldset'),
		  address = document.querySelector('#address'),
		  mapPinMain = document.querySelector('.map__pin--main');

	address.value = `Улица: ${mapPinMain.offsetLeft-500} дом: ${mapPinMain.offsetTop}`; 	
	fieldset.forEach(item => {item.setAttribute('disabled', 'disabled');});


	moveat(fieldset, address, mapPinMain);
	submit('#form');
});