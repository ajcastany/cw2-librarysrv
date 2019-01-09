"use strict";
const url = "http://localhost:3000/api/";         // our API url;

console.log("cript loaded");    // Debug info.

/* ==================================================================
   Add Book and Author page:
   ==================================================================

   The following is for /add-book page.  It contains functions and methods to add new books and authors to the relational database on /data using information provided with a form.

   --Method: POST

   /TODO: PUT methods.
   /TODO: incorporate authors_books table on this file.
   /TODO: Before commit to DB, should check if item exists, should check if author exists, if the item exists, refuse to add it, if the author exists append it to the authors_books table.  if the author doesn't exist, add it to db.



   /DONE: Event Listeners
   /DONE: POST function
   /DONE: Success message


   ------------------------------------------------------------------
*/

// ------------------------------------------------------------------
// Add Book and author functions:
// The following assings author id 4 to book id 4 on author_book table
// $.post("http://localhost:3000/api/authors/4/books/4")
// ==================================================================

$('#add-button').click(function() {
  $(".add-status").empty();
  var addQuery = url + "books";                   // localhost:3000/api/
  // Values from form.
  var addTitle = $('#add-book').val();
  var addIsbn = $('#add-isbn').val();
  var addAuthor = $('#add-author').val();

  $.post('/api/books/4/authors/4').then(res => {
    console.log(res);
  });
  console.log({title: addTitle, isbn: addIsbn, name: addAuthor});

  $.post(addQuery, {title: addTitle, isbn: addIsbn});
  $.post(url + "authors/", {name: addAuthor}).then(function() {
    // this should return a JSON with both IDs?
  $('.add-form').each( function() {
    this.reset();
  });                           // TODO: post to /:bookID/authors/ID
    $('.add-status').append(
      '<h2 class="success"> Entry Successfully added to the database</h2>');
});

});

/* ==================================================================
   Search Book and Author page:
   ==================================================================

   The following is for /search page.  It contains functions and methods to list the books and authors.  If searched for a book title or isbn will also list the author, if the author named is looked up it will return the book associated with it's ID.

   --Method: "GET"

   /TODO: maximum of items listed per 'page'.
   /TODO: search author_books table and return all authors in a book.
   /TODO: Comment out // Debug lines

   ------------------------------------------------------------------
*/

//---------------------------------------------------------------------
// Book functions:
// ===================================================================

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
      response.forEach(function (data, i) {
        var bookID = data.id;
        $.getJSON(url + "books/" + bookID + "/authors", function (data) {
          var bookID = data.id;
          var bookTitle = data.title;
          var bookIsbn = data.isbn;
          var authorList = data.Authors;
          console.log(bookID, bookTitle, i)
          $('.search-ul').append('<div id="results-' + i + '"></div>');
          $('#results-' +i).append(
            '<li class=tid> ID: </li>',
            '<li class="bid">' + bookID + '</li>',
            '<li class="ttitle"> Title:</li>',
            '<li class="btitle">' + bookTitle + '</li>',
            '<li class="tisbn"> ISBN: </li>',
            '<li class="bisbn">'+ bookIsbn + '</li>',
            '<li class="tauthor"> Author(s): ' + '</li>',
          );
          authorList.forEach( function (authors, e) {
            console.log(i, authors.name);
            $('#results-' +i).append('<li class="bauthor-' + e + '">' +
                                   authors.name + '</li>');
          });
            // console.log(bookID, bookTitle, bookIsbn, authorList);
        });
      });
    });
}


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

// -------------------------------------------------------------------
// Search Author functions
// ==================================================================

function authorParser (results, i) {
  results.forEach(function(result,i) {
    var authorID = result.id;
    var name = result.name;
    var url = "api/search?type=book&id=" + authorID;
    console.log(url);
    var book = $.getJSON(url, function(result) {
    var bookID = result.id;
    var bookTitle = result.title;
    var bookisbn = result.isbn;

    }).then(res => {
      console.log(res);
      $('.search-ul').append('<div id="results-' + i + '"></div>');
      $('#results-' +i).append(
        '<li class=tid> ID: </li>',
        '<li class="bid">' + res[0].id + '</li>',
        '<li class="ttitle"> Title:</li>',
        '<li class="btitle">' + res[0].title + '</li>',
        '<li class="tisbn"> ISBN: </li>',
        '<li class="bisbn">'+ res[0].isbn + '</li>',
        '<li class="tauthor"> Author: ' + '</li>',
        '<li class="nauthor">' + name + '</li>',
      );
    });
  });
}

function lookupAuthor(qtype) {
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
        authorParser(response);
    });
  }

// ******************************************************************
// addEventListener
// ******************************************************************

$('#search-button').click(function () {
  $(".search-ul").empty();
    // if ($('#search-author').val()) {
    // console.log($('#search-author').val())
  // }
  var qtype;
  if ($('#search-book').val()) {
    qtype = "book";
    lookupBook_3(qtype);
  } else if ($('#search-author').val()){
    qtype = "author";
    lookupAuthor(qtype);
  }
});


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
