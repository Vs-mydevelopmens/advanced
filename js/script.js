
$(document).ready(function () {
	$('.header-burger').click(function (event) {
		$('.header-burger,.header-burger__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
// BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}
		if (slider.classList.contains('_gallery')) {
			// slider.data('LightGallery').destroy(true);
		}
	}
	slider_bild_callback();

}

function slider_bild_callback(params) { }



let switchingSlider = new Swiper('.development-slider-switching__wrapper', {

	// effect: 'fade',
	// autoplay: {
	// 	delay: 3000,
	// 	disableOnInteraction: false,
	// },

	observer: true,
	observeParents: true,
	slidesPerView: 'auto',
	spaceBetween: 15,
	// autoHeight: true,
	// speed: 800,
	// touchRatio: 0,
	// simulateTouch: false,
	// loop: true,
	// lazy: true,
	preloadImages: false,
	freeMode: true,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	// dotts
	// pagination: {
	// 	el: '.slider-quality__pagging',
	// 	clickable: true,
	// },
	// Arrows
	// navigation: {
	// 	nextEl: '.header-slider-button__next',
	// 	prevEl: '.header-slider-button__prev',
	// },

	// on: {
	// 	lazyImageReady: function () {
	// 		ibg();
	// 	},
	// },
	// And if we need scroLLbar
	// Scrollbar: {
	// 	el: '.swiper-scrollbar',
	// },
	// breakpoints: {
	// 	768: {
	// 		slidesPerView: 5,
	// 		spaceBetween: 50,
	// 	},
	// 	1268: {
	// 		slidesPerView: 5,
	// 		spaceBetween: 50,
	// 	},
	// },
});
// ==========================================
let developmentSlider = new Swiper('.development-slider__wrapper', {

	// effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},

	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 135,
	// autoHeight: true,
	speed: 800,
	// touchRatio: 0,
	// simulateTouch: false,
	loop: true,
	// lazy: true,
	preloadImages: false,
	// dotts
	// pagination: {
	// 	el: '.slider-quality__pagging',
	// 	clickable: true,
	// },
	// Arrows
	// navigation: {
	// 	nextEl: '.header-slider-button__next',
	// 	prevEl: '.header-slider-button__prev',
	// },

	// on: {
	// 	lazyImageReady: function () {
	// 		ibg();
	// 	},
	// },
	// And if we need scroLLbar
	// Scrollbar: {
	// 	el: '.swiper-scrollbar',
	// },
	thumbs: {
		swiper: switchingSlider
	}
});


// ==========================================
// <2 СКРИПТА НА ИЗОБРАЖЕНИЯ, ЕСЛИ НЕ ОТОБРАЖАЕТСЯ, АКТИВНЫЙ СКРИПТ ЗАКОМЕНТИРОВАТЬ, А ЗАКОМЕНТИРОВАННЫЙ РАССКОМЕНТИРОВАТЬ>
// ==========================================
function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
ibg();
// ==========================================
// function ibg() {
//     $.each($('.ibg'), function (index, val) {
//         if ($(this).find('img').length > 0) {
//             $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
//         }
//     });
// }
// ibg();
// ==========================================
// <2 СКРИПТА НА ИЗОБРАЖЕНИЯ>
// ==========================================

// ==========================================
// <ВЫДЕЛЕНИЕ АКТИВНОГО МЕНЮ>
// ==========================================
$('.header-burger__link').click(function () {
    $('.menu-active').removeClass('menu-active');
    $(this).addClass('menu-active');
});
// ==========================================
$('.footer-bottom__language-item').click(function () {
    $('.lang-active').removeClass('lang-active');
    $(this).addClass('lang-active');
});
// ==========================================
// </ВЫДЕЛЕНИЕ АКТИВНОГО МЕНЮ>
// ==========================================