$(document).ready(function() {
let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
 //если с мобилы то isMobile присвоится класс touch

 if(isMobile.any()){
		let arrow=document.querySelectorAll('.arrow');//arrow теперь и есть объект с классом arrow
		let navigationteh=document.querySelector('.navigation-teh');
	for(i=0; i<arrow.length; i++){
		let thisArrow=arrow[i];
		arrow[i].addEventListener('click', function(){
			navigationteh.classList.toggle('navigation-teh-open');
 		});
 	}
 }

//для открытий и закрытия меню бургера

const burger=document.querySelector('.bicon');//constanta теперь и есть заданный класс
//console.log(burger);
const menu=document.querySelector('.burger__menu');//constanta теперь и есть заданный класс
//console.log(menu);
const body=document.querySelector('body');//constanta теперь и есть заданный класс
//console.log(body);


burger.addEventListener('click', function() {
	console.log(event.target)
	menu.classList.toggle('open');
	burger.classList.toggle('naklon');
	body.classList.toggle('lock');
})
 //для открытия-закрытия попапов

 const popupLinks=document.querySelectorAll('.popup-link');//константа кнопок на которые тыкать для открытия popupов
 //const body=document.querySelector('.body'); это у нас уже есть выше
 const lockPadding=document.querySelectorAll('.lock-padding'); //нужна будет дольше для того чтобы убрать дергание в момент открытия попапа из-за появление скрола

 let unlock = true;//чтобы не было двойных нажатий(далее)

 const timeout = 500;//та же цифра что и в css трансишн


//вешаем событие на все popap-link
//1)Проверяем их существование
 if (popupLinks.length > 0) {
 	//2)"бегаем" по каждой и производим действия со всеми (вешаем событие на все)
 	for (let index = 0; index < popupLinks.length; index++) {
 		const popupLink = popupLinks[index];
 		popupLink.addEventListener('click', function (e) {
 			//3)У каждой ссылки получаем ее href чтобы потом найти id нужного элемента
 			const popupName = popupLink.getAttribute("href").replace("#", "");//если было #popup то станет просто popup
			//4)Получаем сам объект с таким id
			const curentPopup = document.getElementById(popupName); //получает в переменную объект id которого popupname
			//5)Полученный объект отправляем в функцию открытия
			popupOpen(curentPopup);
			e.preventDefault();//запрещает перезагрузку стираицы при клике
		});
	}
 }

//закрытие попапа из любого объекта классом close-popup
//1)Любой объект с классом close-popup должен закрывать открытый попап 
 const popupCloseIcon=document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
 		el.addEventListener('click', function (e) {
 			//в шункцию закрытия отпраялется ближайший род объкт с классом popup
 			popupClose(el.closest(".popup"));
			e.preventDefault();//запрещает перезагрузку стираицы при клике
 		});
 	}
 }

 function popupOpen(curentPopup) {
 	if (curentPopup && unlock) {
 		const popupActive = document.querySelector(".popup .open");
 		//если такой каласс (активный попап уже существует то его закрываем для возможности открывать попапы из попапа)
 		if(popupActive) {
 			popupClose(popupActive, false);
 		} 
 		//если его нет значит скролл еще не заблочен и его надо заблочить вызвав функцию
 		else {
 			bodyLock();
 		}	
 		//добавляем нашему 
 		curentPopup.classList.add("open");
 		//спопсобствует закрытию попапа при нажитии в любую точку за пределами контента 
 		curentPopup.addEventListener("click", function (e) {
 			//если в родителях нет класса popap_content
 			if (!e.target.closest(".popup__content")) {
 				//закрыть ближайший родительский объект с классом popup
 				popupClose(e.target.closest(".popup"));
 			}
 		});
 	}
 }
 function popupClose(popupActive, doUnlock = true) {
 	if(unlock) {
 		popupActive.classList.remove("open");
 		if(doUnlock) {
 			bodyUnlock();
 		}
 	}
 }

 const wrapper=document.querySelector('.wrapper-nopopup');
//скрываем скролл
 function bodyLock() {
 	//высчитываем разницу между открытым окном и ширной сайта (находим ширину скрола)
 	//присваем это значение в переменную
 	const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
 	//добавлем этот же отступ справа и всем фиксированным элементам для этого им необходимо задать класс
 	//.lock-padding
 	if (lockPadding.length > 0) {
 		for (let index = 0; index < lockPadding.length; index++){
 			const el = lockPadding[index];
 			el.style.paddingRight = lockPaddingValue;
 		}
 	}
 	//присваиваем это значение в виде паддинга справа самому боди
 	wrapper.style.paddingRight=lockPaddingValue;
 	body.classList.add("lock1");

 	menu.classList.remove('open');
	burger.classList.remove('naklon');
	body.classList.remove('lock');

 	//для блокировки мгновенного открытия при нажатии после закрытия
 	unlock = false;
 	setTimeout(function () {
 		unlock = true;
 	}, timeout);
 }
//работа с тем же скролом ну уже при закрытии чтобы не дергался сам попап
 function bodyUnlock() {
 	setTimeout(function () {
 		for (let index = 0; index < lockPadding.length; index++){
 			const el = lockPadding[index];
 			el.style.paddingRight = "0px";
 		}
 		wrapper.style.paddingRight = "0px";
 		body.classList.remove("lock1");

 		//удаляют красную тень с неправильновведеных данных при закрытии попапа
 		let deleteRedShadow=document.querySelectorAll('._error');
 		for (index=0; index < deleteRedShadow.length; index++){
 			const per = deleteRedShadow[index];
 			per.classList.remove("_error");}

	}, timeout);

	unlock = false;
	setTimeout(function(){
		unlock = true;
	}, timeout);
 };

 document.addEventListener("keydown", function(e){
 	if (e.which === 27) {
 		const popupActive = document.querySelector(".popup.open");
 		popupClose(popupActive);
 	}
 });

//отправка данных введенных пользователем на почту владельцу 

const form = document.getElementById("form1");
//при отправке формы будет запускаться функция formSend
form.addEventListener("submit", formSend);


	async function formSend(e) {
		//запрещаем стандартную отправку формы
		e.preventDefault();

		let error = formValidate(form);
		//отправляем заполненные пользователем данные на проверку адекватности

		let formData = new FormData(form);


		//если в функциях ниже возникает ошибка появляется сообщение
		if (error===0){
			form.classList.add("_sending");
				var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php", //Change
				data: th.serialize()
				})
			.done(function() {
				form.classList.remove("_sending");
				const popupActive = document.querySelector(".popup.open");
 				popupClose(popupActive);
 				const otpravleno = document.querySelector(".otpravleno");
 				otpravleno.classList.add("shouMessage");
 				setTimeout(function() {
				otpravleno.classList.remove("shouMessage");
				}, 3500);
				setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				}, 100);
				});
				return false;}
			else{
				//alert("Заполните поля")
			}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll("._req");
		//вызываем все объекты которые дожны быть заполнены обязательно

		//перебераем все обязательные элементы
		for (index=0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			//если элемент это номер телефона
			if (input.classList.contains("_tel")){
				//если в номере ошибка добавляется класс ошибки
				if(telTest(input)) {} else{
					formAddError(input);
					error++;
				}
			}
			//если это не номер телефона то 
			else 
				//(если это чекбокс без отметки)
				if(input.getAttribute("type") === "checkbox" && input.checked === false){
					//то это ошибка
					formAddError(input);
					error++;}
					//если это чекбокс с отметкой или не чекбокс вовсе то проверяем наличие значения
					else{
						if (input.value === "") {
							formAddError(input);
							error++;
						}
					}

			}
		return error;
	}

	//функции добавления/удаленя класса ошибки объекту и родителю
	function formAddError(input) {
		const popupContent=document.querySelector('.popup__content');
		//input.parentElement.classList.add("_error");
		input.classList.add("_error");
		popupContent.classList.add("_error");
	}
	function formRemoveError(input) {
		const popupContent=document.querySelector('.popup__content');
		//input.parentElement.classList.remove("_error");
		input.classList.remove("_error");
		popupContent.classList.remove("_error");
	}

	//функция корректности введнного номера телефона
	function telTest(input) {
		return /^\d[\d\(\)\ -]{4,14}\d$/.test(input.value)
	}

	//E-mail Ajax Send
	// 	$("form").submit(function() { //Change
	// 	var th = $(this);
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mail.php", //Change
	// 		data: th.serialize()
	// 	}).done(function() {
	// 		alert("Thank you!");
	// 		setTimeout(function() {
	// 			// Done Functions
	// 			th.trigger("reset");
	// 		}, 1000);
	// 	});
	// 	return false;
	// });
});