"use strict";

const url = "http://localhost:8000/api/";

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

  function checkUserdDuplicate(name, barcode) {
    /*This function is not used, it should check if items exists in db and return True or False.*/
    let encode = encodeURIComponent(name);
    $.getJSON(url + "search?type=user&name=" + encode + "&barcode=").then(res =>{
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

function lookupDelUser(query) {
  console.log("ok");
  var encode = encodeURIComponent($('#search-user').val());
  var searchQ = url + "search?type=" + query + "&name=" + encode;
  console.log(searchQ);

  fetch(searchQ, {
    method: 'GET',
  })
    .then(res => {
      return res.json();
    })
    .then(response => {
      $('.results-output').prepend("<h1 class=result-title>Results:</h1>");
      response.forEach(function(data,i){
        var userName = data.name;
        var userCode = data.barcode;
        var memberType = data.memberType;
        var userID = data.id;
        console.log(userID, userName, userCode, memberType);
        $('.search-ul').append('<div class="card" id="results-' + i + '"></div>' );
        $('#results-' + i).append(
          '<div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><input type="checkbox" name="Delete" aria-label="Delete entries" class="checkbox-del"></div></div><div class="card-body"><h4 class="card-title">' + userName + '</h4><h6 class="card-subtitle">' + memberType + '</h6><h5 class="card-title">Barcode: ' + userCode + '</h5></div><li class="userID">' + userID + '</li>',
        );
        $([document.documentElement, document.body]).animate({
          scrollTop: $('.results-output').offset().top
        }, 700);
        $('input[type=checkbox]').change(function() {
          if($(this).is(":checked")){
            $(this).closest("div.card").addClass("redBackground");
          } else {              $(this).closest("div.card").removeClass("redBackground");
                 }
        });
      });
    });
}


/*******************************************************************
Delete addEvent Listener
*******************************************************************/
$('#search-del-user-button').click(function() {
  $('.result-title').empty();
  $('.search-ul').empty();
  var query = "user";
  if ($('#search-user').val()){
    lookupDelUser(query);
  }

});

/*******************************************************************
Delete functions
==================================================================

      /TODO: search by barcode, delete by barcode.
*******************************************************************/

$('#delete-entry').click( function() {
  var userList = [];
  var barList = [];

  $('input[type=checkbox]:checked').closest("[id^=results-]").children(".input-group").children(".userID").each(function () {
    userList.push($(this).html());
  });
  console.log(userList);
  var deleteUserMsg = confirm("Are you sure you want to delete " + userList.length + " items?");
  if (deleteUserMsg == true){
    userList.forEach( function (userID, i) {
      $.ajax({
        url: url + "users/" + userID,
        type: "DELETE",
        success: function() {
          alert("Entries deleted");
        }
      });
    });
  }
});

/*******************************************************************
Update User Search functions
==================================================================

/TODO: Add search
/TODO: Add update

******************************************************************/

function lookupUpdate(query){
  var encode = encodeURIComponent($('#search-user').val());
  var searchQ = url + "search?type=" + query + "&name=" + encode;
  console.log(searchQ);

  fetch(searchQ, {
    method: 'GET',
  })
    .then(res => {
      return res.json();
    })
    .then(response => {
      $('.results-output').prepend("<h1 class=result-title>Results:</h1>");
      response.forEach(function(data,i){
        var userName = data.name;
        var userCode = data.barcode;
        var memberType = data.memberType;
        var userID = data.id;
        console.log(userID, userName, userCode, memberType);
        $('.search-ul').append('<div class="card" id="results-' + i + '"></div>' );
        $('#results-' + i).append(
          '<div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><input type="checkbox" name="Delete" aria-label="Delete entries" class="checkbox-del"></div></div><div class="card-body"><h4 class="card-title">' + userName + '</h4><h6 class="card-subtitle">' + memberType + '</h6><h5 class="card-title">Barcode: ' + userCode + '</h5></div><li class="userID">' + userID + '</li>',
        );
        $([document.documentElement, document.body]).animate({
          scrollTop: $('.results-output').offset().top
        }, 700);
      });
      $('input[type=checkbox]').change(function() {
        if($(this).is(":checked")){
          console.log($(this).length);
          $(this).closest("div.card").addClass("blueBackground");
          if ($('#update-button').length === 0){
            $(this).closest("div.card").find('.card-body').append(
              '<button type="button" id="update-button" class="btn btn-outline-success">Update</button>');
          }

          // Swap elements
          var updateName = $(this).closest('div.card').find('h4.card-title').html();
          var updateBarcode = $(this).closest('div.card').find('h5.card-title').html();
          var updateMember = $(this).closest('div.card').find('h6.card-subtitle').html();
          var updatedID = $(this).closest('div.card').find('li.userID').html();
          console.log(updateName);
          console.log(updateBarcode);
          // console.log(updateName, updateBarcode.slice(9), updateMember, updatedID);
          $(this).closest('div.card').find('h4.card-title').replaceWith(
            '<input class="form-control name" type="text" placeholder="' + updateName + '">' );
          $(this).closest('div.card').find('h6.card-subtitle').replaceWith(
            '<input class="form-control member" type="text" placeholder="' + updateMember + '">' );
          $(this).closest('div.card').find('h5.card-title').replaceWith(
            '<input class="form-control code" type="text" placeholder="' + updateBarcode.slice(9) + '">' );
          // AddEventlistener
          $('#update-button').click(function() {
            var newName = $(this).closest("div.card").find('input.name').attr("placeholder");
            var newCode = $('input.code').attr("placeholder");
            var newMember = $('input.member').attr("placeholder");
            var updatedID = $(this).closest('div.card').find('li.userID').html();
            if ($("input.name").val() != "") { // is not empty
              newName = $('input.name').val();
            }
            if ($("input.code").val() != "") { // is not empty)
              newCode = $('input.code').val();
            }
            if ($('input.member').val() != ""){
              newMember = $('input.member').val();
            }
            console.log(newName, newCode, newMember, updatedID);
            $.ajax({
              url: url + "users/" + updatedID,
              method: "PUT",
              data: {name: newName, barcode:newCode, memberType:newMember},
              success: function(data) {
                console.log(data);
                alert("Updated entry ID: " + updatedID + ", Name: " + data.name + ", Barcode: "+ data.barcode +", " +  data.memberType);
                location.reload();
              }
            });

          });
        } else {
          $(this).closest("div.card").removeClass("blueBackground");
        }
      });

    });
}

/******************************************************************
Update User Add Event Listener

/TODO: Search by Barcode or staff.
******************************************************************/

$('#search-update').click(function() {
  $('.result-title').empty();
  $('.search-ul').empty();
  var query = "user";
  if ($('#search-user').val()){
    lookupUpdate(query);
  }
});

/*******************************************************************
Loans Search Book functions
====================================================================
/TODO: Search Book Function
******************************************************************/

function lookUpBooktoLoan(qtype) {
  var encode = encodeURIComponent($('#loans-title').val());
  var encodeISBN = encodeURIComponent($('#loans-isbn').val());
  var searchQ = url+ "search?type=" + qtype +
      "&title=" + encode + "&isbn=" + encodeISBN;
  console.log(searchQ);

  function extendEvent(i, userLoanId){
    $('.extend-date').click(function() {
      console.log(userLoanId);
      var divExtend = $(document.createElement('div.extend-event'));
 var renderdateContent = '<div id="dialog" class="user-ID-Div" title="Extend due Date"><h4>New Due Date</h4><div class="datepicker"></div><script>$(".datepicker").datepicker({inline: true, format: "dd-mm-yyyy"});</script></div><button type="button" class="btn btn-info" id="extend-due-date-btn">Update</button></div>';
      divExtend.append(renderdateContent);
      divExtend.dialog();
      $('#extend-due-date-btn').click(function() {
        var date = $('.datepicker').val();
        function toDate(dateStr) {
          const [month, day, year] = dateStr.split("/");
          return new Date(year, month - 1, day, 17, 30); // Half an hour after closing
        }
        console.log(toDate(date));
        $.ajax({
          url: url + "loans/" + userLoanId,
          method: "PUT",
          data: {dueDate:date},
        }).then( res => {
          divExtend.remove();
          $('[id^=results-]').remove();
          alert("Due Date extented");
          location.reload();
        });
      });
    });
  }

  function loanEvent(i, bookID){
    $('#loanBook-' + i).click(function() {
      console.log("click");
      var divResults = $(document.createElement('div'));
      divResults.append(
        '<div class="modal" id="searchUser-loan" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalCenteredLabel">Search User or Barcode</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="card-body"><h4 class="card-title">Search User or Barcode</h4></div>',
        '<div class="input-group input-group-md><div class="input-group-prepend"><span class="input-group-text" id="inputGroup-sizing-md">User or Code</span></div><input type="text" id="user-or-barcode" class="form-control" aria-label="Medium" aria-describedby="inputGroup-sizing-sm"></div> <div class="modal-footer"><button type="button" class="btn btn-info" id="search-user-loan-btn">Search</button></div>',
        '<div class="user-search-res"></div></div>',
      );
      divResults.dialog();
      $('#search-user-loan-btn').click(function() {
        var searchQ = $('#user-or-barcode').val();
        var encode = encodeURIComponent(searchQ);
        var re = /\d+/;
        if (re.test(encode)) {var encodeBarCode = encode; encode = "";} else {
          var encodeBarCode = "";
        }
        if (!encode) {
          $.getJSON(url + "search?type=user&name=" + encode + "&barcode=" + encodeBarCode).then(res => {
            res.forEach(function(data, i) {
              var divUserResults = $(document.createElement('div.render-user-search-results'));
            res.forEach(function(data,i) {
              var renderUserContent = '<div id="dialog" class="user-ID-Div" title="Search Results"><li class="hidden">' + data.id + '</li><h4>' + data.name + '</h4><div class="datepicker"></div><script>$(".datepicker").datepicker({inline: true, format: "dd-mm-yyyy"});</script></div><button type="button" class="btn btn-info" id="loan-book-to-user">Loan</button></div>';
              divUserResults.append(renderUserContent);
            });
            divUserResults.dialog();

            $('#loan-book-to-user').click(function() {
              var date = $('.datepicker').val();
              function toDate(dateStr) {
                const [month, day, year] = dateStr.split("/");
                return new Date(year, month - 1, day, 17, 30); // Half an hour after closing
              }
              var parseDate = toDate(date);
              var userID = $('li.hidden').html();
              console.log(bookID, userID);
              $.post(url + "users/" + userID + "/loans/" + bookID, {dueDate: parseDate})
                .then(res => {
                  console.log(res);
                  divUserResults.remove();
                });
            });
            });
          });
          divResults.remove();
        } else {
          $.getJSON(url + "search?type=user&name=" + encode + "&barcode=" + encodeBarCode).then(res => {
            var divUserResults = $(document.createElement('div.render-user-search-results'));
            res.forEach(function(data,i) {
              var renderUserContent = '<div id="dialog" class="user-ID-Div" title="Search Results"><li class="hidden">' + data.id + '</li><h4>' + data.name + '</h4><div class="datepicker"></div><script>$(".datepicker").datepicker({inline: true, format: "dd-mm-yyyy"});</script></div><button type="button" class="btn btn-info" id="loan-book-to-user">Loan</button></div>';
              divUserResults.append(renderUserContent);
            });
            divUserResults.dialog();

            $('#loan-book-to-user').click(function() {
              var date = $('.datepicker').val();
              function toDate(dateStr) {
                const [month, day, year] = dateStr.split("/");
                return new Date(year, month - 1, day, 17, 30); // Half an hour after closing
              }
              var parseDate = toDate(date);
              var userID = $('li.hidden').html();
              console.log(bookID, userID);
              $.post(url + "users/" + userID + "/loans/" + bookID, {dueDate: parseDate})
                .then(res => {
                  console.log(res);
                  divUserResults.remove();
                  // $('[id^=results-]').remove();
                });
              // divUserResults.remove();
              // divUserResults.empty();
              // divUserResults = $(document.createElement('div.render-user-search-results'));
              // var renderDueDate = '<div id="duedate-' + i + '" title="Select Due Date"></div>';
              // divUserResults.append(renderDueDate);
              // divUserResults.dialog();
            });
          });
          divResults.remove();
        }
      });
    }
                             );
  }

  fetch(searchQ, {
    method: "GET"
  })
    .then(res=> {
      return res.json();
    })
    .then(response => {
      $('.results-output').prepend('<h1 class="result-title">Results</h1>');
      response.forEach(function(data, i) {
        var loanBookID = data.id;
        $.getJSON(url + "books/" + loanBookID + "/authors", function(data) {
          var loanBookTitle = data.title;
          var loanBookISBN = data.isbn;
          var loanAuthorList = data.Authors;
          console.log(loanBookID, loanBookTitle, loanBookISBN, loanAuthorList);
          $('.search-ul').append('<div class="card" id="results-' + i +'"></div>');
          $('#results-' +i).append(
            '<div class="card-body"><h4 class="card-title">' + loanBookTitle + '</h4><h6 class="card-subtitle">ISBN: ' + loanBookISBN + '</h6><h5 class="card-title">Author(s): </h5><li class=loanbookid>' + loanBookID + '</li></div>'
          );
          loanAuthorList.forEach(function (authors, e) {
            $('#results-' +i).append(
              '<p class="card-text">' + authors.name + '</p>'
            );
          });
          $.getJSON(url + "loans/" +loanBookID + "/books", function (data) {
            if (data.length === 0) {
              $('#results-' +i).append(
                '<button type="button" id="loanBook-' + i + '" class="loan-book btn btn-info" data-toggle="modal" data-target="#searchUser-loan">Loan This Book</button>'
              );
              loanEvent(i, loanBookID);
            } else {
              // console.log(data[0].id);
              var userLoanID = data[0].id;
              var dueDate = data[0].dueDate;
              // var parsedDate = $.datepicker.formatDate('dd-M-yyyy', dueDate);
              Date.prototype.toShortFormat = function() {
                // From a post by user Ahmad on Stackoverflown.com: https://stackoverflow.com/questions/27480262/get-current-date-in-dd-mon-yyy-format-in-javascript-jquery on 14-Dec-2015, accessed on 20-Jan-2019

                var month_names =["Jan","Feb","Mar",
                                  "Apr","May","Jun",
                                  "Jul","Aug","Sep",
                                  "Oct","Nov","Dec"];
                var day = this.getDate();
                var month_index = this.getMonth();
                var year = this.getFullYear();
                return "" + day + " " + month_names[month_index] + " " + year;
              };
              // Now any Date object can be declared
              var parseDate = new Date(dueDate);
              var insertDate = parseDate.toShortFormat();
              var UserID = data[0].UserId;
              $.getJSON(url + "users/" + UserID, function(res) {
                var userNameforLoan =  String(res.name);

                $('#results-' +i).append(
                  '<div class="loans-container d-flex"><p class="card-text alert alert-danger">Book on Loan to: ' + String(userNameforLoan) + '. Due Date: ' + insertDate +'</p><p class="hidden">' + userLoanID + '</p><button type="button" id="return-book" class="return-book btn btn-danger">Return This Book?</button><button type="button" class="extend-date btn btn-info">Extend due Date</button></div>'
                );
                $('.return-book').click(function() {
                  var loanID = $(this).closest('[id^=results-]').find('li.hidden').html();
                  console.log(loanID);
                  $.getJSON(url + "loans/" + userLoanID).then(res => {
                    console.log(res);
                    var returned = confirm("Return Book by User: " + userNameforLoan);
                    if (returned === true) {
                      $.ajax({
                        url: url + "loans/" + userLoanID,
                        method: "DELETE",
                        success: function() {
                          alert("Book returned");
                          location.reload();
                        }
                      });
                    }
                  });
                });
                extendEvent(i, userLoanID);
                // $('.extend-date').click(function() {
                //   console.log("click");


                // });
              });
            }
          });
        });
      });
    });
}

/******************************************************************
Loans Search User
******************************************************************/

function lookUpLoanUser(qtype){
  var encode = encodeURIComponent($('#loans-search-user').val());
  var re = /\d+/;
  if (re.test(encode)) {var encodeBarCode = encode; encode = "";} else {
    var encodeBarCode = "";
  }
  console.log(encode, encodeBarCode);
  var searchQ = url + "search?type=" + qtype + "&name=" + encode + "&barcode=" + encodeBarCode;
  console.log(searchQ);

  fetch(searchQ, {
    method: "GET",
  })
    .then(res => {
      return res.json();
    })
    .then(response => {
      $('.results-output').prepend('<h1 class="result-title">Results</h1>');
      response.forEach(function(data, i) {
        console.log(data);
        var loanUserID = data.id;
        var loanUserName = data.name;
        var loanUserMember = data.memberType;
        $('.search-ul').append('<div class="card" id="results-' + i +'"></div>');
        $('#results-' +i).append(
          '<div class="card-body"><h4 class="card-title">User: ' + loanUserName + '</h4><h6 class="card-subtitle">' + loanUserMember + '</h6><h5 class="card-title books-on-loan">Books on Loan: </h5><li class=loanbookid>' + loanUserID + '</li></div>'
        );
        $.getJSON(url + "loans/" + loanUserID + "/users", function(data) {
          // if (data) {
          //   $('#results-' + i).append(
          //     '<p class="card-text">No books on Loan</p>'
          //   );
          // }
          data.forEach(function(data, i) {
            // console.log(data.id, data.UserId, data.BookId);
            $.getJSON(url + "books/" + data.BookId + "?allEntities=true", function(data) {
              console.log(data.title);
                $('[id^=results-]').append(
                            '<p class="card-text book-resul-t-' + i + '">' + data.title + '</p>',
                );
            });
          });
        });
      });
    });

}

/*****************************************************************
Loans AddEventListener
==================================================================
/TODO:
******************************************************************/

$("#search-loan-book").click(function() {
  $('.result-title').empty();
  $('.search-ul').empty();
  var qtype;
  if ($('#loans-title').val() || $('#loans-isbn').val()) {
    qtype = "book";
    lookUpBooktoLoan(qtype);
  } else if ($('#loans-search-user')) {
    qtype="user";
    lookUpLoanUser(qtype);
  }
});

// __EOF__
