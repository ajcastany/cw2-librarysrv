"use strict";

const url = "http://localhost:3000/api/";

console.log("users-script loaded");

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
        console.log(data);
        console.log(userName, userCode, memberType);
        // Create a stack with the results.
        if (query == memberType || query == " ") { $('.search-ul').append('<div class="card" id="results-' + i + '"' + '"></div>');
        $('#results-' +i).append(
          '<div class="card-body"><h4 class="card-title">' + userName + '</h4><h6 class="card-subtitle">' + memberType + '</h6><h5 class="card-title">Barcode: ' + userCode + '</h5></div>'
        );} else if (data == []) {$('.results-output').append(
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

$('#add-user-button').click(function () {
  $('.add-status').empty();
  var userUrl = url + "users";
  var addUName = $('#user-name').val();
  var addBarcode = $('#add-user-barcode').val();
  var userType = $('select').val();
  var reName = /\w+/;           // string not null
  var rebar = /^\d{6}$/;        // 6 digits.
  var reType = /^Staff$|^Student$/;          // Staff or Student;

  function checkUserdDuplicate(name) {
    /*This function is not used, it should check if items exists in db and return True or False.*/
    let encode = encodeURIComponent(name);
    $.getJSON(url + "search?type=user&name=" + encode).then(res =>{
      console.log(res);
      if (res.name == addUName) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    });
  }

  if (reName.test(addUName) && rebar.test(addBarcode) && reType.test(userType)){
    console.log("ok");
    $.post(userUrl, {name: addUName, barcode: addBarcode, memberType: userType})
      .then( res => {
        console.log(res);
        let uName = res.name;
        let uCode = res.barcode;
        let uType = res.memberType;
        $('.add-status').append(
          '<div class="card far-away"><h3 class="card-header">Entry Successfully Added to Database</h3><div class="card-body"><h4 class="card-title">' + uName + '</h4><h5 class="card-subtitle">' + uType + '</h5><h4 class="card-title">Barcode: ' + uCode + '</h4><div></div>',
        );
      }

      );
  }
  else {
    console.log("not ok");
    alert("Please fill all fields");
  }
});

/*******************************************************************
Delete User
******************************************************************/

// function lookupDelUser() {
//   console.log("ok");
// }


/*******************************************************************
Delete addEvent Listener
*******************************************************************/
$('#search-del-user-button').click(function() {
  console.log("hi");
});
