let ScrollOver = require("./lib/ScrollOver.js")
let animateScroll = require("./lib/animatescroll.js")

let body = document.querySelectorAll("body")[0]
let tagline = document.querySelectorAll(".tagline")[0]

let features = document.querySelectorAll(".features-wrap")[0],
    slideAbout = document.querySelectorAll(".about")[0],
    slideTwo = document.querySelectorAll(".slide--two")[0],
    slideThree = document.querySelectorAll(".slide--three")[0],
    slideFour = document.querySelectorAll(".slide--four")[0],
    slideSix = document.querySelectorAll(".slide--six")[0],
    cookieButton = document.querySelectorAll(".cookie-popup-button")[0],
    languageSelect = document.querySelectorAll('.language-switcher')[0]

setTimeout(() => body.classList.add("shown"), 400)

let statusCookiePolicyAccepted = readCookie("status-cookie-policy")
if (statusCookiePolicyAccepted == "accepted") {
  hideCookiePopup()
}


document.querySelectorAll(".nav__item--features")[0].addEventListener('click', function(event){
    animateScroll(slideTwo, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

document.querySelectorAll(".nav__item--about")[0].addEventListener('click', function(event){
    animateScroll(slideThree, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

if(document.querySelectorAll(".nav__item--download")[0]) {
  document.querySelectorAll(".nav__item--download")[0].addEventListener('mouseover', function(event){
      showQRPopup()
  })

  document.querySelectorAll(".nav__item--download")[0].addEventListener('mouseout', function(event){
      hideQRPopup()
  })
}

cookieButton.addEventListener('click', function(event){
    createCookie("status-cookie-policy", "accepted", 30)
    hideCookiePopup()
    event.preventDefault()
})

document.querySelectorAll(".learn-more a")[0].addEventListener('click', function(event){
    animateScroll(slideAbout, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

document.querySelectorAll(".app-button--ios")[0].addEventListener('click', function(event){
    animateScroll(slideFour, 600, "easeInOutCubic", 0)
    setTimeout(function(){
      document.querySelectorAll(".email-form__input--email")[0].focus()
    }, 1000)
    event.preventDefault()
})


new ScrollOver({
  keyframes : [
    {
      element : slideTwo,
      reveal:
        {
          when : 440,
          className: "slide--shown"
        }

    },
    {
      element : slideThree,
      reveal:
        {
          when : 1200,
          className: "slide--shown"
        }
    },
    {
      element : slideSix,
      reveal:
        {
          when : 2190,
          className: "slide--shown"
        }
    }
  ]
}).init()

function showQRPopup() {
  addClassToElement(document.querySelectorAll(".qr-popup")[0], "qr-popup--shown")
}

function hideQRPopup() {
  removeClassFromElement(document.querySelectorAll(".qr-popup")[0], "qr-popup--shown")
}

function hideCookiePopup() {
  document.querySelectorAll(".cookie-popup__inner")[0].style.display = "none"
  return true
}

// Create cookie
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

// Read cookie
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

// Erase cookie
function eraseCookie(name) {
    createCookie(name,"",-1);
}

languageSelect.addEventListener("change", function () {
    let lang = languageSelect.options[languageSelect.selectedIndex].value
    if (lang == "en") {
      window.location.replace("https://status.im/")
      return
    }
    window.location.replace("https://status.im/" + lang + ".html")
})

/*---Utils---*/
function addClassToElement(element, className) {
  (element.classList) ? element.classList.add(className) : element.className += ' ' + className
  return element
}

function removeClassFromElement(element, className) {
  if(element.classList) {
    element.classList.remove(className)
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
  }
  return element
}
