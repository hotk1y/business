function email_test(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
   ua = navigator.userAgent;
   var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
   return is_ie;
}
if (isIE()) {
   document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
   document.querySelector('html').classList.add('_touch');
}

// Получить цифры из строки
//parseInt(itemContactpagePhone.replace(/[^\d]/g, ''))

function ibg() {
   if (isIE()) {
      let ibg = document.querySelectorAll("._ibg");
      for (var i = 0; i < ibg.length; i++) {
         if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
         }
      }
   }
}
ibg();

window.addEventListener("load", function () {
   if (document.querySelector('.wrapper')) {
      setTimeout(function () {
         document.querySelector('.wrapper').classList.add('_loaded');
      }, 0);
   }
});

let unlock = true;

//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
iconMenu.addEventListener("click", function (e) {
   document.querySelector('.menu__body').classList.toggle('_active');
   iconMenu.classList.toggle('_active');
   if (document.querySelector('.menu__body._active')) {
      disableScroll();
   } else {
      enableScroll();
   }
});

//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
   let tab = tabs[index];
   let tabs_items = tab.querySelectorAll("._tabs-item");
   let tabs_blocks = tab.querySelectorAll("._tabs-block");
   for (let index = 0; index < tabs_items.length; index++) {
      let tabs_item = tabs_items[index];
      tabs_item.addEventListener("click", function (e) {
         for (let index = 0; index < tabs_items.length; index++) {
            let tabs_item = tabs_items[index];
            tabs_item.classList.remove('_active');
            tabs_blocks[index].classList.remove('_active');
         }
         tabs_item.classList.add('_active');
         tabs_blocks[index].classList.add('_active');
         e.preventDefault();
      });
   }
}
//=================
//DigiFormat
function digi(str) {
   var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
   return r;
}
// ShowMore Beta ========================
let moreBlocks = document.querySelectorAll('._more-block');
if (moreBlocks.length > 0) {
   let wrapper = document.querySelector('.wrapper');
   for (let index = 0; index < moreBlocks.length; index++) {
      const moreBlock = moreBlocks[index];
      let items = moreBlock.querySelectorAll('._more-item');
      if (items.length > 0) {
         let itemsMore = moreBlock.querySelector('._more-link');
         let itemsContent = moreBlock.querySelector('._more-content');
         let itemsView = itemsContent.getAttribute('data-view');
         if (getComputedStyle(itemsContent).getPropertyValue("transition-duration") === '0s') {
            itemsContent.style.cssText = "transition-duration: 1ms";
         }
         itemsMore.addEventListener("click", function (e) {
            if (itemsMore.classList.contains('_active')) {
               setSize();
            } else {
               setSize('start');
            }
            itemsMore.classList.toggle('_active');
            e.preventDefault();
         });

         let isScrollStart;
         function setSize(type) {
            let resultHeight;
            let itemsContentHeight = 0;
            let itemsContentStartHeight = 0;

            for (let index = 0; index < items.length; index++) {
               if (index < itemsView) {
                  itemsContentHeight += items[index].offsetHeight;
               }
               itemsContentStartHeight += items[index].offsetHeight;
            }
            resultHeight = (type === 'start') ? itemsContentStartHeight : itemsContentHeight;
            isScrollStart = window.innerWidth - wrapper.offsetWidth;
            itemsContent.style.height = `${resultHeight}px`;
         }

         itemsContent.addEventListener("transitionend", updateSize, false);

         function updateSize() {
            let isScrollEnd = window.innerWidth - wrapper.offsetWidth;
            if (isScrollStart === 0 && isScrollEnd > 0 || isScrollStart > 0 && isScrollEnd === 0) {
               if (itemsMore.classList.contains('_active')) {
                  setSize('start');
               } else {
                  setSize();
               }
            }
         }
         window.addEventListener("resize", function (e) {
            if (!itemsMore.classList.contains('_active')) {
               setSize();
            } else {
               setSize('start');
            }
         });
         setSize();
      }
   }
}
//Полифилы
(function () {
   // проверяем поддержку
   if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   // проверяем поддержку
   if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
   anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
         behavior: 'smooth',
         block: 'start'
      })
   })
}

$('.back-to-top').click(function () {
   $('body,html').animate({ scrollTop: 0 }, 600);
});

$(window).scroll(function () {
   let scrolled = $(window).scrollTop();

   if (scrolled > 350) {
      $('.back-to-top').addClass('active');
   } else {
      $('.back-to-top').removeClass('active');
   }
});
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
   for (let index = 0; index < forms.length; index++) {
      const el = forms[index];
      el.addEventListener('submit', form_submit);
   }
}
async function form_submit(e) {
   let btn = e.target;
   let form = btn.closest('form');
   let error = form_validate(form);
   if (error == 0) {
      let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
      let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
      const message = form.getAttribute('data-message');
      const ajax = form.getAttribute('data-ajax');

      //SendForm
      if (ajax) {
         e.preventDefault();
         let formData = new FormData(form);
         form.classList.add('_sending');
         let response = await fetch(formAction, {
            method: formMethod,
            body: formData
         });
         if (response.ok) {
            let result = await response.json();
            form.classList.remove('_sending');
            if (message) {
               popup_open(message + '-message');
            }
            form_clean(form);
         } else {
            alert("Ошибка");
            form.classList.remove('_sending');
         }
      }
      // If test
      if (form.hasAttribute('data-test')) {
         e.preventDefault();
         if (message) {
            popup_open(message + '-message');
         }
         form_clean(form);
      }
   } else {
      let form_error = form.querySelectorAll('._error');
      if (form_error && form.classList.contains('_goto-error')) {
         _goto(form_error[0], 1000, 50);
      }
      e.preventDefault();
   }
}
function form_validate(form) {
   let error = 0;
   let form_req = form.querySelectorAll('._req');
   if (form_req.length > 0) {
      for (let index = 0; index < form_req.length; index++) {
         const el = form_req[index];
         if (!_is_hidden(el)) {
            error += form_validate_input(el);
         }
      }
   }
   return error;
}
function form_validate_input(input) {
   let error = 0;
   let input_g_value = input.getAttribute('data-value');

   if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
      if (input.value != input_g_value) {
         let em = input.value.replace(" ", "");
         input.value = em;
      }
      if (email_test(input) || input.value == input_g_value) {
         form_add_error(input);
         error++;
      } else {
         form_remove_error(input);
      }
   } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
      form_add_error(input);
      error++;
   } else {
      if (input.value == '' || input.value == input_g_value) {
         form_add_error(input);
         error++;
      } else {
         form_remove_error(input);
      }
   }
   return error;
}
function form_add_error(input) {
   input.classList.add('_error');
   input.parentElement.classList.add('_error');

   let input_error = input.parentElement.querySelector('.form__error');
   if (input_error) {
      input.parentElement.removeChild(input_error);
   }
   let input_error_text = input.getAttribute('data-error');
   if (input_error_text && input_error_text != '') {
      input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
   }
}
function form_remove_error(input) {
   input.classList.remove('_error');
   input.parentElement.classList.remove('_error');

   let input_error = input.parentElement.querySelector('.form__error');
   if (input_error) {
      input.parentElement.removeChild(input_error);
   }
}
function form_clean(form) {
   let inputs = form.querySelectorAll('input,textarea');
   for (let index = 0; index < inputs.length; index++) {
      const el = inputs[index];
      el.parentElement.classList.remove('_focus');
      el.classList.remove('_focus');
      el.value = el.getAttribute('data-value');
   }
   let checkboxes = form.querySelectorAll('.checkbox__input');
   if (checkboxes.length > 0) {
      for (let index = 0; index < checkboxes.length; index++) {
         const checkbox = checkboxes[index];
         checkbox.checked = false;
      }
   }
   let selects = form.querySelectorAll('select');
   if (selects.length > 0) {
      for (let index = 0; index < selects.length; index++) {
         const select = selects[index];
         const select_default_value = select.getAttribute('data-default');
         select.value = select_default_value;
         select_item(select);
      }
   }
}

//viewPass
let viewPass = document.querySelectorAll('._viewpass');
for (let index = 0; index < viewPass.length; index++) {
   const element = viewPass[index];
   element.addEventListener("click", function (e) {
      if (element.classList.contains('_active')) {
         element.parentElement.querySelector('input').setAttribute("type", "password");
      } else {
         element.parentElement.querySelector('input').setAttribute("type", "text");
      }
      element.classList.toggle('_active');
   });
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
   if (inputs.length > 0) {
      for (let index = 0; index < inputs.length; index++) {
         const input = inputs[index];
         const input_g_value = input.getAttribute('data-value');
         input_placeholder_add(input);
         if (input.value != '' && input.value != input_g_value) {
            input_focus_add(input);
         }
         input.addEventListener('focus', function (e) {
            if (input.value == input_g_value) {
               input_focus_add(input);
               input.value = '';
            }
            if (input.getAttribute('data-type') === "pass") {
               if (input.parentElement.querySelector('._viewpass')) {
                  if (!input.parentElement.querySelector('._viewpass').classList.contains('_active')) {
                     input.setAttribute('type', 'password');
                  }
               } else {
                  input.setAttribute('type', 'password');
               }
            }
            if (input.classList.contains('_date')) {
               /*
               input.classList.add('_mask');
               Inputmask("99.99.9999", {
                  //"placeholder": '',
                  clearIncomplete: true,
                  clearMaskOnLostFocus: true,
                  onincomplete: function () {
                     input_clear_mask(input, input_g_value);
                  }
               }).mask(input);
               */
            }
            if (input.classList.contains('_phone')) {
               //'+7(999) 999 9999'
               //'+38(999) 999 9999'
               //'+375(99)999-99-99'
               input.classList.add('_mask');
               Inputmask("+375 (99) 9999999", {
                  //"placeholder": '',
                  clearIncomplete: true,
                  clearMaskOnLostFocus: true,
                  onincomplete: function () {
                     input_clear_mask(input, input_g_value);
                  }
               }).mask(input);
            }
            if (input.classList.contains('_digital')) {
               input.classList.add('_mask');
               Inputmask("9{1,}", {
                  "placeholder": '',
                  clearIncomplete: true,
                  clearMaskOnLostFocus: true,
                  onincomplete: function () {
                     input_clear_mask(input, input_g_value);
                  }
               }).mask(input);
            }
            form_remove_error(input);
         });
         input.addEventListener('blur', function (e) {
            if (input.value == '') {
               input.value = input_g_value;
               input_focus_remove(input);
               if (input.classList.contains('_mask')) {
                  input_clear_mask(input, input_g_value);
               }
               if (input.getAttribute('data-type') === "pass") {
                  input.setAttribute('type', 'text');
               }
            }
         });
         if (input.classList.contains('_date')) {
            const calendarItem = datepicker(input, {
               customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
               customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
               overlayButton: 'Применить',
               overlayPlaceholder: 'Год (4 цифры)',
               startDay: 1,
               formatter: (input, date, instance) => {
                  const value = date.toLocaleDateString()
                  input.value = value
               },
               onSelect: function (input, instance, date) {
                  input_focus_add(input.el);
               }
            });
            const dataFrom = input.getAttribute('data-from');
            const dataTo = input.getAttribute('data-to');
            if (dataFrom) {
               calendarItem.setMin(new Date(dataFrom));
            }
            if (dataTo) {
               calendarItem.setMax(new Date(dataTo));
            }
         }
      }
   }
}
function input_placeholder_add(input) {
   const input_g_value = input.getAttribute('data-value');
   if (input.value == '' && input_g_value != '') {
      input.value = input_g_value;
   }
}
function input_focus_add(input) {
   input.classList.add('_focus');
   input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
   input.classList.remove('_focus');
   input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
   input.inputmask.remove();
   input.value = input_g_value;
   input_focus_remove(input);
}

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
   let blocks = [];
   for (let index = 0; index < link.length; index++) {
      let el = link[index];
      let block_name = el.getAttribute('href').replace('#', '');
      if (block_name != '' && !~blocks.indexOf(block_name)) {
         blocks.push(block_name);
      }
      el.addEventListener('click', function (e) {
         if (document.querySelector('.menu__body._active')) {
            menu_close();
            body_lock_remove(500);
         }
         let target_block_class = el.getAttribute('href').replace('#', '');
         let target_block = document.querySelector('.' + target_block_class);
         _goto(target_block, 300);
         e.preventDefault();
      })
   }

   window.addEventListener('scroll', function (el) {
      let old_current_link = document.querySelectorAll('._goto-block._active');
      if (old_current_link) {
         for (let index = 0; index < old_current_link.length; index++) {
            let el = old_current_link[index];
            el.classList.remove('_active');
         }
      }
      for (let index = 0; index < blocks.length; index++) {
         let block = blocks[index];
         let block_item = document.querySelector('.' + block);
         if (block_item) {
            let block_offset = offset(block_item).top;
            let block_height = block_item.offsetHeight;
            if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
               let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
               for (let index = 0; index < current_links.length; index++) {
                  let current_link = current_links[index];
                  current_link.classList.add('_active');
               }
            }
         }
      }
   })
}

//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
   for (let index = 0; index < goto_links.length; index++) {
      let goto_link = goto_links[index];
      goto_link.addEventListener('click', function (e) {
         let target_block_class = goto_link.getAttribute('href').replace('#', '');
         let target_block = document.querySelector('.' + target_block_class);
         _goto(target_block, 300);
         document.querySelector('.menu__body').classList.remove('_active');
         iconMenu.classList.remove('_active');
         e.preventDefault();
      });
   }
}
function _goto(target_block, speed, offset = 0) {
   let header = '';
   //OffsetHeader
   //if (window.innerWidth < 992) {
   //	header = 'header';
   //}
   let options = {
      speedAsDuration: true,
      speed: speed,
      header: header,
      offset: offset,
      easing: 'easeOutQuad',
   };
   let scr = new SmoothScroll();
   scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
   var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
   if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
   document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
   window.onwheel = preventDefault; // modern standard
   window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
   window.ontouchmove = preventDefault; // mobile
   document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
   if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
   document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
   window.onmousewheel = document.onmousewheel = null;
   window.onwheel = null;
   window.ontouchmove = null;
   document.onkeydown = null;
}
function preventDefault(e) {
   e = e || window.event;
   if (e.preventDefault)
      e.preventDefault();
   e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
   /*if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
   }*/
}

function fix_block(scr_fix_block, scr_value) {
   let window_width = parseInt(window.innerWidth);
   let window_height = parseInt(window.innerHeight);
   let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
   for (let index = 0; index < scr_fix_block.length; index++) {
      const block = scr_fix_block[index];
      let block_width = block.getAttribute('data-width');
      const item = block.querySelector('._side-block');
      if (!block_width) { block_width = 0; }
      if (window_width > block_width) {
         if (item.offsetHeight < window_height - (header_height + 30)) {
            if (scr_value > offset(block).top - (header_height + 15)) {
               item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
            } else {
               gotoRelative(item);
            }
            if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
               block.style.cssText = "position:relative;";
               item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
            }
         } else {
            gotoRelative(item);
         }
      }
   }
   function gotoRelative(item) {
      item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
   }
}

if (!isMobile.any()) {
   //custom_scroll();
   /*
   window.addEventListener('wheel', scroll_animate, {
      capture: true,
      passive: true
   });
   window.addEventListener('resize', custom_scroll, {
      capture: true,
      passive: true
   });
   */
}
function custom_scroll(event) {
   scr_body.style.overflow = 'hidden';
   let window_height = window.innerHeight;
   let custom_scroll_line = document.querySelector('._custom-scroll__line');
   let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
   let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
   if (custom_scroll_content_height > window_height) {
      if (!custom_scroll_line) {
         let custom_scroll = document.createElement('div');
         custom_scroll_line = document.createElement('div');
         custom_scroll.setAttribute('class', '_custom-scroll');
         custom_scroll_line.setAttribute('class', '_custom-scroll__line');
         custom_scroll.appendChild(custom_scroll_line);
         scr_body.appendChild(custom_scroll);
      }
      custom_scroll_line.style.height = custom_cursor_height + 'px';
   }
}

let new_pos = pageYOffset;
function scroll_animate(event) {
   let window_height = window.innerHeight;
   let content_height = document.querySelector('.wrapper').offsetHeight;
   let start_position = pageYOffset;
   let pos_add = 100;

   if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
      new_pos = new_pos - pos_add;
   } else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
      new_pos = new_pos + pos_add;
   }
   if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
   if (new_pos < 0) new_pos = 0;

   if (scrolling) {
      scrolling = false;
      _goto(new_pos, 1000);

      let scr_pause = 100;
      if (navigator.appVersion.indexOf("Mac") != -1) {
         scr_pause = scr_pause * 2;
      };
      setTimeout(function () {
         scrolling = true;
         _goto(new_pos, 1000);
      }, scr_pause);
   }
   //If native scroll
   //disableScroll();
}

// Google Map ========================================================
function mapAdd() {
   let tag = document.createElement('script');
   tag.src = "https://maps.google.com/maps/api/js?sensor=false&amp;key=&callback=mapInit";
   let firstScriptTag = document.getElementsByTagName('script')[0];
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
function mapInit(n = 1) {
   google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
      var map = this;
      var ov = new google.maps.OverlayView();
      ov.onAdd = function () {
         var proj = this.getProjection();
         var aPoint = proj.fromLatLngToContainerPixel(latlng);
         aPoint.x = aPoint.x + offsetX;
         aPoint.y = aPoint.y + offsetY;
         map.panTo(proj.fromContainerPixelToLatLng(aPoint));
         //map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
      }
      ov.draw = function () { };
      ov.setMap(this);
   };
   var markers = new Array();
   var infowindow = new google.maps.InfoWindow({
      //pixelOffset: new google.maps.Size(-230,250)
   });
   var locations = [
      [new google.maps.LatLng(55.7522, 37.6156)],
      // [new google.maps.LatLng(53.700055, 27.5513694)],
      // [new google.maps.LatLng(53.809055, 27.5813694)],
      // [new google.maps.LatLng(53.859055, 27.5013694)],
   ]
   var options = {
      zoom: 8,
      panControl: false,
      mapTypeControl: false,
      center: locations[0][0],
      styles: [{ "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "lightness": 700 }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#7dcdcd" }] }],
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   var map = new google.maps.Map(document.getElementById('map'), options);
   var icon = {
      url: 'img/icons/map.svg',
      scaledSize: new google.maps.Size(24, 29),
      anchor: new google.maps.Point(12, 15)
   }
   for (var i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
         icon: icon,
         position: locations[i][0],
         map: map,
      });
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
         return function () {
            for (var m = 0; m < markers.length; m++) {
               markers[m].setIcon(icon);
            }
            var cnt = i + 1;
            //infowindow.setContent(document.querySelector('.events-map__item_' + cnt).innerHTML);
            //infowindow.open(map, marker);
            marker.setIcon(icon);
            map.setCenterWithOffset(marker.getPosition(), 0, 0);
            setTimeout(function () {

            }, 10);
         }
      })(marker, i));
      markers.push(marker);
   }
   if (n) {
      var nc = n - 1;
      setTimeout(function () {
         google.maps.event.trigger(markers[nc], 'click');
      }, 500);
   }
}
if (document.querySelector('#map')) {
   mapAdd();
}
