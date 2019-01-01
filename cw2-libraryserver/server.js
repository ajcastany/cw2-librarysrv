const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const db = require("./data");

var authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");
var usersRouter = require("./routes/users");
var loansRouter = require("./routes/loans");
var searchRouter = require("./routes/search");

let server = express();

// interpret JSON body of requests
server.use(express.json());

// interpret url-encoded queries
server.use(express.urlencoded({ extended: false }));

// allow CORS
server.use(cors());

// allow CORS preflight for all routes
server.options("*", cors());

server.use("/authors", authorsRouter);
server.use("/books", booksRouter);
server.use("/users", usersRouter);
server.use("/loans", loansRouter);
server.use("/search", searchRouter);

// handle errors last
server.use(function(err, req, res, next) {
    res.status = err.status || 500;
    res.send(err);
});

// connect to the database and start the server running
// db.initialiseDatabase(false, null);
// server.listen(3000, function() {
//     console.log("server listening");
// });
