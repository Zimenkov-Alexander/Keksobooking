'use strict';
import {moveat} from './modules/moveat';

window.addEventListener('DOMContentLoaded', () => {
	
	const fieldset = document.querySelectorAll('fieldset'),
		  address = document.querySelector('#address'),
		  mapPinMain = document.querySelector('.map__pin--main');

	address.value = `Left: ${mapPinMain.offsetLeft} и Top: ${mapPinMain.offsetTop}`; 	
	fieldset.forEach(item => {item.setAttribute('disabled', 'disabled');});


	moveat(fieldset, address, mapPinMain);

});