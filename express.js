var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []
//global variable for recently searched data
var recentlySearched = []


//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //Tweetinfo array is filled with data from json file
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  res.send({ tweets: tweetinfo });
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  res.send({ tweets: tweetinfo})
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send({ tweets: recentlySearched })

});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //new Tweet info
  var newTweet = req.body;
  //Date for the tweets
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

  //Push new info into tweetinfo array
  tweetinfo.push({ 
      id: newTweet.id,
      text: newTweet.text,
      created_at: dateTime,
      user:{
        name: "Gabe Chavez",
        screen_name: 'Beastslayer32',
        id: 123123
      }
  });

  res.send('Successfully created tweet!');
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
  var id = req.body.tweetid;
  var found = false;
  //search for the tweet with a for each loop
  tweetinfo.forEach(function(tweet, index) {
    if (!found && tweet.id == Number(id)) {
        recentlySearched.push(tweet);
        console.log(tweet);
    }
    res.send("Successfully Searched for Tweet!")
});


});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
  var originalName = req.body.nm;
  var newName = req.body.newName;

  var found = false;
  //look for name and update screen_name
  tweetinfo.forEach(function(tweet, index) {
      if (!found && tweet.user.name == originalName) {
          tweet.user.screen_name = newName;
      }
  });

  res.send('Succesfully updated product!');
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var id = req.body.tweetid;
  var found = false;

  tweetinfo.forEach(function(tweet, index) {
      if (!found && tweet.id == Number(id)) {
          tweetinfo.splice(index, 1);
      }
  });

  res.send('Successfully deleted product!');

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});