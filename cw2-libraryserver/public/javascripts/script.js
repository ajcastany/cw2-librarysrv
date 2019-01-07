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
// ==================================================================

$('#add-button').click(function() {
  $(".add-status").empty();
  var addQuery = url + "books";                   // localhost:3000/api/
  // Values from form.
  var addTitle = $('#add-book').val();
  var addIsbn = $('#add-isbn').val();
  var addAuthor = $('#add-author').val();

  // $.post('/api/books/4/authors/4').then(res => {
  //   console.log(res);
  // });
  // console.log({title: addTitle, isbn: addIsbn});

  $.post(addQuery, {title: addTitle, isbn: addIsbn});
  $.post(url + "authors/", {name: addAuthor}).then(function() {
  $('.add-form').each( function() {
    this.reset();
  });
    $('.add-status').append(
      '<h2 class="success"> Entry Successfully added to the database</h2>'
    )
});

});

/* ==================================================================
   Search Book and Author page:
   ==================================================================

   The following is for /search page.  It contains functions and methods to list the books and authors.  If searched for a book title or isbn will also list the author, if the author named is looked up it will return the book associated with it's ID.

   --Method: "GET"

   /TODO: maximum of items listed per 'page'.
   /TODO: Show list of books written by same author (new DB table?)
   /TODO: Comment out // Debug lines

   ------------------------------------------------------------------
*/

//---------------------------------------------------------------------
// Book functions:
// ===================================================================

function lookupBook(qtype) {
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
        resultsParser(response);
    });
  }

  function resultsParser(results) {
    results.forEach(function(result, i) {
      // getAuthorById(1)
      var bookID = result.id;
      var bookTitle = result.title;
      var bookisbn = result.isbn;
      // console.log(bookID);
      var url = "api/authors/" + bookID;
      console.log(url);
      var author = $.getJSON(url, function(data) {
        // let name = data.name;        // extend?
        // // console.log(name);
        // return name;
      }).then(res => {
        // console.log(bookID);
        console.log(res);
        $('.search-ul').append('<div id="results-' + i + '"></div>');
        $('#results-' +i).append(
        '<li class=tid> ID: </li>',
        '<li class="bid">' + bookID + '</li>',
        '<li class="ttitle"> Title:</li>',
        '<li class="btitle">' + bookTitle + '</li>',
        '<li class="tisbn"> ISBN: </li>',
        '<li class="bisbn">'+ bookisbn + '</li>',
        '<li class="tauthor"> Author: ' + '</li>',
        '<li class="nauthor">' + res.name + '</li>',
        );
      });
    });
}

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
    lookupBook(qtype);
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
