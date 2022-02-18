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

$("#add-update-msg").hide();
$("#contact-submit").on("click", function () {
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

//Function to redirect user to the Cart html page
function reDirectToCart() {
  window.location.href = "Cart.html";
}

//window.load = doShowAll();

//Function to check whether the browser supports html 5 which is required for local storage
// function CheckBrowser() {
//   if ('localStorage' in window && window['localStorage'] !== null) {
//     return true;
//   } 
// else {
//     return false;
//   }
// }

// //Function to display all the items from the local storage
// function doShowAll() {
//   if (CheckBrowser()) {
//      var key = "";
//      var list = "<tr><th>Item</th><th>Value</th></tr>\n";

//      for (i = 0; i <= localStorage.length-1; i++) {
//        key = localStorage.key(i);
//        list += "<tr><td>" + key.name + "</td>\n<td>" + key.price + "</td></tr>\n";
//      }

//      if (list == "<tr><th>Item</th><th>Value</th></tr>\n") {
//        list += "<tr><td><i>Empty</i></td>\n<td><i>Empty</i></td></tr>\n";
//      }

//      document.getElementById('list').innerHTML = list;
//     // var items = JSON.parse(localStorage);

//     // for (var key in items){
//     //   document.getElementById('list').innerHTML += items[key];
//     // }
//   } 
//   else {
//     alert('Cannot save shopping list as your browser does not support HTML 5');
//   }
// }

// //Function to save item into the local storage
// function SaveItem() {

//   var name = this.name;
//   var price = this.price;
//   localStorage.setItem(name, price);
//   alert("Item added successfully!");

// }

// function RemoveItem()
// {
// var name=document.forms.ShoppingList.name.value;
// document.forms.ShoppingList.data.value=localStorage.removeItem(name);

// }

// function ClearAll() {
//   localStorage.clear();

// }

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}
else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');
  for (var i = 0; i < removeCartItemButtons.length; i++){
    var button  = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('card-quantity-input');
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName('');
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement;
  var name = shopItem.getElementsByClassName('product-name')[0].innerText;
  var price = '';
  if (shopItem.classList.contains('new-product-price')) {
    price = shopItem.getElementsByClassName('new-product-price')[0].innerText;
  }
  else {
    price = shopItem.getElementsByClassName('product-price')[0].innerText;
  }
  var imageSrc = shopItem.getElementsByClassName('product-img')[0].src;
  console.log(name, price);
  addItemToCart(name, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(name, price, imageSrc) {
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartItemNames = document.getElementsByClassName('cart-item-title');
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i],innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
  <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${name}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
  </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  alert("Item added successfully!");
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}