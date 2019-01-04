"use strict";
const url = "http://localhost:3000/api/";

console.log("cript loaded")

/*From https://stackoverflow.com/questions/14645806/get-all-attributes-of-an-element-using-jquery*/

// $("input").each(function() {
//   $.each(this.attributes, function() {
//     console.log(this);
//     // this.attributes is not a plain object, but an array
//     // of attribute nodes, which contain both the name and value
//     if(this.specified) {
//       console.log(this.name, this.value);
//     }
//   });
// });

// $('#search-button').click(function () {
//   var httpRequest;
//   httpRequest = new XMLHttpRequest();
//   httpRequest.open('get', 'http://localhost:3000/search');
//   httpRequest.send();
//   alert()
// })

// const processResponse = function() {
//   // let response = rows.forEach(row => console.log(JSON.stringify(row.data)))
//
//   let response = JSON.stringify(this.response);
//   console.log(response);
// }

// $('#search-button').click(function () {
//   // console.log($('#search-book').val(), $('#search-author').val());
//   var url = "http://localhost:3000/search/search?";
//   var searchQ = url + "type=book&title=" + $('#search-book').val() + "&isbn=" + $('#search-isbn').val();
//   // console.log(searchQ);
//   var xhttp = $.get(searchQ);
//   let response = JSON.parse(xhttp[0]);
//   console.log(response);
//   // console.log(xhttp.readyState);
//   // var JsonString = JSON.stringify(xhttp);
//   // console.log(JsonString);
//   // console.log(xhttp["responseText"]);
//
// })
//

function lookupBook(qtype) {
  var searchQ = url + "search?type=" + qtype +
                    "&title=" +
                    $('#search-book').val() +
                    "&isbn=" +
                    $('#search-isbn').val();
                    // "&author=" +
                    // $('#search-author').val();
    console.log(searchQ);

  fetch(searchQ, {
        method: 'get'
    })
    .then(res => {
        return res.json()
      })
    .then((response) => {
        resultsParser(response);
    })
  }

  function resultsParser(results) {
    results.forEach(function(result, i) {
      // getAuthorById(1)
      var bookID = result.id;
      var bookTitle = result.title;
      var bookisbn = result.isbn;
      // console.log(bookID);
      var url = "api/authors/" + bookID;
      var author = $.getJSON(url, function(data) {
        name = data.name
        console.log(name);
        return name;
      }).then(res => {

        console.log(bookID);
        // console.log(name);
      // console.log(getAuthorById(bookID));
      $('.search-ul').append('<div id="results-' + i + '"></div>')
      $('#results-' +i).append(
        '<li class=tid> ID: </li>',
        '<li class="bid">' + bookID + '</li>',
        '<li class="ttitle"> Title:</li>',
        '<li class="btitle">' + bookTitle + '</li>',
        '<li class="tisbn"> ISBN: </li>',
        '<li class="bisbn">'+ bookisbn + '</li>',
        '<li class="tauthor"> Author: ' + '</li>',
        '<li class="nauthor">' + name + '</li>',
      )
    })
  });
}



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
    lookupAuthor(qtype)
  }
});


function lookupAuthor(qtype) {
  var searchQ = url + "search?type=" + qtype +
                "&name=" +
                $('#search-author').val();
  console.log(searchQ);

  fetch(searchQ, {
        method: 'get'
    })
    .then(res => {
        return res.json()
      })
    .then((response) => {
        authorParser(response);
    })
  }



function getAuthorById(id) {
  var searchQ = url + "authors/" + id;
  fetch(searchQ, {
    method: 'get'
  })
  .then(res => {
    return res.json()
  })
  .then((response) => {
     return String(response.name);
     // authorResult(response);
  })
}

function authorResult(results) {
  results.forEach(function(result, i) {
    var author = result.name;
    console.log(author);
    return String(author);
  })
}

// function authorParser (results, i) {
//   results.forEach(function(result,i) {
//     var authorID = result.id;
//     var name = result.name;
//
//     $('.search-ul').append('<div id="results-' + i + '"></div>')
//     $('#results-' +i).append(
//       '<li class=tid> ID: </li>',
//       '<li class="bid">' + authorID + '</li>',
//       '<li class="author"> Name: </li>',
//       '<li class="aname">' + name + '</li>')
//   })
// }
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
