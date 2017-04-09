require('dotenv').config();
var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
//MongoClient.connect('link-to-mongodb', (err, database) => {
  db.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
  })
//})

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/index.html', function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post('/new_transaction', urlencodedParser, function(req, res){
  response = {
    transDate: req.body.date,
    transAmount: req.body.amount,
    note: req.body.notes,
    category: req.body.category
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

var server = app.listen(3000, function(){
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
