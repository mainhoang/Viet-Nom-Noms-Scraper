// Grab the articles as a json

console.log("yolo")

// Whenever someone clicks a p tag
$(document).on("click", ".comment-btn", function() {
  // Empty the notes from the note section
  $("#comment-input").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/recipes/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // // The title of the article
      // $("#notes").append("<h2>" + data.title + "</h2>");
      // // An input to enter a new title
      // $("#notes").append("<input id='titleinput' name='title' >");
      // // A textarea to add a new note body
      // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // // A button to submit a new note, with the id of the article saved to it
      // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
			$("#modal-recipe").text(data.title);
      // If there's a note in the article
      if (data.comment) {
        // Place the title of the note in the title input
        
        // Place the body of the note in the body textarea
        $("#comment-input").val(data.comment);
      }
    });
});

// When you click the savenote button
$(document).on("click", ".save-comment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/recipes/" + thisId,
    data: {
      comment: $("#comment-input").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#comment-input").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});
