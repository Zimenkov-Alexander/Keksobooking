import AnnouncementCard from './announcement-card';
import template from './template';
import {getRandomNumber, generationRandomArr} from './func-random';

function createCard (numberCards, mapWrapper) {
	let arr = [];
	for (let i = 0; i < numberCards; i++){
		arr[i] = new AnnouncementCard(
			'0'+(i+1),
			template.title[getRandomNumber(0, template.title.length - 1)],
			getRandomNumber(1000, 1000000),
			template.type[getRandomNumber(0, template.type.length - 1)],
			getRandomNumber(1, 5),
			getRandomNumber(0, 3),
			template.check[getRandomNumber(0, template.check.length - 1)],
			template.check[getRandomNumber(0, template.check.length - 1)],
			generationRandomArr (template.features),
			' ',
			template.photos,
			getRandomNumber(20, mapWrapper.offsetWidth-50) ,
			getRandomNumber(130, 500)
		);
	}
	return arr;
}

export default createCard;