exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{title: "I'm a big man!", content: "Lorem ipsum dolor sit amet!"}, {title: "Little Red Riding Hood", content: "In the far away land, a big bad wolf is looking for a food!"}]
  });
}
