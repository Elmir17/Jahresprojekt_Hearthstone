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
        var msg = result.body
        var names = []
        const list = result.body


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
      var a = 0;
      names.forEach(p => {
        a++;
      })
      //a schleife, um die länge des arrays herauszufinden --> denn wen ich zuviele angebe kommt 'NaN' und 'undefined' --> darum die abfrage ()
      if(a === 6)
      {
        res.render('test', {output: msg[0] + msg[1] + "\t || \t" + msg[2] + msg[3] + "\t || \t" + msg[4] + msg[5]});
      }
      else if(a === 12)
      {
        res.render('test', {output: msg[0] + msg[1] + "\t || \t" + msg[2] + msg[3] + "\t || \t" + msg[4] + msg[5], 
        output2: msg[6] + msg[7] + "\t || \t" + msg[8] + msg[9] + "\t || \t" + msg[10] + msg[11]});
      }
      else if(a === 18)
      {
        res.render('test', {output: msg[0] + msg[1] + "\t || \t" + msg[2] + msg[3] + "\t || \t" + msg[4] + msg[5], 
        output2: msg[6] + msg[7] + "\t || \t" + msg[8] + msg[9] + "\t || \t" + msg[10] + msg[11],
        output3: msg[12] + msg[13] + "\t || \t" + msg[14] + msg[15] + "\t || \t" + msg[16] + msg[17]});
      }
      else if(a === 24)
      {
        res.render('test', {output: msg[0] + msg[1] + "\t || \t" + msg[2] + msg[3] + "\t || \t" + msg[4] + msg[5], 
        output2: msg[6] + msg[7] + "\t || \t" + msg[8] + msg[9] + "\t || \t" + msg[10] + msg[11],
        output3: msg[12] + msg[13] + "\t || \t" + msg[14] + msg[15] + "\t || \t" + msg[16] + msg[17],
        output4: msg[18] + msg[19] + "\t || \t" + msg[20] + msg[21] + "\t || \t" + msg[22] + msg[23]});
      }
      else
      {
        res.render('test', {output: msg[0] + msg[1] + "\t || \t" + msg[2] + msg[3] + "\t || \t" + msg[4] + msg[5], 
        output2: msg[6] + msg[7] + "\t || \t" + msg[8] + msg[9] + "\t || \t" + msg[10] + msg[11],
        output3: msg[12] + msg[13] + "\t || \t" + msg[14] + msg[15] + "\t || \t" + msg[16] + msg[17],
        output4: msg[18] + msg[19] + "\t || \t" + msg[20] + msg[21] + "\t || \t" + msg[22] + msg[23],
        output5: msg[24] + msg[25] + "\t || \t" + msg[26] + msg[27] + "\t || \t" + msg[28] + msg[29]});
      }
      
      
    }
  });

});

app.get('/v2', (req, res) => {
  console.log(req.query.name);
  
  unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/" + req.query.name2)

  .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
  .header("X-RapidAPI-Key", "bd7055d185mshb34ef1cf6ac06b9p1d91a5jsn1e3e79b74db8")
  .end((result) => {
    if (result.statusCode === 404) {
        console.log(result.body);
    }
    else
    if (result.statusCode === 200){
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
      //ich nehme irgendwelche daten aus der mitte heraus, da es pro klasse um die 400 karten gibt
      res.render('test', {output: msg[900] + msg[901] + "\t || \t" + msg[902] + msg[903] + "\t || \t" + msg[904] + msg[905], 
      output2: msg[906] + msg[907] + "\t || \t" + msg[908] + msg[909] + "\t || \t" + msg[910] + msg[911],
      output3: msg[912] + msg[913] + "\t || \t" + msg[914] + msg[915] + "\t || \t" + msg[916] + msg[917],
      output4: msg[918] + msg[919] + "\t || \t" + msg[920] + msg[921] + "\t || \t" + msg[922] + msg[923],
      output4: msg[924] + msg[925] + "\t || \t" + msg[926] + msg[927] + "\t || \t" + msg[928] + msg[929]});
      
      
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
