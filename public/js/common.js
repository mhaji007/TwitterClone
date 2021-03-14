// Houses all the shared code - will be included on all the pages

// Wait until all dependencies have been loaded
// $(document).ready(() => {alert('Testing')})

//  Keyup handler
$("#postTextarea").keyup((event)=>{
  var textbox = $(event.target)
  var value = textbox.val().trim()

  var submitbutton = $("#submitPostButton")
  if(submitbutton.length == 0) return alert("No submit button found")

  if(value == "") {
    submitbutton.prop("disabled", true)
    return;
  }
  submitbutton.prop("disabled", false)
})

$("#submitPostButton").click((event) => {
  var button = $(event.target)
  var textbox = $("#postTextarea")
  // Content to be submitted
  var data = {
    content:textbox.val()
  }

  $.post("/api/posts", data, (postData, status, xhr) =>{
    console.log(postData)
  })


})
