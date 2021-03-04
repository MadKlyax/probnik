

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
