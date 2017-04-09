require('dotenv').config();
var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var db;
app.set('view-engine', 'ejs');

MongoClient.connect("mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + process.env.DB_URL, (err, database) => {
    if (err) return console.log(err);
    db = database
    app.listen(3000, () => {
        console.log("listening!");
    })
})

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/index.html', function(req, res){
  db.collection('transactions').find().toArray((err, result) => {
    if (err) return console.log(err);
    var sum = sumTransactions(result);

    res.render('index.ejs', {trans: result, sum: sum });
  })
})

var sumTransactions = function(arr) {
  var sum = 0;
  for (var i = 0; i<arr.length; i++) {
    sum += Number(arr[i].amount);
  }
  return sum;
}

app.post('/new_transaction', urlencodedParser, function(req, res){

  db.collection('transactions').save(req.body, (err, result) =>{
    if (err) return console.log(err)
    console.log('saved!')
    res.redirect('/index.html')
  })
})
