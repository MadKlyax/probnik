// let isMobile = {
// 	Android: function() {return navigator.userAgent.match(/Android/i);},
// 	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
// 	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
// 	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
// 	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
// 	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
// };
// //если с мобилы то боди присвоится класс touch

// 		let body=document.querySelector('body');
// if(isMobile.any()){
// 		body.classList.add('touch');
// 		let arrow=document.querySelectorAll('.arrow');//arrow теперь и есть объект с классом arrow
// 	for(i=0; i<arrow.length; i++){
// 			let thisLink=arrow[i].previousElementSibling;//thisLink - ссылка предшевствующая классу arrow
// 			let subMenu=arrow[i].nextElementSibling;//subMenu - объек следующий за классом arrow
// 			let thisArrow=arrow[i];

// 			thisLink.classList.add('parent'); //присваивает класс парент объекту перед стрелкой (ссылке)
// 		arrow[i].addEventListener('click', function(){
// 			subMenu.classList.toggle('open');
// 			thisArrow.classList.toggle('active');
// 		});
// 	}
// }else{
// 	body.classList.add('mouse');
// }

//для открытий и закрытия меню бургера

const burger=document.querySelector('.bicon');//constanta теперь и есть заданный класс
console.log(burger);
const menu=document.querySelector('.burger__menu');//constanta теперь и есть заданный класс
console.log(menu);
const body=document.querySelector('.body');//constanta теперь и есть заданный класс
console.log(menu);


burger.addEventListener('click', function() {
	console.log(event.target)
	menu.classList.toggle('open');
	burger.classList.toggle('naklon');
	body.classList.toggle('lock');
})

//для подняти страницы вверх при клике на название сайта

const up=document.querySelector('.menu__title');//constanta теперь и есть заданный класс
console.log(burger);
const telo=document.querySelector('.telo');//constanta теперь и есть заданный класс
console.log(burger);

up.addEventListener('click', function() {

	telo.classList.add('lock');
	setTimeout(unlock, 100,);
});
function unlock(){
	telo.classList.remove('lock');
};



//для открытия-закрытия попапов

const popupLink=document.querySelector('.popup-link');//константа кнопок на которые тыкать для открытия popupов
//const body=document.querySelector('.body'); это у нас уже есть выше
const lockPadding=document.querySelector('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLink.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute("href").replace("#", "");//если было #popup то станет просто popup
			const curentPopup = document.getElementDyId(popupName); //получает в переменную объект id которого popupname
			popupOpen(curentPopup);
			e.preventDefault();//запрещает перезагрузку стираицы при клике
		});
	}
}
//закрытие попапа из любого объекта классом close-popup
const popupCloseIcon=document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest(".popup"));
			e.preventDefault();//запрещает перезагрузку стираицы при клике
		});
	}
}