"use strict";

const url = "http://localhost:3000/api/";

console.log("uses-script loaded");

/*******************************************************************
Search user functions
*******************************************************************/

function lookupUser(query) {
  var encode = encodeURIComponent($('#search-user').val());
  var searchQ = url + "search?type=" + query + "&name=" + encode;
  console.log(searchQ);

  fetch(searchQ, {
    method: 'get',
  })
    .then(res => {
      return res.json();
    })
    .then(response => {
      $('.results-output').prepend("<h1 class=result-title>Results:</h1>");
      response.forEach(function (data, i) {
        var userName = data.name;
        var userCode = data.barcode;
        var memberType = data.memberType;
        console.log(userName, userCode, memberType);
        $('.search-ul').append('<div class="card" id="results-' + i + '"' + '"></div>');
        $('#results-' +i).append(
          '<div class="card-body"><h4 class="card-title">' + userName + '</h4><h6 class="card-subtitle">' + memberType + '</h6><h5 class="card-title">Barcode: ' + userCode + '</h5></div>'
        );
      });
    });
}

function lookupBarcode(query) {
var encode = encodeURIComponent($('#search-barcode').val());
  var searchQ = url + "search?type=" + query + "&barcode=" + encode;
  console.log(searchQ);

  fetch(searchQ, {
    method: 'get',
  })
    .then(res => {
      return res.json();
    })
    .then(response => {
      $('.results-output').prepend("<h1 class=result-title>Results:</h1>");
      response.forEach(function (data, i) {
        var userName = data.name;
        var userCode = data.barcode;
        var memberType = data.memberType;
        console.log(userName, userCode, memberType);
        $('.search-ul').append('<div class="card" id="results-' + i + '"' + '"></div>');
        $('#results-' +i).append(
          '<div class="card-body"><h4 class="card-title">' + userName + '</h4><h6 class="card-subtitle">' + memberType + '</h6><h5 class="card-title">Barcode: ' + userCode + '</h5></div>'
        );
      });
    });
}

function lookupMember(query){
var encode = encodeURIComponent($('#search-select').val());
  var searchQ = url + "search?type=user&memberType=" + encode;
  console.log(searchQ);

  fetch(searchQ, {
    method: 'get',
  })
    .then(res => {
      return res.json();
    })
    .then(response => {
      $('.results-output').prepend("<h1 class=result-title>Results:</h1>");
      response.forEach(function (data, i) {
        var userName = data.name;
        var userCode = data.barcode;
        var memberType = data.memberType;
        console.log(userName, userCode, memberType);
        // Create a stack with the results.
        if (query == memberType || query == " ") { $('.search-ul').append('<div class="card" id="results-' + i + '"' + '"></div>');
        $('#results-' +i).append(
          '<div class="card-body"><h4 class="card-title">' + userName + '</h4><h6 class="card-subtitle">' + memberType + '</h6><h5 class="card-title">Barcode: ' + userCode + '</h5></div>'
        );} else {$('.results-output').append(
          '<div class="card-body"><h4 class="card-title">Sorry!</h4><h5 class="card-title">No Results found!</h5></div>'
        );}
      });
    });
}



/*******************************************************************
Search User - Add Event Listener
==================================================================*/

$('#search-user-button').click(function () {
  $('.result-title').empty();
  $('.search-ul').empty();
  var query = "user";
  if ($('#search-user').val()) {
    lookupUser(query);
  } else if ($('#search-barcode').val()) {
    lookupBarcode(query);
  }else if ($('option').val()) {
    var optionValue = $('select').val();
    console.log(optionValue);
    lookupMember(optionValue);
  }
});

/*******************************************************************
Add User Functions
*******************************************************************/
