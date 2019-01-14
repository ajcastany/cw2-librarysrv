var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const cors = require("cors");
const db = require("./data");

var indexRouter = require('./routes/index');
var searchServe = require('./routes/search');
var addBookrouter = require('./routes/add-book');
var delBookrouter = require("./routes/delete-book");
var userRouter = require('./routes/users');
var loanRouter = require('./routes/loans');
var navigationView = require('./routes/navigation'); // Not working;
var addUserRouter = require('./routes/add-user');
var delUserRouter = require('./routes/delete-user');
// database variables
var usersRouter = require('./routes/api/users');
var authorsRouter = require('./routes/api/authors');
var booksRouter = require("./routes/api/books");
var loansRouter = require("./routes/api/loans");
var searchRouter = require("./routes/api/search");

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
app.use('/search', searchServe);
app.use('/', navigationView);
app.use('/add-book', addBookrouter);
app.use("/delete-book", delBookrouter);
app.use('/users', userRouter);
app.use('/loans', loanRouter);
app.use('/add-user', addUserRouter);
app.use('/delete-user', delUserRouter);
// Api starts here
app.use('/api/users', usersRouter);
app.use('/api/authors', authorsRouter);
app.use("/api/books", booksRouter);
app.use("/api/loans", loansRouter);
app.use("/api/search", searchRouter);


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
