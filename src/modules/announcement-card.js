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
				<h4 class = "${type}">${type}</h4>
				<p>${rooms} комнаты для ${guests} гостей</p>
				<p>Заезд после ${checkin}, выезд до ${checkout}</p>
				<ul class="popup__features">
					${this.addFeatures()}
				</ul>
				<p>${description} (тут будет отзыв)</p>
				<ul class="popup__pictures">
					<li><img src=${photos[0]}></li>	
					<li><img src=${photos[1]}></li>	
				</ul>
			</article>
			<button style="left: ${x}px; top: ${y}px;" class="map__pin card">
				<img src=${avatar} width="40" height="40" draggable="false">
			</button>
		`;
		
		div.classList.add('map__card__wrapper');
		document.querySelector('.map__pins').append(div);
	}
}

export default AnnouncementCard;