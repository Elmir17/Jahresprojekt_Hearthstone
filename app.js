var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);

var unirest = require('unirest');
          unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/Ysera")
          .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
          .header("X-RapidAPI-Key", "bd7055d185mshb34ef1cf6ac06b9p1d91a5jsn1e3e79b74db8")
          .end(function (result) {
            console.log(result.body[2].name)
          });
          
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

module.exports = app;
