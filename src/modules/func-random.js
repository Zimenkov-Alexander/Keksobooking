function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
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

export {getRandomNumber, generationRandomArr};