exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{title: "I'm a big man!", content: "Lorem ipsum dolor sit amet!"}, {title: "Little Red Riding Hood", content: "In the far away land, a big bad wolf is looking for a food!"}]
  });
}

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    // creating post in DB
    res.status(201).json({ // 201 status is success we created a resource, 200 is just success
      message: "Post message created successfully!",
      post: {
        id: new Date().toISOString(),
        title: title,
        content: content
      }
    });
  } catch (e) {
    console.error("Something is wrong in creating Post.");
  }
}
