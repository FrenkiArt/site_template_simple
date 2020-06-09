lazyLoading();
myPopup(document.querySelectorAll('[data-popup]'));
my_tel_masker(document.querySelectorAll('input[type=tel]'));
sendMail(document.querySelectorAll('form'));
smoothScroll();
bgClick('[data-bg-click]');

/* document.documentElement.classList.remove("no-js"); */
let eventClick = new MouseEvent('click');

window.addEventListener('resize', function () {
  console.clear();
  console.info(window.innerWidth, 'px');
});

if (window.matchMedia("(min-width: 1000px)").matches) {
  console.info('decktop');
} else {
  console.info('mobile');
}

////////////////////////////////////////////////////////////////////
////// Код моих скриптов готовых
function sendMail(allForm) {
  allForm.forEach(function (form) {
    form.addEventListener('submit', sendForm);
    //form.addEventListener('submit', sendForm2);
  });

  function sendForm(e) {
    e.preventDefault();
    const formElement = e.target;
    let request = new XMLHttpRequest();
    let formData = new FormData(formElement);

    request.addEventListener('readystatechange', () => {
      console.log(request.readyState);
      if (request.readyState !== 4) {
        console.log('Почта отправляется');
        return;
      }

      if (request.status !== 200) {
        console.log('error ' + request.readyState);
        console.log(request.responseText);
        console.log('Не удалось отправить почту: ' + request.status + ' ' + request.statusText);
      } else {
        console.log(request.responseText);
        console.log('Письмо успешно отправлено');
        formElement.reset();
        if (document.querySelector('.popup.popup_open') != null) {
          document.querySelector('.popup.popup_open').classList.remove('popup_open');
          document.querySelector('.overlay').classList.remove('popup_open');
          document.body.classList.remove('popup_open');
        }

        document.querySelector('.popup_thanks').classList.add('popup_open');
        document.querySelector('.overlay').classList.add('popup_open');
        document.body.classList.add('popup_open');
      }
    });

    request.open("POST", "./mail.php");
    request.send(formData);
  }

  function sendForm2(e) {
    e.preventDefault();
    const request = new XMLHttpRequest();
    let method = 'POST';
    let url = './mail.php';

    request.addEventListener('readystatechange', () => {
      console.log(request.readyState);
      if (request.readyState !== 4) {
        console.log('Почта отправляется');
        return;
      }

      if (request.status !== 200) {
        console.log('error ' + request.readyState);
        console.log(request.responseText);
        console.log('Не удалось отправить почту: ' + request.status + ' ' + request.statusText);
      } else {
        /* const output = JSON.parse(request.responseText);
        output.results.forEach(function (film, i, array) {
        }); */
        //console.log(request);
        console.log(request.responseText);
        console.log('Письмо успешно отправлено');
        e.target.reset();
      }
    });
    request.open(method, url);
    request.send();
  }

}

function lazyLoading() {
  /* отложенная загрузка изображений */
  setTimeout(function () {
    [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function () {
        img.removeAttribute('data-src');
      };
    });
  }, 300);
}

function my_tel_masker(all_phone_selector_array) {
  let temp = '+7(___)__-__-___';

  all_phone_selector_array.forEach(function (item) {
    item.maxLength = temp.length;
    item.addEventListener('keydown', keydownCheck);
    item.addEventListener('input', inputCheck);
  });

  function keydownCheck(e) {
    e.target.dataset.keycode = e.keyCode;
    if ((e.keyCode > 48 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106) || (e.keyCode === 48) || (e.keyCode === 107) || (e.keyCode === 109) || (e.keyCode === 17)) {
      //...
    } else if ((e.keyCode === 8) || (e.keyCode === 46) || (e.keyCode === 37) || (e.keyCode === 39) || (e.keyCode === 32)) {
      //...
    } else if ((e.keyCode === 86) && e.ctrlKey) {
      //...Позволяем вставку
    } else {
      e.preventDefault();
    }
    //console.log(e.keyCode);
  }

  function inputCheck(e) {
    let textArray = e.target.value.split('');

    if (textArray[0] == '+') {
      //...
    } else if (textArray[0] == '7' || textArray[0] == '8') {
      textArray.shift();
      textArray.unshift('(');
      textArray.unshift('7');
      textArray.unshift('+');
    } else if (e.target.value == '') {
      //...На случай, если происходит удаление контента
    } else {
      textArray.unshift('(');
      textArray.unshift('7');
      textArray.unshift('+');
    }
    e.target.value = textArray.join('');

    if (textArray.length == 2 && (e.target.dataset.keycode != 8 && e.target.dataset.keycode !=  46)) {
      //...Вторая цифра всегда 7!
      textArray[1] = '7';
      textArray.push('(')
      e.target.value = textArray.join('');
    }

    if (textArray[3] == '8' || textArray[3] == '7') {
      //...если человек опечатался. Второй цифрой не может быть 7 или 8.
      textArray.splice(3,1);
      e.target.value = textArray.join('');
    }

    if (textArray.length == 6 && (e.target.dataset.keycode != 8 && e.target.dataset.keycode !=  46)) {
      textArray.push(')');
      e.target.value = textArray.join('');
    }

    if (textArray.length == 9 && (e.target.dataset.keycode != 8 && e.target.dataset.keycode !=  46)) {
      textArray.push('-');
      e.target.value = textArray.join('');
    }
    if (textArray.length == 12 && (e.target.dataset.keycode != 8 && e.target.dataset.keycode !=  46)) {
      textArray.push('-');
      e.target.value = textArray.join('');
    }
  }
}

function myPopup(trigers) {
  /**
   * @param myPopup(trigers) Запускаем наши попапы
   * @param trigers - это тригеры которые будут вызывать появление попапа.
   * Внутри trigers должны быть:
   * @param [data-popup] data атрибут внутри которого прописан селектор, по которому будет найден и запущен попап.
   */
  const allPopup = document.querySelectorAll('.popup');

  let popup_trigers = trigers;

  document.addEventListener('click', listenDomClick);

  popup_trigers.forEach(element => {
    element.addEventListener('click', popupTrigerHandler);
  });

  allPopup.forEach(element => {
    element.style.display = 'block';
    if (element.querySelector('.popup__btn__close') != null) {
      element.querySelector('.popup__btn__close').addEventListener('click', closeThisPopup);
    }
    if (element.querySelector('.popup__footer__btn__ok') != null) {
      element.querySelector('.popup__footer__btn__ok').addEventListener('click', closeThisPopup);
    }
  });

  document.querySelector('.overlay').addEventListener('click', clickOnOverlay);

  function popupTrigerHandler(e) {
    e.preventDefault();
    let searchPopup = this.dataset.popup;
    let targetPopup = document.querySelector(searchPopup);
    targetPopup.classList.add('popup_open');
    showOverlay();
    if (targetPopup.clientHeight > window.innerHeight) {
      targetPopup.classList.add('popup-long');
    }
  }

  function closeThisPopup(e) {
    e.target.closest('.popup').classList.remove('popup_open');
    hideOverlay();
  }

  function closeAllPopup() {
    allPopup.forEach(element => {
      element.classList.remove('popup_open');
    });
    hideOverlay();
  }

  function listenDomClick(e) {
    console.log('click e.target is ', e.target);
  }

  function showOverlay() {
    document.querySelector('.overlay').classList.add('popup_open');
    freezeBody();
  }

  function hideOverlay() {
    document.querySelector('.overlay').classList.remove('popup_open');
    unFreezeBody();
  }

  function clickOnOverlay(e) {
    closeAllPopup();
  }

  function freezeBody() {
    document.body.classList.add('popup_open');
  }

  function unFreezeBody() {
    document.body.classList.remove('popup_open');
  }
}

function smoothScroll() {
  let body_height = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  let ancor_href_target;
  let ancor;
  let way;
  let start_location;
  let step;
  let steps;

  if (document.querySelectorAll('a[href*="#"]') != null) {
    document.querySelectorAll('a[href*="#"]').forEach(function (a_href) {
      a_href.addEventListener('click', from_ancor_to_target);
    });
  }
  if (document.querySelectorAll('button[href*="#"]') != null) {
    document.querySelectorAll('button[href*="#"]').forEach(function (a_href) {
      a_href.addEventListener('click', from_ancor_to_target);
    });
  }

  function from_ancor_to_target(e) {
    e.preventDefault();
    ancor = e.target.closest('a[href*="#"]');
    ancor_href_target = ancor.getAttribute('href');
    ancor_href_target = document.querySelector(ancor_href_target);
    start_location = window.pageYOffset;
    way = ancor_href_target.offsetTop - start_location;
    step = 150;
    steps = way / step;
    let timer = setInterval(() => {
      window.scrollTo(0, (start_location + steps));
      start_location = start_location + steps;
      step -= 1;
      if (step <= 0) {
        clearInterval(timer);
      }
    }, 1);
  }

  let scrollTop;
  let footer;
  if (document.querySelector('.scroll_top') != null) {
    document.body.setAttribute('id', 'body');
    document.addEventListener('scroll', behaviorScrollTop);
    scrollTop = document.querySelector('.scroll_top');
    scrollTop.setAttribute('href', 'body');
    scrollTop.addEventListener('click', from_ancor_to_target);
  }

  function behaviorScrollTop(e) {
    if (document.querySelector('.footer') != null) {
      footer = document.querySelector('.footer');
      if (footer.getBoundingClientRect().y + footer.getBoundingClientRect().height / 2 < window.innerHeight) {
        scrollTop.classList.add('fixed_on_footer');
        scrollTop.style.bottom = footer.offsetHeight - scrollTop.offsetHeight / 2 + 'px';
      } else {
        scrollTop.classList.remove('fixed_on_footer');
        scrollTop.style.bottom = '10px';
      }
    }
    if (window.pageYOffset > window.innerHeight * 0.5) {
      scrollTop.classList.add('visible');
    } else {
      scrollTop.classList.remove('visible');
    }
  }
}

function bgClick(selector) {
  /* Эффект капли на заднем фоне */
  if (document.querySelector(selector)) { // Проверка на существование таких объектов
    document.querySelectorAll(selector).forEach((item) => {
      item.style.position = 'relative';
      item.style.overflow = 'hidden';
      item.addEventListener('click', (e) => {
        e.preventDefault();
        let newCircle = document.createElement('div');
        newCircle.classList.add('bg_ripple');
        item.appendChild(newCircle);
        // Узнаём позицию мышки внутри элемента и заносим в атрибуты
        newCircle.style.left = (e.clientX - e.target.closest(selector).getBoundingClientRect().left) + 'px';
        newCircle.style.top = (e.clientY - e.target.closest(selector).getBoundingClientRect().top) + 'px';
        newCircle.style.animation = 'bg_ripple 0.7s ease-out 0s 1 forwards';
        newCircle.addEventListener('animationend', () => {
          newCircle.remove();
        })
      })
    })
  }
}

/* делаем печатающий текст */
document.querySelector('.btn_trig').addEventListener('click', (e) => {
  let blockText = document.querySelector('.print_text');
  //let contentBlockText = blockText.textContent.trim();
  let contentBlockText1 = blockText.dataset.text1;
  let contentBlockText2 = blockText.dataset.text2;
  let contentBlockText3 = blockText.dataset.text3;
  blockText.textContent = '';
  let span_1 = document.createElement('span');
  let span_2 = document.createElement('span');
  span_2.classList.add('animeRipple');
  let timeInterval = 50;
  let timeTimeout = 3000;

  let timeStartText2 = (timeInterval * contentBlockText1.length) * 2 + timeTimeout + 2000;
  let timeStartText3 = timeStartText2 * 2;

  span_2.textContent = '|';

  blockText.appendChild(span_1);
  blockText.appendChild(span_2);

  showText(contentBlockText1);
  setTimeout(() => {
    showText(contentBlockText2);
  }, timeStartText2);
  setTimeout(() => {
    showText(contentBlockText3);
  }, timeStartText3);
  setTimeout(() => {
    span_2.remove();
  }, timeStartText2 * 3);

  function showText(text) {
    let counter = 1;
    let timer = setInterval(() => {
      span_1.textContent = text.slice(0, counter);
      if (counter > text.length) {
        clearInterval(timer);
        //span_2.remove();
        //counter = 1;
        console.log('Первый текст готов');
        setTimeout(() => {
          removeText(text, counter);
        }, timeTimeout);
      }
      counter++;
    }, timeInterval);
  }

  function removeText(text, counter) {
    let timer = setInterval(() => {
      span_1.textContent = text.slice(0, counter);
      if (counter < 1) {
        clearInterval(timer);
        //span_2.remove();
        counter = 1;
      }
      counter--;
    }, timeInterval);
  }

})

/* Попытка разделить блок по строкам */

let myvar = document.querySelector('.block_rows').innerHTML.trim();
myvar = myvar.split('<br>');
document.querySelector('.block_rows').innerHTML = '';

let counter = 0;
let timer = setInterval(() => {
  if (counter > myvar.length) {
    clearInterval(timer);
  }
  let div = document.createElement('div');
  div.classList.add('show_row');
  let br = document.createElement('br');
  div.textContent = myvar[counter];
  document.querySelector('.block_rows').appendChild(div);
  counter++;
}, 300);

console.info(`js загружен полностью!`);
