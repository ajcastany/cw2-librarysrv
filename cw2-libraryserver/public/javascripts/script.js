"use strict";
const url = "http://localhost:3000/api/";         // our API url;

console.log("cript loaded");    // Debug info.

/* ==================================================================
   Extending jQuery
   ==================================================================
   I got this content from an answer made by user Stepan Suvorov on StackOverflown:
   https://stackoverflow.com/questions/2153917/how-to-send-a-put-delete-request-in-jquery on 01-04-2014, accessed on 14-01-2019.
******************************************************************/

jQuery.each( [ "put", "delete" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});

/* ==================================================================
   Add Book and Author page:
   ==================================================================

   The following is for /add-book page.  It contains functions and methods to add new books and authors to the relational database on /data using information provided with a form.

   --Method: POST

   /TODO: Show info added to the database when entry added.
   /TODO: Check that all values are not nil when adding entry to db.
   /TODO: Improve RegExp pattern for authorList
   /TODO: Fix duplicated authors.

   /DONE: Are you sure? Confirm/alert
   /DONE: add Delete book.
   /DONE: incorporate authors_books table on this file.
   /DONE: PUT methods.
   /DONE: Event Listeners
   /DONE: POST function
   /DONE: Success message
   /DONE: Post to authors_books db when adding books.

   ------------------------------------------------------------------
*/

// ------------------------------------------------------------------
// Add Book and author functions:
// The following assigns author id 4 to book id 4 on author_book table
// $.post("http://localhost:3000/api/authors/4/books/4")
// ==================================================================

$('#more-authors').click( function () {
  var count = $(this).data("count") || 0; // count the clicks
  $(this).data("count", ++count);
  // console.log(count);                     // print the clicks.
  $('.author-list').append(
    '<div class="d-flex flex-row"><div class="input-group-prepend"><span class="input-group-text" id="inputGroup-sizing">Author #' + (count + 1) + ':</span></div><input type="text" name="name" placeholder="Another Author" aria-label="Medium" aria-describedby="inputGroup-sizing-md" class="add-author-' + count + ' form control"></div>');
})



$('#add-button').click(function() {
  $(".add-status").empty();
  var bookUrl = url + "books";                   // localhost:3000/api/
  // Values from form.
  var addTitle = $('#add-book').val();
  var addIsbn = $('#add-isbn').val();
  var authorList = $('[class^="add-author-"]').map( function (i, data) {
    var re = /\w+/;             // Checks for string not null.  TODO: Improve?
    var authorName = ($(data).val());
    // console.log(typeof(authorName.length));
    // console.log(re.test(authorName));
    if (re.test(authorName)) {
      return {name: $(data).val()} ;
    }
});
  // console.log(authorList);
  // if (authorList.lenght > 0){
  //   console.log(authorList);
  // } else {console.log("This is what i want");}
  // for loop should come here
  authorList.each( function ( index, data) {
    var addAuthor = data.name;
    console.log(addAuthor);
    // We need to check if the author exists, and put it instead of post.
    var encode = encodeURIComponent(addAuthor);
    $.get(url + "search?type=author&name=" + encode).then(res => {
      console.log(res.length);
      if (res.length < 1) {
      $.post(url + "authors/", {name: addAuthor}).then(function(response) {
        console.log(response.id);
    // console.log(url + "authors/" + response.id + "/books");
    // console.log({title: addTitle, isbn: addIsbn, name: data.name});
    $.post(url + "authors/" + response.id + "/books", {bookTitle: addTitle, bookISBN: addIsbn}).then( res => {
      console.log(res);
    });
      });
      } else {
        console.log(res[0]);
        $.post(url + "authors/" + res[0].id + "/books", {bookTitle: addTitle, bookISBN: addIsbn}).then( res => {
      console.log(res);
    });
      };
    });
    // })// .then(
    //   $.post(url + "authors/", {name: addAuthor}).then(function(response) {
    //     console.log(response.id);
    // // console.log(url + "authors/" + response.id + "/books");
    // // console.log({title: addTitle, isbn: addIsbn, name: data.name});
    // $.post(url + "authors/" + response.id + "/books", {bookTitle: addTitle, bookISBN: addIsbn}).then( res => {
    //   console.log(res);
    // });
    //   }));
  $('.add-form').each( function() {
    this.reset();
  });
    $('.add-status').append(
      '<h2 class="success"> Entry Successfully added to the database</h2>');

    });
  });

/*==================================================================
  Delete entries from database.
  ==================================================================

  Contains the functions for deleting entries from the DB.

  Method: "POST"

  /DONE: Add search
  /DONE: Add radio button
  /DONE: Add delete functions.

  //TODO: Delete authors?

  ******************************************************************
  */
$('#delete-entry').click( function () {
  var bookList = [];
  var authorList = [];
  // console.log($('input[type=checkbox]:checked').parent().parent().parent().parent().children('li.bid').html()); // Don't do this again.  use closest() or parents()
  $('input[type=checkbox]:checked').closest("[id^=results-]").children('li.bid').each( function () {
    bookList.push($(this).html());
  });
  $('input[type=checkbox]:checked').closest("[id^=results-]").children('li.aid').each( function() {
    authorList.push($(this).html());

  });
  function itemsLength() {
    if (bookList > 0) {
      return bookList.length;
    } else if (authorList > 0) {return authorList.length;}
  }
  var deleteBookMsg = confirm("Are you sure you want to delete " + itemsLength() + " items?");
  if (deleteBookMsg == true) {
    bookList.forEach( function (bookID, i) {
      console.log(bookID);
      $.ajax({
        url: url + "books/" + bookID,
        type: 'DELETE',
        success: function() {
          console.log("Deleted book ID:" + bookID);
        }
      });
    });
    authorList.forEach( function (authorID, i) {
      console.log(authorID);    // Not implemented
      $.ajax({
        url: url + "authors/" + authorID,
        type: 'DELETE',
        success: function() {
          console.log("Deleted author ID:" + authorID);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log("Author not found");
        }
    });
    });
  }
});

/* ==================================================================
   Delete Search Book and Author page:
   ==================================================================

   The following is for /search page.  It contains functions and methods to list the books and authors.  If searched for a book title or isbn will also list the author, if the author named is looked up it will return the book associated with it's ID.

   --Method: "GET"

   /TODO: maximum of items listed per 'page'.
   /TODO: search author_books table and return all authors in a book.
   /TODO: Comment out // Debug lines

   ------------------------------------------------------------------
*/

//---------------------------------------------------------------------
// Delete Search book functions:
// ===================================================================


function lookupBook_del(qtype) {
  var searchQ = url + "search?type=" + qtype +
                    "&title=" +
                    $('#search-book').val() +
                    "&isbn=" +
                    $('#search-isbn').val();
  // console.log(searchQ);
  fetch(searchQ, {
        method: 'get'
    })
    .then(res => {
      return res.json();
      })
    .then((response) => {
      response.forEach(function (data, i) {
        var bookID = data.id;
        $.getJSON(url + "books/" + bookID + "/authors", function (data) {
          var bookID = data.id;
          var bookTitle = data.title;
          var bookIsbn = data.isbn;
          var authorList = data.Authors;
          console.log(bookID, bookTitle, i);
          $('.search-ul').append('<div class="card" id="results-' + i + '"></div>');
          $('#results-' +i).append(
            '<div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><input type="checkbox" name="Delete" aria-label="Delete entries" class="checkbox-del"></div></div><div class="card-body"><h4 class="btitle card-title">' + bookTitle + '</h4><h6 class="bisbn card-subtitle">ISBN: ' + bookIsbn + '</h6><h5 class="card-title">Author(s): </h5></div></div>',
            '<li class="bid">' + bookID + '</li>'
            // '<input type="checkbox" class="del-checkbox-'+ i + 'name="Delete entry" value="delete">',
            // '<li class=tid> ID: </li>',
            // '<li class="bid">' + bookID + '</li>',
            // '<li class="ttitle"> Title:</li>',
            // '<li class="btitle">' + bookTitle + '</li>',
            // '<li class="tisbn"> ISBN: </li>',
            // '<li class="bisbn">'+ bookIsbn + '</li>',
            // '<li class="tauthor"> Author(s): ' + '</li>',
          );

          // This was taken from a post by user ahren on StackOverflown: https://stackoverflow.com/questions/10889408/change-background-color-of-div-when-checkbox-is-clicked on 4-06-2014, accessed on 15-01-2019:
          // rgba has been added to change the opacity without affecting children.
          $('input[type=checkbox]').change(function() {
            if($(this).is(":checked")){
              $(this).closest("div.card").addClass("redBackground");
            } else {              $(this).closest("div.card").removeClass("redBackground");
            }
          });
          // Its better with add/removeClass
          // $('input[type=checkbox]').change(function() {
          //   if($(this).is(":not(:checked)")){
          //     $(this).closest("div.card").css({"background-color":"#fff}"});
          //   } else {
          //     $(this).closest("div.card").css({"background-color":"#fff}"});
          //   }
          // });

          authorList.forEach( function (authors, e) {
            console.log(i, authors.name);
            $('#results-' +i + " .card-body").append('<p class="card-text">' + authors.name + '</p>',
                                     '<li class="aid">' +
                                     authors.id + '</li>',
                                    );
          });
            // console.log(bookID, bookTitle, bookIsbn, authorList);
        });
      });
    });
}



// -------------------------------------------------------------------
// Delete Search Author functions
// ===================================================================


function lookupAuthor_del(qtype) {
  var searchQ = url + "search?type=" + qtype +
                "&name=" +
                $('#search-author').val();
  console.log(searchQ);

  fetch(searchQ, {
        method: 'get'
    })
    .then(res => {
      return res.json();
      })
    .then((response) => {
      response.forEach( function (data, i) {
        var authorID = data.id;
        $.getJSON(url + "authors/" + authorID + "/books", function (data) {
          var authorID = data.id;
          var authorName = data.name;
          var bookList = data.Books;
           $('.search-ul').append('<div class="card" id="results-' + i + '"' + '"></div>');
          $('#results-' +i).append(
            '<div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><input type="checkbox" name="Delete" aria-label="Delete entries" class="checkbox-del"></div></div><div class="card-body"><h4 class="card-title">' + authorName + '</h4><h6 class="card-subtitle">Author</h6><h5 class="card-title">Book(s): </h5></div>',
            '<li class="aid">' + authorID + '</li>',
          );
          bookList.forEach( function ( books, e) {
            // console.log(i, books.title);
            $('#results-' + i + " .card-body").append(
              '<p class="card-text">' + books.title + '</p>',
              '<li class="bid">' + books.id + '</li>'
            );
          });
          console.log(authorID, authorName, bookList);
          // $('.search-ul').append('<div id="results-' + i + '"' + '"></div>');
          // $('#results-' +i).append(
          //   '<input type="checkbox" id="del-checkbox" name="Delete" value="delete-book">',

          //   '<li class="aid">' + authorID + '</li>',
          //   '<li class="tauthor"> Name:</li>',
          //   '<li class="bauthor">' + authorName + '</li>',
          //   '<li class="btitle"> Book(s) authored: ' + '</li>',
          // );
          // bookList.forEach( function ( books, e) {
          //   // console.log(i, books.title);
          //   $('#results-' + i).append('<li class="btitle-' + e + '">' + books.title + '</li>');
          // });
        });
        // console.log(authorID);
      });
    });
  }

// ******************************************************************
// Delete addEventListener
// ******************************************************************

$('#search-del-button').click(function () {
  $(".search-ul").empty();
  // TODO: Search by ISBN not implemented.
  var qtype;
  if ($('#search-book').val()) {
    qtype = "book";
    lookupBook_del(qtype);
  } else if ($('#search-author').val()){
    qtype = "author";
    lookupAuthor_del(qtype);
  }
});


//---------------------------------------------------------------------
// Search book functions:
// ===================================================================


function lookupBook_3(qtype) {
  var searchQ = url + "search?type=" + qtype +
                    "&title=" +
                    $('#search-book').val() +
                    "&isbn=" +
                    $('#search-isbn').val();
  // console.log(searchQ);
  fetch(searchQ, {
        method: 'get'
    })
    .then(res => {
      return res.json();
      })
    .then((response) => {
      $('.results-output').prepend('<h1 class="result-title">Results</h1>');
      response.forEach(function (data, i) {
        var bookID = data.id;
        $.getJSON(url + "books/" + bookID + "/authors", function (data) {
          var bookID = data.id;
          var bookTitle = data.title;
          var bookIsbn = data.isbn;
          var authorList = data.Authors;
          console.log(bookID, bookTitle, i)
          $('.search-ul').append('<div class="card" id="results-' + i + '"></div>');
          $('#results-' +i).append(
            '<div class="card-body"><h4 class="card-title">' + bookTitle + '</h4><h6 class="card-subtitle">ISBN: ' + bookIsbn + '</h6><h5 class="card-title">Author(s): </h5></div>'
            // '<li class=tid> ID: </li>',
            // '<li class="bid">' + bookID + '</li>',
            // '<li class="ttitle"> Title:</li>',
            // '<li class="btitle">' + bookTitle + '</li>',
            // '<li class="tisbn"> ISBN: </li>',
            // '<li class="bisbn">'+ bookIsbn + '</li>',
            // '<li class="tauthor"> Author(s): ' + '</li>',
          );
          authorList.forEach( function (authors, e) {
            console.log(i, authors.name);
            $('#results-' +i).append(
              '<p class="card-text">' + authors.name + '</p>'
            );
              // '<li class="bauthor-' + e + '">' + authors.name + '</li>'
          });
            // console.log(bookID, bookTitle, bookIsbn, authorList);
        });
      });
      $([document.documentElement, document.body]).animate({
        scrollTop: $('.results-output').offset().top
      }, 700);
    });
}



// -------------------------------------------------------------------
// Search Author functions
// ===================================================================


function lookupAuthor_2(qtype) {
  var searchQ = url + "search?type=" + qtype +
                "&name=" +
                $('#search-author').val();
  console.log(searchQ);

  fetch(searchQ, {
        method: 'get'
    })
    .then(res => {
      return res.json();
      })
    .then((response) => {
      $('.results-output').prepend('<h1 class="result-title">Results</h1>');
      response.forEach( function (data, i) {
        var authorID = data.id;
        $.getJSON(url + "authors/" + authorID + "/books", function (data) {
          var authorID = data.id;
          var authorName = data.name;
          var bookList = data.Books;
          // console.log(authorID, authorName, bookList);
          $('.search-ul').append('<div class="card" id="results-' + i + '"' + '"></div>');
          $('#results-' +i).append(
            '<div class="card-body"><h4 class="card-title">' + authorName + '</h4><h6 class="card-subtitle">Author</h6><h5 class="card-title">Book(s): </h5></div>'
            // '<li class=tid> ID: </li>',
            // '<li class="aid">' + authorID + '</li>',
            // '<li class="tauthor"> Name:</li>',
            // '<li class="bauthor">' + authorName + '</li>',
            // '<li class="btitle"> Book(s) authored: ' + '</li>',
          );
          bookList.forEach( function ( books, e) {
            // console.log(i, books.title);
            $('#results-' + i).append(
              '<p class="card-text">' + books.title + '</p>'
              // '<li class="btitle-' + e + '">' + books.title + '</li>
              // '
            );
          });
        });
        // console.log(authorID);
      });
      $([document.documentElement, document.body]).animate({
        scrollTop: $('.results-output').offset().top
      }, 700);

    });
  }

// ******************************************************************
// addEventListener
// ******************************************************************

$('#search-button').click(function () {
  $('.result-title').empty();
  $(".search-ul").empty();
  // TODO: Search by ISBN not implemented.
  var qtype;
  if ($('#search-book').val()) {
    qtype = "book";
    lookupBook_3(qtype);
  } else if ($('#search-author').val()){
    qtype = "author";
    lookupAuthor_2(qtype);
  }
});


// Deprecated functions which has been refactored
// ==================================================================
// Search author functions

// function authorParser (results, i) {
//   results.forEach(function(result,i) {
//     var authorID = result.id;
//     var name = result.name;
//     var url = "api/search?type=book&id=" + authorID;
//     console.log(url);
//     var book = $.getJSON(url, function(result) {
//     var bookID = result.id;
//     var bookTitle = result.title;
//     var bookisbn = result.isbn;

//     }).then(res => {
//       console.log(res);
//       $('.search-ul').append('<div id="results-' + i + '"></div>');
//       $('#results-' +i).append(
//         '<li class=tid> ID: </li>',
//         '<li class="bid">' + res[0].id + '</li>',
//         '<li class="ttitle"> Title:</li>',
//         '<li class="btitle">' + res[0].title + '</li>',
//         '<li class="tisbn"> ISBN: </li>',
//         '<li class="bisbn">'+ res[0].isbn + '</li>',
//         '<li class="tauthor"> Author: ' + '</li>',
//         '<li class="nauthor">' + name + '</li>',
//       );
//     });
//   });
// }

// function lookupAuthor(qtype) {
//   var searchQ = url + "search?type=" + qtype +
//                 "&name=" +
//                 $('#search-author').val();
//   console.log(searchQ);

//   fetch(searchQ, {
//         method: 'get'
//     })
//     .then(res => {
//       return res.json();
//       })
//     .then((response) => {
//         authorParser(response);
//     });
//   }


// Search book functions
// function lookupBook(qtype) {
//   var searchQ = url + "search?type=" + qtype +
//                     "&title=" +
//                     $('#search-book').val() +
//                     "&isbn=" +
//                     $('#search-isbn').val();
//     // console.log(searchQ);

//   fetch(searchQ, {
//         method: 'get'
//     })
//     .then(res => {
//       return res.json();
//       })
//     .then((response) => {
//         resultsParser_2(response);
//     });
// }

// function lookupBook_2(qtype) {
//   var searchQ = url + "search?type=" + qtype +
//                     "&title=" +
//                     $('#search-book').val() +
//                     "&isbn=" +
//                     $('#search-isbn').val();
//     // console.log(searchQ);

//   fetch(searchQ, {
//         method: 'get'
//     })
//     .then(res => {
//       return res.json();
//       })
//     .then((response) => {
//       return resultsParser_2(response);

//     })
//     .then( (response) => {
//        getAuthors(response);
//     });
// }

  // function resultsParser(results) {
  //   results.forEach(function(result, i) {
  //     // getAuthorById(1)
  //     var bookID = result.id;
  //     var bookTitle = result.title;
  //     var bookisbn = result.isbn;
  //     // console.log(bookID);
  //     var url = "api/books/" + bookID + "/authors";
  //     console.log(url);
  //     var author = $.getJSON(url, function (data) {
  //       data.Authors.forEach(function (authors) {
  //         return authors;
  //       });
  //       // let name = data.name;        // extend?
  //       // // console.log(name);
  //       // return name;
  //     }).then(res => {
  //       // console.log(bookID);
  //       // console.log(res.Authors);
  //       // var authorCheck = res.Authors;
  //       function authorNames(authors) {
  //         authors.forEach( function (author, i) {
  //           console.log(author.id, res.id);
  //           $('[id^=results-]' ).append(
  //             '<li class="nauthors'+ i + '">' + author.name + '</li>',
  //             );
  //         });
  //       }
  //       // console.log(res);
  //       $('.search-ul').append('<div id="results-' + i + '"></div>');
  //       $('#results-' +i).append(
  //       '<li class=tid> ID: </li>',
  //       '<li class="bid">' + bookID + '</li>',
  //       '<li class="ttitle"> Title:</li>',
  //       '<li class="btitle">' + bookTitle + '</li>',
  //       '<li class="tisbn"> ISBN: </li>',
  //       '<li class="bisbn">'+ bookisbn + '</li>',
  //       '<li class="tauthor"> Author(s): ' + '</li>',
  //         // '<li class="nauthor">' + res.Authors.name + '</li>', // No longer used.
  //         // authorNames(res.Authors), //Strangely, this appends to the beginig of the bloq (?);
  //       );
  //       // console.log(res.id, res.Authors);
  //       authorNames(res.Authors); // this appends where it's supponsed to.

  //     });
  //   });

  // }
// function getAuthors (response) {
//   console.log(response);
//   var bookID = response;
//   var url = "api/books/" + bookID + "/authors";
//   var author = $.getJSON(url, function (data) {
//     var authorNamess = data.Authors[0].name;
//     console.log(authorNamess);
//     $('[id^=results-]' ).append(
//       '<li class="nauthors'+ i + '">' + authorNamess + '</li>',);
//   });
// }


// function resultsParser_2(results) {
//   var bookID = results.id;
//   console.log(results)
//   results.forEach(function(result, i) {
//     // getAuthorById(1)
//     var bookID = result.id;
//     var bookTitle = result.title;
//     var bookisbn = result.isbn;
//     // console.log(bookID);
//     var url = "api/books/" + bookID + "/authors";
//     console.log(url);
//     // console.log(res);
//     $('.search-ul').append('<div id="results-' + i + '"></div>');
//     $('#results-' +i).append(
//       '<li class=tid> ID: </li>',
//       '<li class="bid">' + bookID + '</li>',
//       '<li class="ttitle"> Title:</li>',
//       '<li class="btitle">' + bookTitle + '</li>',
//       '<li class="tisbn"> ISBN: </li>',
//       '<li class="bisbn">'+ bookisbn + '</li>',
//       '<li class="tauthor"> Author(s): ' + '</li>',
//     );

//       // getAuthors();             //
//         // console.log(res.id, res.Authors);
//         // authorNames(res.Authors); // this appends where it's supponsed to.

//   });
//   return bookID;
//   };


// Bellow are my attempts at Promises:
// ==================================================================
// function getAuthorById(id) {
//   var searchQ = url + "authors/" + id;
//   fetch(searchQ, {
//     method: 'get'
//   })
//   .then(res => {
//     return res.json()
//   })
//   .then((response) => {
//      return String(response.name);
//      // authorResult(response);
//   })
// }

// function authorResult(results) {
//   results.forEach(function(result, i) {
//     var author = result.name;
//     console.log(author);
//     return String(author);
//   });
// }

  //   $('.search-ul').append('<div id="results-' + i + '"></div>');
  //   $('#results-' +i).append(
  //     '<li class=tid> ID: </li>',
  //     '<li class="bid">' + authorID + '</li>',
  //     '<li class="author"> Name: </li>',
  //     '<li class="aname">' + name + '</li>');
  // });


//
// $('#search-button').click(function() {
// $.when(
//   $.getJSON("http://localhost:3000/api/search?type=book&title=d&isbn="),
//   $.getJSON("http://localhost:3000/api/search?type=author&id=1")
// ).then( (res1, res2) => {
//   res1[0].forEach(function(result, i) {
//   // console.log(result.id);            //for debugg
//   // console.log(getAuthorById(1))
//   var bookID = result.id;
//   var bookTitle = result.title;
//   var bookisbn = result.isbn;
//   // var author = getAuthorById(this.bookid);
//   // console.log(author);
//   $('.search-ul').append('<div id="results-' + i + '"></div>')
//   $('#results-' +i).append(
//     '<li class=tid> ID: </li>',
//     '<li class="bid">' + bookID + '</li>',
//     '<li class="ttitle"> Title:</li>',
//     '<li class="btitle">' + bookTitle + '</li>',
//     '<li class="tisbn"> ISBN: </li>',
//     '<li class="bisbn">'+ bookisbn + '</li>',
//   )
//     // '<li class="tauthor">' + author + '</li>'
//   })
//   res2[0].forEach(function(response) {
//     $('')
//     if (response.id == 1) {
//     console.log(response.name)
//     }
//   })
//  })
// });

// $('#search-button').click(function (){
//   var searchQ = url + "search?type=book" +
//                     "&title=" +
//                     $('#search-book').val() +
//                     "&isbn=" +
//                     $('#search-isbn').val();
//                     // "&author=" +
//                     // $('#search-author').val();
//   var authorQ = url + "authors/"
//     console.log(searchQ);
//
//   fetch(searchQ, {
//         method: 'get'
//     })
//     .then(res => {
//         return res.json()
//       })
//     // .then((response) => {$.get(authorQ, response.id => {
//     //   response.forEach(function(result, i) {
//     //
//     //   })
//     })})
//   }
// );





  // else if ($('#search-author')) {
    // qtype = "author"
  // }
// }

// Bellow is the first prototype, now split into functions
//   var url = "http://localhost:3000/api/search?";
//   var searchQ = url + "type=" + qtype
//                     "&title=" +
//                     $('#search-book').val() +
//                     "&isbn=" +
//                     $('#search-isbn').val();
//                     // "&author=" +
//                     // $('#search-author').val();
//     console.log(searchQ);
//
//   fetch(searchQ, {
//         method: 'get'
//     })
//     .then(res => {
//         return res.json()
//       })
//     .then((response) => {
//         resultsParser(response);
//     })
//   });
//
// function resultsParser(results) {
//   results.forEach(function(result, i) {
//     var bookID = result.id;
//     var bookTitle = result.title;
//     var bookisbn = result.isbn;
//     var author = result.name
//     $('.search-ul').append('<div id="results-' + i + '"></div>')
//     $('#results-' +i).append(
//       '<li class=tid> ID: </li>',
//       '<li class="bid">' + bookID + '</li>',
//       '<li class="ttitle"> Title:</li>',
//       '<li class="btitle">' + bookTitle + '</li>',
//       '<li class="tisbn"> ISBN: </li>',
//       '<li class="bisbn">'+ bookisbn + '</li>',
//       // '<li class="tauthor">' + author + '</li>'
//     )
// })
// };
