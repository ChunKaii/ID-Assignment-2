function topFunction() {
  document.documentElement.scrollTop = 0;
}
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//Adding in of GET information from restdb which holds the information on exisiting accounts
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://customerfeedbacks-9383.restdb.io/rest/accountinfo",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "x-apikey": "deb720067e280f164408963ced0586bd63b3f",
    "cache-control": "no-cache"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});