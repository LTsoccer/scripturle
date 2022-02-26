var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
//var expressSession = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

//app.use( expressSession({
  //resave: false,
  //saveUninitialized: false,
  //secret: "super $ecret phrase 123", 
  //cookie: {
    //maxAge: 1000*60*10 // in ms
 // }
//}) );

app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
//app.use(function(req, res, next) {
 // next(createError(404));
//});

// error handler
//app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 // res.locals.message = err.message;
 // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
 // res.status(err.status || 500);
 // res.render('error');
//});

//module.exports = app;


app.get("/", (req, res) => {
  res.render('home');
});



app.get('/v1', (req, res)=> {
  res.render('v1');
});

app.get('/v2', (req, res)=> {
  res.render('v2');
  guesses = [];
});

let guesses = [];

app.post("/v2", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();
  let guessword = [];

  let num = 0;
  let result = []; 
  for (num = 0; num < 7; num++) {
    guessword[num] = guess[num];
    console.log(guessword[num]);
    if (secretWord.includes(guess[num])) {
      if (guess[num] == secretWord[num]) {
        result[num] = {guess: guess[num], answer: 'correct'};
      }
      else {
        result[num] = {guess: guess[num], answer: 'misplaced'};
      }
    }
    else {
      result[num] = {guess: guess[num], answer: 'incorrect'};
    }
  }

let message = "";
if (guesses.length < 6) {
  guesses.push({"result": result});
    console.log(guesses);
  if (guess == secretWord) {
    message = "Congratulations! You Won!";
  }
  else {
    message = "Guess Again!";
  }
}
else {
  message = "Sorry, You are Out of Guesses.";
}

  // return the guess
  res.render('v2', {result: result, guesses: guesses, message: message} );
});

app.post("/v1", (req, res)=> {

  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();
  let guessword = [];

  let num = 0;
  let result = []; 
  for (num = 0; num < 7; num++) {
    guessword[num] = guess[num];
    console.log(guessword[num]);
    if (secretWord.includes(guess[num])) {
      if (guess[num] == secretWord[num]) {
        result[num] = {guess: guess[num], answer: 'correct'};
      }
      else {
        result[num] = {guess: guess[num], answer: 'misplaced'};
      }
    }
    else {
      result[num] = {guess: guess[num], answer: 'incorrect'};
    }
  }
// = computeResult();

 // if(guess === secretWord) {
  //result = ['correct', 'correct', 'correct','correct','correct','correct','correct'];
//}
//else {
 // result = ['correct', 'misplaced', 'incorrect','incorrect','incorrect','misplaced','misplaced'];
//}


  // return the guess
  res.render('v1', {result: result} );
});


/* EXAMPLE */

let mark = { first: "Mark", last: "Hamill", age: "70" };

app.get("/example/:age", (req, res) => {
  let ageSentence = "";
  const age = parseInt(req.params.age);

  if (age > mark.age) {
    ageSentence = "You're older than Mark Hamill!";
  } else if (age < mark.age) {
    ageSentence = "You're younger than Mark Hamill!";
  } else {
    ageSentence = "You are Mark Hamill!";
  }
  const page = `<html>
                    <head> </head>
                    <body> 
                      <h1> Example </h1>
                      <p> ${ageSentence} </p>
                    </body>
                </html>`;

  //res.render('index', ageSentence);

  res.send(page);
});


app.post('/example', (req,res) => {

  let age = req.body.age;

  if (age > mark.age) {
    ageSentence = "You're older than Mark Hamill!";
  } else if (age < mark.age) {
    ageSentence = "You're younger than Mark Hamill!";
  } else {
    ageSentence = "You are Mark Hamill!";
  }
  const page = `<html>
                    <head> </head>
                    <body> 
                      <h1> Example </h1>
                      <p> ${ageSentence} </p>
                    </body>
                </html>`;

  //res.render('index', ageSentence);

  res.send(page);

});


const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
