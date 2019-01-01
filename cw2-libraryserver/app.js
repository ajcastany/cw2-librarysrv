var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const cors = require("cors");
const db = require("./data");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');/*not very useful*/
// database variables
var authorsRouter = require('./routes/authors');
var booksRouter = require("./routes/books");
var usersRouter = require("./routes/users");
var loansRouter = require("./routes/loans");
var searchRouter = require("./routes/search");
// var cw2 = require('./server')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//Uncomment following line after placing the favicon.ico
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());        /*From server.js*/
app.options("*", cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authors', authorsRouter);
app.use("/books", booksRouter);
app.use("/users", usersRouter);
app.use("/loans", loansRouter);
app.use("/search", searchRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.initialiseDatabase(false, null);

module.exports = app;
