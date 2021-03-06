// Houses all the shared code - will be included on all the pages

// Wait until all dependencies have been loaded
// $(document).ready(() => {alert('Testing')})

//  Keyup handler
$("#postTextarea").keyup((event) => {
  var textbox = $(event.target);
  var value = textbox.val().trim();

  var submitbutton = $("#submitPostButton");
  if (submitbutton.length == 0) return alert("No submit button found");

  if (value == "") {
    submitbutton.prop("disabled", true);
    return;
  }
  submitbutton.prop("disabled", false);
});

$("#submitPostButton").click((event) => {
  var button = $(event.target);
  var textbox = $("#postTextarea");
  // Content to be submitted
  var data = {
    content: textbox.val(),
  };

  $.post("/api/posts", data, (postData, status, xhr) => {
    var html = createPostHtml(postData);
    // Add to the start of the postsContainer
    $(".postsContainer").prepend(html);
    textbox.val("");
    // When JQuery is used to remove the text
    // key up event is not triggered and code
    // will not set it so we have to set it manually
    button.prop("disabled", true);
  });
});

// ========================================================================== /

// The following will not work because of
// the dynamic nature of the content (page loads first => posts are fetched)
// By the time the code runs and click event
// is triggered the button elements are not on the page yet

// $(".likeButton").click(() => {
//   alert("button clicked");
// });

// This works

// $(document).on("click", ".likeButton", () => alert("button clicked"));

// =========================================================================== /

$(document).on("click", ".likeButton", (event) => {
  var button = $(event.target);
  var postId = getPostIdFromElement(button);

  if(postId === undefined) {
    return;
  }

  //  There is no $.put
  $.ajax({
    url:`/api/posts/${postId}/like`, type:"PUT",
    success: (postData) => {
      console.log(postData)
    }
  })

});
// Go through the tree until root level post is found and
// take the id from there
// .closest("class-name") goes up the tree until a node with specified class is found
// .data() returns all the data attributes attached to the element
// .data().id returns the value corresponding to data-id
function getPostIdFromElement(element) {
  var isRoot = element.hasClass("post");
  var rootElement = isRoot == true ? element : element.closest(".post");
  var postId = rootElement.data().id;

  if (postId === undefined) return alert("Post id undefined");

  return postId;
}

function createPostHtml(postData) {
  var postedBy = postData.postedBy;
  // Check to see whether postedBy is populated on the server
  if (postedBy._id === undefined) {
    //  postedBy is just an objectId
    return console.log("User object not populated");
  }

  var displayName = postedBy.firstName + " " + postedBy.lastName;
  //  var timestamp = postData.createdAt;
  var timestamp = timeDifference(new Date(), new Date(postData.createdAt));

  return `<div class='post' data-id='${postData._id}' >

              <div class='mainContentContainer'>
                  <div class='userImageContainer'>
                      <img src='${postedBy.profilePicture}'>
                  </div>
                  <div class='postContentContainer'>
                      <div class='header'>
                          <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                          <span class='username'>@${postedBy.username}</span>
                          <span class='date'>${timestamp}</span>
                      </div>
                      <div class='postBody'>
                          <span>${postData.content}</span>
                      </div>
                      <div class='postFooter'>
                          <div class='postButtonContainer'>
                              <button>
                                  <i class='fa fa-comment'></i>
                              </button>
                          </div>
                          <div class='postButtonContainer'>
                              <button>
                                  <i class='fa fa-retweet'></i>
                              </button>
                          </div>
                          <div class='postButtonContainer'>
                              <button class='likeButton'>
                                  <i class='fa fa-heart'></i>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
}

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Just now";

    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}
