"use strict";

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
$('#search-button').click(function () {
  var url = "http://localhost:3000/search/search?";
  var searchQ = url + "type=book&title=" + $('#search-book').val() + "&isbn=" + $('#search-isbn').val();
  //   // console.log(searchQ);

  fetch(searchQ, {
        method: 'get'
    })
    .then(res => {
        return res.json()
      })
    .then((response) => {
        // var jsonString = ('res: ' + JSON.stringify(response));
        console.log(response);
    })
  });
// $("#search-button").click(function () {
//   $("input").each(function() {
//     $.each(this.attributes, function() {
//       console.log(this);
//       // this.attributes is not a plain object, but an array
//       // of attribute nodes, which contain both the name and value
//       if(this.specified) {
//         console.log(this.name, this.value);
//         // alert("searched" + this.name, this.value )
//
//       }
//     });
//   });
//   alert()
//
// });

// (function(send) {
//
//     XMLHttpRequest.prototype.send = function(data) {
//
//         // in this case I'm injecting an access token (eg. accessToken) in the request headers before it gets sent
//         // if(accessToken) this.setRequestHeader('x-access-token', accessToken);
//         console.log(this.data)
//         alert()
//         send.call(this, data);
//     };
//
// })(XMLHttpRequest.prototype.send);
