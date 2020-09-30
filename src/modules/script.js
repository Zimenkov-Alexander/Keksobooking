'use strict';

//?Данные и функции для гененрации объявлений   
const titleTemplate = ["Большая уютная квартира", "Маленькая неуютная квартира",
					   "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик",
					   "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря",
					   "Неуютное бунгало по колено в воде"],
	  typeTemplate = ['palace', 'flat', 'house', 'bungalo'],
	  checkTemplate = ['12:00', '13:00', '14:00'],
	  featuresTemplate = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
	  photosTemplate = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
					    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
						"http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
function createCard (numberCards) {
	let arr = [];
	for (let i = 0; i < numberCards; i++){
		arr[i] = new AnnouncementCard(
			'0'+(i+1),
			titleTemplate[getRandomNumber(0, titleTemplate.length - 1)],
			getRandomNumber(1000, 1000000),
			typeTemplate[getRandomNumber(0, typeTemplate.length - 1)],
			getRandomNumber(1, 5),
			getRandomNumber(0, 3),
			checkTemplate[getRandomNumber(0, checkTemplate.length - 1)],
			checkTemplate[getRandomNumber(0, checkTemplate.length - 1)],
			generationRandomArr (featuresTemplate),
			' ',
			photosTemplate,
			getRandomNumber(20, mapWrapper.offsetWidth-50) ,
			getRandomNumber(130, 500)
		);
	}
	return arr;
}
function generationRandomArr (array) {
	let arr = [], boolean;
	array.forEach(item => {
		boolean = getRandomNumber(0,1);
		if(boolean){
			arr.push(item);
		}
	});
	return arr;
}
// // // //


const mapWrapper = document.querySelector('#map-wrapper');
let cards;

class AnnouncementCard {
	constructor(avatar, title, price, type, rooms, guests, checkin, checkout,
		features, description, photos, locationX, locationY){
		this.author = {'avatar': `img/avatars/user${avatar}.png`};
		this.offer = {
			'title': title,
			'address': `${locationX}, ${locationY}`,
			'price': price,
			'type': type,
			'rooms': rooms,
			'guests': guests,
			'checkin': checkin,
			'checkout': checkout,
			'features': features,
			'description': description,
			'photos': photos
		};
		this.location = {
			'x': locationX,
			'y': locationY
		};
	}
	addFeatures(){
		let arr = [];
		this.offer.features.forEach(item => {
			arr.push(`<li class="feature feature--${item}"></li>`);
		});
		let li = arr.join('');
		return li;
	}
	render() {
		const {avatar} = this.author,
		{title, price, type, rooms, guests, checkin, checkout,
		description, photos} = this.offer,
		{y, x} = this.location;

		const div = document.createElement('div');
		div.innerHTML = `
			<article class="map__card hidden">
				<img src=${avatar} class="popup__avatar" width="70" height="70">
				<button class="popup__close">Закрыть</button>
				<h3>${title}</h3>
				<p><small>${x} Tōkyō-to, Chiyoda-ku, Ichibanchō, ${y}</small></p>
				<p class="popup__price">${price} &#x20bd;/ночь</p>
				<h4>${type}</h4>
				<p>${rooms} комнаты для ${guests} гостей</p>
				<p>Заезд после ${checkin}, выезд до ${checkout}</p>
				<ul class="popup__features">
					${this.addFeatures()}
				</ul>
				<p>${description} (тут будет отзыв)</p>
				<ul class="popup__pictures">
				//Место для фото	
				</ul>
			</article>
			<button style="left: ${x}px; top: ${y}px;" class="map__pin card">
				<img src=${avatar} width="40" height="40" draggable="false">
			</button>
		`;
		// <li><img src=${photos[0]}></li>
		div.classList.add('map__card__wrapper');
		document.querySelector('.map__pins').append(div);
	}
}

const fieldset = document.querySelectorAll('fieldset');
fieldset.forEach(item => {item.setAttribute('disabled', 'disabled');});

const mapPinMain = document.querySelector('.map__pin--main');

const address = document.querySelector('#address');
address.value = `Left: ${mapPinMain.offsetLeft} и Top: ${mapPinMain.offsetTop}`; 	

mapPinMain.addEventListener('mousedown', () => {
	mapWrapper.classList.remove('map--faded');
	
	fieldset.forEach(item => {item.removeAttribute('disabled');});
	document.querySelector('.notice__form').classList.remove('notice__form--disabled');
	
	if (!cards){
		cards = createCard(8);
		cards.forEach(item => {item.render();});
	
	
		const btnCards = document.querySelectorAll('.map__pin.card'),
			mapCard = document.querySelectorAll('.map__card');
	
		btnCards.forEach((item,i) => {
			item.addEventListener('click', () => {
				mapCard[i].classList.remove('hidden');
				document.querySelectorAll('.popup__close')[i].addEventListener('click', () => {
				mapCard[i].classList.add('hidden');
				});
			});
		});
	}


	address.value = `Left: ${mapPinMain.offsetLeft} и Top: ${mapPinMain.offsetTop + 70}`; 	
		console.dir(mapPinMain);
});
