
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

            response.tweets.forEach(function(tweet) {
                tbodyEl.append('\
                    <tr>\
                        <td class="id">' + tweet.user.id + '</td>\
                        <td><input type="text" class="name" value="' + tweet.user.screen_name + '"></td>\
                        <td class="id">' + tweet.user.name + '</td>\
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
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $(document.getElementById("tweetbody"));

            tbodyEl.html('');

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
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $(document.getElementById("searchbody"));

            tbodyEl.html('');

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

        var createInput = $('#create-input');

        var inputString = createInput.val();

        const parsedStrings = inputString.split(';');

        var name = parsedStrings[0];
        var newName = parsedStrings[1];
        //TODO: creat a tweet
        $.ajax({
          url: '/tweets',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ name: createInput.val() }),
          success: function(response) {
              console.log(response);
              createInput.val('');
              $('#get-button').click();
          }
      });
        
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.

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

  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();

    $.ajax({
        url: '/tweets',// + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            $('#get-button').click();
        }
    });

  });


});


                    
   