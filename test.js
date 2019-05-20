var express = require('express');
var app = express();
var bodyParser = require ('body-parser')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/245671.jpg">')
})
app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.post('/order', function(req, res) {
  console.log(req.body)
  res.sendFile(__dirname + '/public/complete.html')
})
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
})
