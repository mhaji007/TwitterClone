


exports.createPost = (req, res, next) => {
  if(!req.body.content) {
    console.log("Content param not sent with request")
    res.sendStatus(400)
  }
}
