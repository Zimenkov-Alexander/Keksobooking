'use strict';

var DIMENSIONS_MAP_PIN_IMG = {
  x: 62,
  y: 62,
  after: 22
};

//Функция Ранодом
function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


  //Поск позиции элемента
  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
  
    return {
      top: box.top + pageYOffset,
      bottom : box.bottom  + pageYOffset,
      left: box.left + pageXOffset,
      right: box.right  + pageXOffset
    };
  }



var arrApartmentDescriptions = ["Большая уютная квартира", "Маленькая неуютная квартира",
"Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик",
"Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var arrTypeHouse = ['palace', 'flat', 'house', 'bungalo'];
var arrTime = ['12:00', '13:00', '14:00'];
var arrFeatures = [" wifi", " dishwasher", " parking", " washer", " elevator", " conditioner"];
// var locationX = document.querySelector('.map__pinsoverlay');
var locationX = [-500, 500];

//Функция добавления случайного элемента из массива
function randomFeatures (array) {
  var arr = [];
  for (var i = 0; i<array.length; i++){
    var elem = randomInteger (0,1);
    if (elem){
      arr.push(array[i]);
    }
  }
  return arr
}

//Функция создания рандомного массива
function createArray (numberObjects){
  var arrayObjects = [];
  for (var i = 0; i<numberObjects; i++){
    var objects = {
     author: {
      avatar: 'img/avatars/user0' + randomInteger(1,8) + '.png',
      },
      offer: {
        title: arrApartmentDescriptions[randomInteger(0, arrApartmentDescriptions.length-1)],
        address: '600, 350',
        price: randomInteger(1000,1000000),
        type: arrTypeHouse [randomInteger(0,arrTypeHouse.length-1)],
        rooms: randomInteger(1,5),
        guests: randomInteger(0,10),
        checkin: arrTime [randomInteger(0,arrTime.length-1)],
        checkout: arrTime [randomInteger(0,arrTime.length-1)],
        features: randomFeatures(arrFeatures),
        description: '',
        photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
        location: {
          // x: randomInteger(locationX.offsetLeft,locationX.offsetWidth),
          x: randomInteger(50,1150),
          y: randomInteger(130,630)
      }
    }
    };
    arrayObjects[i] = objects;
      }
      return arrayObjects;
  }

var similarAds = createArray(2);

var map = document.querySelector('.map');
var btnTemplate = document.querySelector('template').content.querySelectorAll('button')[1];

function createIcon (){
  var div = document.createElement('div');
  for (var i = 0; i<similarAds.length; i++){
      var element = btnTemplate.cloneNode(true);
      div.classList.add('map__pins')
      element.setAttribute('style', 'left:'+ similarAds[i].offer.location.x + 'px');
      element.style.top = similarAds[i].offer.location.y + 'px';
      element.querySelector('img').setAttribute('src', similarAds[i].author.avatar);
      element.setAttribute('alt', similarAds[i].offer.title);
      element.classList.add ('elem');
      div.appendChild(element);
  }
  return div;
}

var artTemplate = document.querySelector('template').content.querySelector('article');

function createArticle (){
  var pool = document.querySelector('.map__filters-container');
  // var elem = document.querySelectorAll('.elem');
  for (var i = 0; i<similarAds.length; i++){
    var element = artTemplate.cloneNode(true);
      element.querySelector('h3').textContent = similarAds[i].offer.title;
      element.querySelector('h3').classList.add('popup__title');
      element.querySelectorAll('p')[0].textContent = similarAds[i].offer.address;
      element.querySelector('p').classList.add('popup__text--address');
      element.querySelector('.popup__price').textContent = similarAds[i].offer.price + ' ₽/ночь';
      switch(similarAds[i].offer.type) {
        case 'palace':  
        element.querySelector('h4').textContent = 'Дворец';
        break
        case 'flat':  
        element.querySelector('h4').textContent = 'Квартира';
        break
        case 'house':
          element.querySelector('h4').textContent = 'Дом';
          break
          case 'bungalo':  
          element.querySelector('h4').textContent = 'Бунгало';
          break
        }
        element.querySelector('h4').classList.add('popup__type');
        element.querySelectorAll('p')[2].textContent = similarAds[i].offer.rooms + ' комнаты для ' + similarAds[i].offer.guests + ' гостей' ;
        element.querySelectorAll('p')[2].classList.add('popup__text--capacity');
        element.querySelectorAll('p')[3].textContent = 'Заезд после ' + similarAds[i].offer.checkin + ' выезд до ' +  similarAds[i].offer.checkout;
        element.querySelectorAll('p')[3].classList.add('popup__text--time');
        element.querySelector('.popup__features').textContent = similarAds[i].offer.features;
        element.querySelectorAll('p')[4].textContent = similarAds[i].offer.description;
        element.querySelectorAll('p')[4].classList.add('popup__description');
        element.querySelectorAll('img')[0].setAttribute('src', similarAds[i].author.avatar);
        element.setAttribute('disabled', 'disabled');
        
        
        // element.querySelectorAll('img')[1].setAttribute('src', similarAds[i].offer.photos[0]);
      pool.before(element);
    }
  return pool;
}
var createdAd = createArticle();

var fieldset = document.querySelectorAll('fieldset');
var address = document.querySelector('#address');

var addDisabled = function(element){
  for (var i = 0; i < element.length; i++){
    element[i].setAttribute('disabled', 'disabled');
  }
};

var removeDisabled = function(element){
  for (var i = 0; i < element.length; i++){
    element[i].removeAttribute('disabled');
  }
};
var fieldsetDisabled = addDisabled(fieldset);



var btnMap = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var iconBtn = createIcon();

btnMap.addEventListener('mouseup', function(){
  fieldsetDisabled = removeDisabled(fieldset);
  map.classList.remove('map--faded');
  address.setAttribute('placeholder', (getCoords(btnMap).right-(DIMENSIONS_MAP_PIN_IMG.x/2)) +
  ':' + (getCoords(btnMap).top-DIMENSIONS_MAP_PIN_IMG.y-DIMENSIONS_MAP_PIN_IMG.after));
  mapPins.appendChild(iconBtn)

});  

// var elem = document.querySelectorAll('.elem'); 

iconBtn.addEventListener('click', function(e){
  // var target = e.target;

}) 



// var btnClose = document.querySelector('.popup__close');
// console.log(btnClose);


// btnClose.addEventListener('click', function(){
//   btnClose.hidden = true;

// })
