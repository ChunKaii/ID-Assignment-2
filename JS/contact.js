$(document).ready(function () {
  const APIKEY = "61d69defccd0211b3208978a";
  getContacts();
  $("#update-contact-container").hide();
  $("#add-update-msg").hide();

  // submit form listener
  $("#contact-submit").on("click", function (e) {
    e.preventDefault();

    // retrieve data from form
    let contactName = $("#contact-name").val();
    let contactEmail = $("#contact-email").val();
    let contactMessage = $("#contact-msg").val();

    // get form data
    let jsondata = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    };

    // AJAX Settings
    let settings = {
      async: true,
      crossDomain: true,
      url: "https://jasonheodatabase-1987.restdb.io/rest/ecommerce",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
      processData: false,
      data: JSON.stringify(jsondata),
      beforeSend: function () {
        $("#contact-submit").prop("disabled", true);
        $("#add-contact-form").trigger("reset");
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      $("#contact-submit").prop("disabled", false);
      $("#add-update-msg").show().fadeOut(3000);
      getContacts();
    });
  });

  //function to show forms submitted
  function getContacts(limit = 10, all = true) {
    // AJAX Settings
    let settings = {
      async: true,
      crossDomain: true,
      url: "https://jasonheodatabase-1987.restdb.io/rest/ecommerce",
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": APIKEY,
        "cache-control": "no-cache",
      },
    };
    // Add Content to be displayed
    $.ajax(settings).done(function (response) {
      let content = "";

      for (var i = 0; i < response.length && i < limit; i++) {
        content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].message}</td></tr>`;
      }
      $("#contact-list tbody").html(content);

      $("#total-contacts").html(response.length);
    });
  }
});
