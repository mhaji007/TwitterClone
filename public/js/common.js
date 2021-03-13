// Houses all the shared code - will be included on all the pages

// Wait until all dependencies have been loaded
// $(document).ready(() => {alert('Testing')})


$("#postTextarea").keyup((event)=>{
  var textbox = $(event.target)
  var value = textbox.val().trim()
})
