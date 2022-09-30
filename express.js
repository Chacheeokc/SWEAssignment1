var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []
var recentlySearched = "Nothing Has Been Recently Searched";


//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({ tweets: tweetinfo });
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({ tweets: tweetinfo})
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send({ recentlySearched })

});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var tweetName = req.body.name;
  currentId++;

  tweets.push({
      id: currentId,
      name: tweetName
  });

  res.send('Successfully created tweet!');
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
  var id = req.params.id;
  var newName = req.body.newName;

  var found = false;

  products.forEach(function(product, index) {
      if (!found && product.id === Number(id)) {
          product.name = newName;
      }
  });

  res.send('Succesfully updated product!');
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var id = req.params.id;

  var found = false;

  products.forEach(function(product, index) {
      if (!found && tweetinfo.id === Number(id)) {
          tweetinfo.splice(index, 1);
      }
  });

  res.send('Successfully deleted product!');

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});