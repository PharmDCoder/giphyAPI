$(document).ready(function () {
  $("#session").hide();

  $("#startBtn").on("click", function (event) {
    $("#instructionsAudio")[0].play();
    setInterval(() => {
      $("#session").show();
      $("#startScreen").hide();
    }, 2000);

    // var introPlayed = false;

    // //play audio instructions on page load
    // $(document).on("mousemove", function () {
    //   if (!introPlayed) {
    //     var promise = document.querySelector('audio').play();

    //     if (promise !== undefined) {
    //       promise.then(_ => {
    //         // Autoplay started!
    //         introPlayed = true;
    //       }).catch(error => {
    //         console.log("prevented: " + error);
    //         // Autoplay was prevented.
    //         // Show a "Play" button so that user can start playback.
    //       });
    //     }


    //   }
    // });

    //Initial array of emotions
    var emotionsArray = ["ecstatic", "disappointed", "depressed", "anxious", "funky", "saucy", "amazing", "drop the mic"];

    var gifImage;

    renderButtons();

    // Event listener for all button elements
    //Function to display gif cards
    function displayGif() {
      // In this case, the "this" keyword refers to the button that was clicked
      var emotion = $(this).attr("data-emotion");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=8";

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function (response) {
          console.log(response);
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            // Creating a BS card div for the gif
            var gifDiv = $("<div class='card col-3'>");

            // Creating an image tag
            gifImage = $("<img class='card-image-top' status='paused'>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            gifImage.attr("src", results[i].images.fixed_width_still.url);

            //Creating a card body div w/ bootstrap class
            var cardBody = $("<div class='card-body'>");

            //Creating Title for gif w/ BS class
            var cardTitle = $("<h5 class='card-title'>").text(emotion);

            // Creating a paragraph tag with the result item's rating
            var rating = $("<p class='card-text'>").text("Rating: " + results[i].rating);


            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(gifImage);
            gifDiv.append(cardBody);
            cardBody.append(cardTitle);
            cardBody.append(rating);


            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    };

    //Function for displaying emotion buttons dynamically
    function renderButtons() {
      //deleting existing button info so there are not duplicates
      $("#buttons-appear-here").empty();

      //looping through the array of emotions
      for (var i = 0; i < emotionsArray.length; i++) {
        //create a button
        var a = $("<button>");
        //add a class of emotion-btn to the button
        a.addClass("emotion-btn btn-group btn-group-toggle btn-secondary");
        //add an emotion attribute
        a.attr("data-emotion", emotionsArray[i]);
        //Providing the inital button text
        a.text(emotionsArray[i]);
        //Adding the button to the buttons-appear-here div
        $("#buttons-appear-here").append(a);

      }
    };

    //This function handles events where the user creates a new emotion button
    $("#add-emotion").on("click", function (event) {
      event.preventDefault();
      //This line grabs the input from the textbox
      var newEmotion = $("#emotion-input").val().trim();
      //adding emotion from the textbox to emotions array
      emotionsArray.push(newEmotion);
      //calling render button array to add new button
      renderButtons();

    })

    //Adding on click listener event to all elements with class "emotion-btn" and will display gifs when clicked
    $(document).on("click", ".emotion-btn", displayGif);

  });
  console.log("imag.attr " + $("img".attr("status")));
  //This function will unpause the gifs
  // $(document.body).on("click", "img", function () {
  //   if ($("img".attr("status")) === "paused") {
  //     console.log($("img".attr("status")));
  //     gifImage.attr("src", results[i].images.fixed_width.url);
  //     $(".card-image-top".attr("status", "animated"));
  //   } else {
  //     gifImage.attr("src", results[i].images.fixed_width_still.url);
  //     $(".card-image-top".attr("status", "paused"));
  //   }

    
  // });

});
