let express = require("express");
let path = require("path");
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render('home');
});



app.get('/v1', (req, res)=> {
  res.render('v1');
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
