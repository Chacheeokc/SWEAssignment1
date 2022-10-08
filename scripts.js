
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $(document.getElementById("namebody"));

            tbodyEl.html('');
            //append html to show tweets
            response.tweets.forEach(function(tweet) {
                tbodyEl.append('\
                    <tr>\
                        <td class="id">' + tweet.user?.id + '</td>\
                        <td><input type="text" class="name" value="' + tweet.user?.screen_name + '"></td>\
                        <td class="id">' + tweet.user?.name + '</td>\
                    </tr>\
                ');
            });
          }
        })
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $(document.getElementById("tweetbody"));

            tbodyEl.html('');
//append html to show tweets
            response.tweets.forEach(function(tweet) {
                tbodyEl.append('\
                    <tr>\
                        <td class="id">' + tweet.id + '</td>\
                        <td><input type="text" class="name" value="' + tweet.text + '"></td>\
                        <td class="id">' + tweet.created_at + '</td>\
                    </tr>\
                ');
            });
          }
        })
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
          url: '/searchinfo',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $(document.getElementById("searchbody"));

            tbodyEl.html('');
//append html to show tweets
            response.tweets.forEach(function(tweet) {
                tbodyEl.append('\
                    <tr>\
                        <td class="id">' + tweet.id + '</td>\
                        <td><input type="text" class="name" value="' + tweet.text + '"></td>\
                        <td class="id">' + tweet.created_at + '</td>\
                    </tr>\
                ');
            });
          }
        })
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();
        //parse data into two variables
        var createInput = $('#create-input');
        var inputString = createInput.val();
        const parsedStrings = inputString.split(';');
        var newId = parsedStrings[0];
        var newText = parsedStrings[1];
  
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({id: newId, text: newText}),
          success: function(response) {
              console.log(response);
              createInput.val('');
              $('#get-tweets-button').click();
          }
      });
        
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var searchedid = $('#search-input').val();
    
    //TODO: search a tweet and display it
    $.ajax({
      url: '/searchinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id: searchedid}),
      success: function(response) {
        console.log(response);
        $('get-searched-tweets');
      }
    })

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet
    $.ajax({
        url: '/tweets/' + name,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({nm: name, newName: newName }),
        success: function(response) {
            console.log(response);
            $('#get-button').click();
        }
    });
  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input').val()
    event.preventDefault();

    //TODO: delete a tweet

    $.ajax({
        url: '/tweetinfo/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        data:JSON.stringify({tweetid:id}),
        success: function(response) {
            console.log(response);
            $('#get-tweets-button').click();
        }
    });

  });


});


                    
   