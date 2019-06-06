var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var unirest = require('unirest');
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

app.get('/v1/:name', (req, res) => {

  unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/" + req.params.name)
    .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "bd7055d185mshb34ef1cf6ac06b9p1d91a5jsn1e3e79b74db8")
    .end((result) => {
      if (result.statusCode === 404) {
        console.log(result.body);
    }
    else
    if (result.statusCode === 200){
        //console.log(result.body.name)
        var msg = result.body
        var names = []
        const list = result.body

        //console.log(list[0].name);



        if (list.length === 0) {
          console.log('no names')
        } else {
          for (let i = 0; i < list.length; i++) {
            names.push(list[i].name);
          }
        }


        msg = names;

        res.send(msg);
        res.end();
      }
    });
});


app.get('/v1', (req, res) => {
  console.log(req.query.name);
  
  unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/" + req.query.name)

  .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
  .header("X-RapidAPI-Key", "bd7055d185mshb34ef1cf6ac06b9p1d91a5jsn1e3e79b74db8")
  .end((result) => {
    if (result.statusCode === 404) {
        console.log(result.body);
    }
    else
    if (result.statusCode === 200){
      //console.log(result.body.name)
      var msg = result.body
      var names = []
      const list = result.body

      if (list.length === 0) {
        console.log('no names')
      } else {
        for (let i = 0; i < list.length; i++) {
          names.push('Name : ');
          names.push(list[i].name);
          names.push('Manakosten : ');
          names.push(list[i].cost);
          names.push('Beschreibung : ');
          names.push(list[i].text);
        }

        /*
        list.forEach(e => {
          names.push(e.name)
        });
        */
      }  

      msg = names;

      res.send(msg);
      //res.send(names);
      res.end();
    }
  });

});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
