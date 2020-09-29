'use strict';

//Данные для гененрации карточек   
const umberCards = 1,
	  titleTemplate = ["Большая уютная квартира", "Маленькая неуютная квартира",
					   "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик",
					   "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря",
					   "Неуютное бунгало по колено в воде"],
	  typeTemplate = ['palace', 'flat', 'house', 'bungalo'],
	  checkTemplate = ['12:00', '13:00', '14:00'],
	  featuresTemplate = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',' '],
	  photosTemplate = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
					    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
						"http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
// // // //

const mapWrapper = document.querySelector('.map.map--faded');

let cards = createArrCard(8);
	  

function createArrCard (umberCards) {
	let arr = [];
	for (let i = 0; i < umberCards; i++){
		arr[i] = {
			'author': {'avatar':`img/avatars/user0${i+1}.png`},
			'location': {
				'x': mapWrapper.offsetWidth,
				'y': getRandomNumber(130, 630)
			},
			'offer': {
				'title': titleTemplate[getRandomNumber(0, titleTemplate.length - 1)],
				'address': `${location.x}, ${location.y}`,
				'price': getRandomNumber(1000, 1000000),
				'type': typeTemplate[getRandomNumber(0, typeTemplate.length - 1)],
				'rooms': getRandomNumber(1, 5),
				'guests': getRandomNumber(0, 6),
				'checkin': checkTemplate[getRandomNumber(0, checkTemplate.length - 1)],
				'checkout': checkTemplate[getRandomNumber(0, checkTemplate.length - 1)],
				'features': featuresTemplate[getRandomNumber(0, featuresTemplate.length - 1)],
				'description': ' ',
				'photos': photosTemplate,  
			},
		};
	}
	return arr;
}












// ?Способ создания с помощью класса
// class AnnouncementCard {
// 	constructor(avatar, title, price, type, rooms, guests, checkin, checkout,
// 		features, description, photos, locationX, locationY){
// 		this.author = {'avatar': `img/avatars/user${avatar}.png`};
// 		this.offer = {
// 			'title': title,
// 			'address': `${locationX}, ${locationY}`,
// 			'price': price,
// 			'type': type,
// 			'rooms': rooms,
// 			'guests': guests,
// 			'checkin': checkin,
// 			'checkout': checkout,
// 			'features': features,
// 			'description': description,
// 			'photos': photos
// 		};
// 		this.location = {
// 			'x': locationX,
// 			'y': locationY
// 		};
// 	}
// }

// function createCard (umberCards) {
// 	for (let i = 0; i < umberCards; i++){
// 		 cards[i] = new AnnouncementCard(
// 			'0'+(i+1),
// 			titleTemplate[getRandomNumber(0, titleTemplate.length - 1)],
// 			getRandomNumber(1000, 1000000),
// 			typeTemplate[getRandomNumber(0, typeTemplate.length - 1)],
// 			getRandomNumber(1, 5),
// 			getRandomNumber(0, 6),
// 			checkTemplate[getRandomNumber(0, checkTemplate.length - 1)],
// 			checkTemplate[getRandomNumber(0, checkTemplate.length - 1)],
// 			featuresTemplate[getRandomNumber(0, featuresTemplate.length - 1)],
// 			' ',
// 			photosTemplate, mapWrapper.offsetWidth, getRandomNumber(130, 630)
// 		);
// 	}
// }