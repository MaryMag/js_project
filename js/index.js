

	// ===
	// Переключение режимов отображения
	// ===

	var viewTwo = document.querySelector('.catalog_view__item:first-child');
	var viewThree = document.querySelector('.catalog_view__item:last-child');
	var catalogList = document.querySelector('.catalog__list');

	// Приказ товаров по две штуки в ряд
	viewTwo.addEventListener('click', function() {
	  if(catalogList.classList.contains('catalog__list--three'))
	    catalogList.classList.remove('catalog__list--three');
	    catalogList.classList.add('catalog__list--two');
	    viewThree.classList.remove('catalog_view__item--active');
	    viewTwo.classList.add('catalog_view__item--active');
	});

	// Показ товаров по три штуки в ряд
	viewThree.addEventListener('click', function(){
	  if(catalogList.classList.contains('catalog__list--two'));
	  catalogList.classList.remove('catalog__list--two');
	  catalogList.classList.add('catalog__list--three');
	  viewTwo.classList.remove('catalog_view__item--active');
	  viewThree.classList.add('catalog_view__item--active');
	})



	// ===
	// Корзина
	// ===

	var itemButton = document.querySelectorAll('.catalog_cart__btn .btn');
	var arrayCart = [];
	var list = document.querySelector('.catalog_basket__list');
	var finalPrice = document.querySelector('.catalog_basket__summ_text');
	var item = document.querySelector('.catalog__item');

	for (var i = 0; i < itemButton.length; i++) {
	  itemButton[i].addEventListener('click', addToCart);
	}

	var addToCart = function (e) {
	  e.preventDefault();

	  var el = e.target;

	  if (el.closest('.catalog__item').classList.contains('catalog_cart--disabled'))
	    return;

	  var idFrom = el.closest('.catalog__item').getAttribute('data-date-from');
	  var idTo = el.closest('.catalog__item').getAttribute('data-date-to');

	  var item = this.closest('.catalog_cart');
	  var title = item.querySelector('.catalog_cart__title').textContent;
	  var price = Number(item.dataset.price);

	  var itemObj = {
	    id: idFrom + idTo,
	    title: title,
	    price: price
	  };

	  arrayCart.push(itemObj);
	  calculatePrice();
	  renderCart();
	}

	// Удаление из корзины
	function removeFromCart(e) {

	  e.preventDefault();
	  var line = this.closest('.catalog_basket__line');
	  var title = line.querySelector('.catalog_basket__product').textContent;
	  var price = line.querySelector('.catalog_basket__price').textContent;

	  for ( var i = 0; i < arrayCart.length; i++){
	    if (arrayCart[i].title == title && arrayCart[i].price == price){
	      arrayCart.splice(i, 1);
	      break;
	    }
	  }

	  calculatePrice();
	  renderCart();
	}

	// Перерисовка корзины
	function renderCart() {
	  var newItem;

	  // Очистка корзины
	  list.innerHTML = "";

	  if (arrayCart.length === 0) {
	    newItem = document.createElement('p');
	    newItem.className = 'catalog_basket__default';
	    newItem.innerHTML = 'No items';

	    list.appendChild(newItem);

	    return;
	  }

	  arrayCart.forEach(function(item, i){
	    newItem = document.createElement('div');

	    newItem.className = 'catalog_basket__line';

	    newItem.innerHTML = '<div class="catalog_basket__product">' +
	                            item.title +
	                        '</div>' +

	                        '<div class="catalog_basket__price price">' +
	                        item.price +
	                        '</div>' +

	                        '<div class="catalog_basket__close">' +
	                          '<img src="img/svg/i-close.png" alt="close">' +
	                        '</div>';

	    newItem.setAttribute('data-id', item.id);

	    newItem
	      .querySelector('.catalog_basket__close img')
	      .addEventListener('click', removeFromCart);

	    list.appendChild(newItem);
	  });
	}

	// Вычисление итоговой цены в корзине
	function calculatePrice() {
	  var price = 0;

	  arrayCart.forEach(function(item, i) {
	    price += item.price;
	  });

	  finalPrice.textContent = price.toFixed(2);
	}





	// ===
	// Экспорт в глобальную область видимости
	// ===

	window.addToCart = addToCart;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	
	// Получение данных из json-файла с товарами

	function getJSON (url, cb) {
	  var oReq = new XMLHttpRequest();

	  oReq.open('GET', url, true);

	  oReq.addEventListener('load', function() {
	    var responseJson = JSON.parse(this.responseText);
	    cb(responseJson)
	  });

	  oReq.send();
	};

	var cartsDataArray = [];

	// Получение товаров
	getJSON('generated.json', function(arr){
	  cartsDataArray = arr;
	  createItems(cartsDataArray);
	})

	var catalogList = document.querySelector('.catalog__list');

	// Создаём список из карточек товара
	function createItems(arr){
	  catalogList.innerHTML = '';

	  arr.forEach(function(item){
	    createOneItem(item)
	  })
	}

	// Создаём одну карточку товара
	function createOneItem(item) {
	  var newItem = document.createElement('a');

	  newItem.classList.add('catalog_cart', 'catalog__item');

	  if (item.special){
	    newItem.classList.add('catalog_cart--special');
	  }

	  newItem.setAttribute('href', '/');
	  newItem.setAttribute('data-type', item.type);
	  newItem.setAttribute('data-special', item.special);
	  newItem.setAttribute('data-price', item.priceNew);
	  newItem.setAttribute('data-metro', item.metro);

	  // Настройка даты для data-date-to
	  var itemDateTo = item.dateTo;
	  var dateTo = new Date(itemDateTo);

	  // День
	  var dateToDay = dateTo.getDate();

	  if (dateToDay < 10) {
	    dateToDay = '0' + dateToDay;
	  }

	  // Месяц
	  var dateToMonth = dateTo.getMonth() + 1;

	  if (dateToMonth < 10) {
	    dateToMonth = '0' + dateToMonth;
	  }
	  // Год
	  var dateToYear = dateTo.getFullYear();

	  dateToYear = dateToYear % 100;

	  newItem.setAttribute('data-date-to', item.dateTo);

	  // Настройка даты для data-date-from

	  newItem.setAttribute('data-date-from', item.dateFrom);

	    newItem.innerHTML =
	      '<div class="catalog_cart__image"><img src="'+item.image+'">' +
	        '<div class="catalog_cart__timer timer">' +
	          '<div class="timer__item"> <span>1</span><span>day</span></div>' +
	          '<div class="timer__item"><span>3</span><span>hour</span></div>' +
	          '<div class="timer__item"><span>40</span><span>min</span></div>' +
	          '<div class="timer__item"><span>13</span><span>sec</span></div>' +
	       '</div>' +
	      '</div>' +

	      '<div class="catalog_cart__content">' +
	        '<div class="catalog_cart__discount"> '+item.discount+'%' +
	      '</div>' +
	        '<p class="catalog_cart__title">'+item.title+'</p>' +
	        '<div class="catalog_cart__footer">' +
	          '<p class="catalog_cart__price">' +
	            '<span class="price catalog_cart__price_old">'+item.priceOld+'</span>' +
	            '<span class="price catalog_cart__price_new">'+item.priceNew+'</span>' +
	          '</p>' +

	          '<div class="catalog_cart__btn">' +
	            '<p class="btn">to cart</p>' +
	          '</div>' +
	        '</div>' +
	      '</div>';

	  renderDate(dateTo, newItem);

	  newItem.querySelector('.btn').addEventListener('click', addToCart);
	  catalogList.appendChild(newItem);
	}

	var btnSortPrice = document.querySelector('.catalog_sort__item:first-child');
	var btnSortDiscount = document.querySelector('.catalog_sort__item:last-child');

	var curSortMode = null;

	btnSortPrice.addEventListener(
	  'click',
	  function (e) {
	    (curSortMode === 'down')
	      ? sortPriceUp.call(this, e)
	      : sortPriceDown.call(this, e)
	  }
	);

	btnSortDiscount.addEventListener('click', sortDiscount);

	function sortPriceUp(e) {
	  e.preventDefault();

	  cartsDataArray.sort(function(a,b){
	    if (a.priceNew > b.priceNew) {
	      return 1;
	    } else {
	      return -1;
	    }
	  });

	  curSortMode = 'up';

	  createItems(cartsDataArray);
	}

	function sortPriceDown(e) {
	  e.preventDefault();

	  cartsDataArray.sort(function(a,b){
	    if (a.priceNew < b.priceNew) {
	      return 1;
	    } else {
	      return -1;
	    }
	  });

	  curSortMode = 'down';

	  createItems(cartsDataArray);
	}

	function sortDiscount(e){
	  e.preventDefault();

	  cartsDataArray.sort(function(a,b){
	    if(b.discount > a.discount) {
	      return 1
	    } else {
	      return -1
	    }
	  })

	  createItems(cartsDataArray);
	}


	// Таймер
	var now = new Date();
	var SECONDS_IN_MINUTE = 60;
	var SECONDS_IN_HOURS = 60 * 60;
	var SECONDS_IN_DAY = 60 * 60 * 24;

	function renderDate(objectDate, div) {
	  var secOverall = Math.floor((objectDate - now)/1000);

	  var dayAmount = Math.floor(secOverall / SECONDS_IN_DAY);
	  var hoursAmount = Math.floor((secOverall % SECONDS_IN_DAY)/ SECONDS_IN_HOURS);
	  var minutesAmount = Math.floor((secOverall % SECONDS_IN_HOURS)/ SECONDS_IN_MINUTE);
	  var secondsAmount = Math.floor(secOverall % SECONDS_IN_MINUTE);

	  var daysDiv = div.querySelector('.timer__item:nth-of-type(1) span:nth-of-type(1)');
	  var hoursDiv = div.querySelector('.timer__item:nth-of-type(2) span:nth-of-type(1)');
	  var minutesDiv = div.querySelector('.timer__item:nth-of-type(3) span:nth-of-type(1)');
	  var secondsDiv = div.querySelector('.timer__item:nth-of-type(4) span:nth-of-type(1)');

	  daysDiv.innerHTML = dayAmount;
	  hoursDiv.innerHTML = hoursAmount;
	  minutesDiv.innerHTML = minutesAmount;
	  secondsDiv.innerHTML = secondsAmount;

	  function countDown(){
	    secOverall--;
	    secondsAmount--;
	    secondsDiv.innerHTML = secondsAmount;
	    if (secondsAmount < 0) {
	      secondsAmount = 59;
	      minutesAmount--;
	    }
	    if (minutesAmount < 0) {
	      minutesAmount = 59;
	      hoursAmount--;
	    }
	    if (hoursAmount < 0) {
	      hoursAmount = 23;
	      dayAmount--;
	    }
	    if (secOverall <= 0) {
	      clearInterval(count);
	      div.classList.add('catalog_cart--disabled');
	    }

	    daysDiv.innerHTML = dayAmount;
	    hoursDiv.innerHTML = hoursAmount;
	    minutesDiv.innerHTML = minutesAmount;
	    secondsDiv.innerHTML = secondsAmount;
	  }

	  var count = setInterval(countDown, 1000)
	}



/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// ==
	// Открытие и закрытие фильтров при клике на заголовок
	// ==

	var filterTitle = document.querySelectorAll('.filter__title');

	filterTitle.forEach(function(item){
	  item.addEventListener('click', function(){
	    var parent = this.closest('.catalog_filters__item');
	    if(parent.classList.contains('filter--open')){
	      parent.classList.remove('filter--open');
	    }
	    else{
	      parent.classList.add('filter--open');
	    }
	  })
	})



	// ==
	// Работа фильтров
	// ==
	var filters = {
	  type: [],
	  metro: [],
	  price: {
	    from: null,
	    to: null,
	  },
	  special: false,
	  date: null,
	}

	var catalogItems;
	var checkboxTypes = document.querySelectorAll('.js-filters-type input[type="checkbox"]');
	var specialCheckbox = document.querySelector('.js-filters-special input[type="checkbox"]');
	var pricesInputs = document.querySelectorAll('.js-filters-price input[type="text"]');
	var dateInput = document.querySelector('.js-filters-date input[type="date"]');
	var filterMetro = document.querySelectorAll('.js-filter-metro input[type="checkbox"]');


	// Event listeners for Types
	for (var i = 0; i < checkboxTypes.length; i++) {
	  checkboxTypes[i].addEventListener('change', function() {
	    var name = this.parentNode.querySelector('.checkbox__label').textContent;

	    if(this.checked) {
	      filters.type.push(name);
	    } else {
	      var indexOfValue = filters.type.indexOf(name);

	      if (indexOfValue !== -1) {
	        filters.type.splice(indexOfValue, 1);
	      };
	    }

	    filterCatalog()
	  });
	}

	// Event listeners for metro
	for(var i = 0; i < filterMetro.length; i++){
	  filterMetro[i].addEventListener('change', function(){
	    var name = this.parentNode.querySelector('.checkbox__label').textContent;

	    if(this.checked)  {
	        filters.metro.push(name);
	    } else {
	      var indexOfValue = filters.metro.indexOf(name);

	      if(indexOfValue !== -1){
	        filters.metro.splice(indexOfValue, 1);
	      };
	    }
	    filterCatalog();
	  })
	}



	// Event listener for Date
	dateInput.addEventListener('blur', function(e) {
	  filters.date = e.target.value;
	  filterCatalog();
	});

	// Event listener for Special
	specialCheckbox.addEventListener('change', function(){
	  filters.special = this.checked;
	  filterCatalog();
	});

	// Event listener for Price
	pricesInputs.forEach(function(input) {
	  input.addEventListener('change', function() {
	    var type = this.dataset.type;
	    var value = Number(this.value);

	    if (!isNaN(value)) {
	      filters.price[type] = value
	      filterCatalog();
	    }

	    // if(!isNaN(value)) {
	    //   if(this.value === '') filters.price[type] = null;
	    //   else filters.price[type] = value;
	    //
	    // }
	  });
	});

	// Второй шаг

	function filterCatalog() {
	  catalogItems = document.querySelectorAll('.catalog__item');

	  catalogItems.forEach(function (item, i) {
	    shouldBeVisible = 1;

	    // Type
	    if (filters.type.length) {
	      if (filterByType(item.dataset.type)) {
	        shouldBeVisible *= 0;
	      }
	    }

	    // Metro
	    if(filters.metro.length){
	      var currentStation = item.dataset.metro;
	      if(filterByMetro(currentStation)){
	        shouldBeVisible *= 0;
	      }
	    }

	    // Date
	    if (filters.date) {
	      var enteredTime = (new Date(filters.date)).getTime();
	      var dateFrom = (new Date(item.dataset.dateFrom)).getTime();
	      var dateTo = (new Date(item.dataset.dateTo)).getTime();

	      shouldBeVisible *= Number(enteredTime > dateFrom && enteredTime < dateTo)
	    }

	    // Price
	    if(filters.price.from || filters.price.to) {
	      var currentValue = item.dataset.price;
	      var from = filters.price.from;
	      var to = filters.price.to;

	      if (from && currentValue < from){
	        shouldBeVisible *=0;
	      }
	      if (to && currentValue > to){
	        shouldBeVisible *=0;
	      }
	    }

	    // Special
	    if (filters.special && (item.dataset.special == 'false')){
	        shouldBeVisible *=0;
	      }

	    // Final check
	    if (!shouldBeVisible) {
	      item.style.display = 'none';
	    } else {
	      item.style.display = 'inline-block';
	    }
	  });
	}

	// for Types
	function filterByType(currentType){
	  return filters.type.indexOf(currentType) === -1
	}

	// for Metro
	function filterByMetro(currentStation){
	  return filters.metro.indexOf(currentStation) === -1
	}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	//==
	// Вызов модального окна при клике по кнопке buy
	//==

	var cartBuy = document.querySelector('.js_button_buy');
	var modalOrder = document.querySelector('.modal_order');
	var modalUnderlay = document.querySelector('.modal_underlay');
	var modalSuccess = document.querySelector('.modal_success');

	cartBuy.addEventListener('click', function(e){
	  e.preventDefault();
	  modalOrder.style.display = "inline-block";
	  modalUnderlay.style.display = "inline-block";
	});

	//==
	// Скрытие модалки и остальной мути при клике на крестик или вне её
	//==

	var modalClose = document.querySelector('.modal__close');
	  modalClose.addEventListener('click', function(e){
	    e.preventDefault();
	    modalOrder.style.display = "none";
	    modalUnderlay.style.display = "none";
	  });

	modalUnderlay.addEventListener('click', function(e){
	    e.preventDefault();
	    modalOrder.style.display = "none";
	    modalSuccess.style.display = "none";
	    this.style.display = "none";
	});

	modalSuccess.addEventListener('click', function(e){
	    e.preventDefault();
	    this.style.display = "none";
	    modalUnderlay.style.display = "none";
	});

	// Ну да, не изящно, но работает!



/***/ }),
/* 7 */
/***/ (function(module, exports) {

	//==
	// Запрос на сервер
	//==
	var form = document.forms.form;

	document.querySelector('.btn__make-order').addEventListener('click', function(e) {
	  e.preventDefault();
	  if(validation()) {
	  var url = 'https://jsonplaceholder.typicode.com/posts/1';
	  var xhttp = new XMLHttpRequest();

	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      document.querySelector('.loader').style.display = 'block'
	      document.querySelector('.modal_order').style.display = 'none';

	      setTimeout(function(){
	       document.querySelector('.loader').style.display = 'none'
	       var result = document.querySelector('.modal_success');
	       result.style.display = 'block'
	      setTimeout(function(){
	        result.style.display = 'none';
	        form.submit();}
	      , 1500)
	    }, 1000)



	      }

	   }
	  xhttp.open('GET', url);

	  xhttp.send();

	  };


	});


	function validation(){
	  var readyToSend = true;

	  var fields = Array.from(form.querySelectorAll('input[type="text"]'));
	  //  console.log(fields);
	  var reForm = {
	    name: /^[А-Яа-яЁёA-Za-z]{2,}$/,
	    phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
	    mail: /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/
	  }
	  for(var i = 0; i < fields.length; i++){
	    var field = fields[i];
	    var value = field.value;
	    var type = field.dataset.type;
	    if(!reForm[type].test(value)){
	      readyToSend = false;
	      field.classList.add('modal__input--error');
	    }
	    else{
	      field.classList.remove('modal__input--error');
	    }
	  }

	  return readyToSend;
	}

/***/ })
/******/ ]