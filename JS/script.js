// To Top Function
function topFunction() {
  document.documentElement.scrollTop = 0;
}
// Slideshow in home screen
var slideIndex = 1;
var timer = null;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  clearTimeout(timer);
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  clearTimeout(timer);
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n == undefined) {
    n = ++slideIndex;
  }
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
  timer = setTimeout(showSlides, 5000);
}

$("#submit-contact").on("click", function () {
  let custName = $("#name").val();
  let custEmail = $("#email").val();
  let custMsg = $("#msg").val();

  let feedbackData = {
    name: custName,
    email: custEmail,
    message: custMsg,
  };

  var settings = {
    async: true,
    crossDomain: true,
    url: "https://customerfeedbacks-9383.restdb.io/rest/feedback",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-apikey": "deb720067e280f164408963ced0586bd63b3f",
      "cache-control": "no-cache",
    },
    processData: false,
    data: JSON.stringify(feedbackData),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});

//Adding in of GET information from restdb which holds the information on exisiting accounts
var settings = {
  async: true,
  crossDomain: true,
  url: "https://customerfeedbacks-9383.restdb.io/rest/accountinfo",
  method: "GET",
  headers: {
    "content-type": "application/json",
    "x-apikey": "deb720067e280f164408963ced0586bd63b3f",
    "cache-control": "no-cache",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

// Spin the wheel
function Spin() {
  var x = 1024; //min value
  var y = 9999; // max value

  var deg = Math.floor(Math.random() * (x - y)) + y;

  document.getElementById("box").style.transform = "rotate(" + deg + "deg)";

  var element = document.getElementById("mainbox");
  element.classList.remove("animate");
  setTimeout(function () {
    element.classList.add("animate");
  }, 5000); //5000 = 5 second
}
