'use strict';
window.addEventListener('DOMContentLoaded', () => {
   //Табы
    const tabContent = document.querySelectorAll('.tabcontent'),
    tab = document.querySelectorAll('.tabheader__item'),
    parentTabs = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
           item.classList.add('hide');
           item.classList.remove('show');
        });
        tab.forEach( item => {
           item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i=0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');
        tab[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    parentTabs.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
           tab.forEach((item, i) => {
                if (e.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
           });
        }
    });


    //Класс меню
    class Menu {
       constructor (parent, img_src, img_alt, title, descr, price, ...classes) {
           this.parent = parent;
           this.img_src = img_src;
           this.img_alt = img_alt;
           this.title = title;
           this.descr = descr;
           this.price = price;
           this.classes = classes;
       }

       render () {
           const div = document.createElement("div");
           if (this.classes.length === 0) {
             this.div = 'menu__item';
             div.classList.add(this.div);
           } else {
            this.classes.forEach(className => div.classList.add(className));
           }
           div.innerHTML = `
                    <img src=${this.img_src} alt=${this.img_alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
           `;
           this.parent.append(div);
       }
    }

    const parentMenu = document.querySelector(".menu .container");
   const firstMenu = new Menu(parentMenu, "img/tabs/vegy.jpg","vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229),
   secondMenu = new Menu(parentMenu, "img/tabs/elite.jpg", "elite", 'Меню "Премиум"', 'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550),
   thirdMenu = new Menu(parentMenu, "img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков', 430)
   
   firstMenu.render();
   secondMenu.render();
   thirdMenu.render(); 

  //Таймер обратного отсчета
  const deadline = '2022-05-11';
   function remainingTime(endTime) {
          const today = new Date(),
          tms = Date.parse(endTime) - Date.parse(today);
 
    const seconds = Math.floor((tms / 1000) % 60),
    minutes = Math.floor((tms / (1000*60)) % 60),
    hours = Math.floor((tms / (1000*60*60)) % 24),
    days = Math.floor(tms / (1000*60*60*24));

      return{
        'tms': tms,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours,
        'days': days
      };
   }
   
    function setTimer(endtime){
      const timer = document.querySelector(".timer"),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInnterval = setInterval(updateTime, 1000);
      function addZero(time){
        if (time >= 0 && time < 10){
           return `0${time}`;
        } else {
         return time;
        }
      }
      
      function updateTime(){
         const t = remainingTime(endtime);
         days.innerHTML = addZero(t.days);
         hours.innerHTML = addZero(t.hours);
         minutes.innerHTML = addZero(t.minutes);
         seconds.innerHTML = addZero(t.seconds);
         if(t.tms <= 0) {
           clearInterval(timeInnterval);
         }
       } 
       updateTime();
    }
   setTimer(deadline);

   //Модальное окно

   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal'),
         btnCloseModal = document.querySelector('[data-close]');

  function openModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); 
  }
  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }

  modalTrigger.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  btnCloseModal.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 100000);

  function openByScroll() {
    if (document.documentElement.scrollTop+document.documentElement.clientHeight>=document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', openByScroll);
    }
  }
  window.addEventListener('scroll', openByScroll);

});
