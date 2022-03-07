exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: "2",
      title: "The Duck!",
      content: "Lorem ipsum dolor sit amet!",
      imageUrl: "images/duck.jpg",
      creator: {
        name: "Emman"
      },
      createdAt: new Date()
    }]
  });
}

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    // creating post in DB
    res.status(201).json({ // 201 status is success we created a resource, 200 is just success
      message: "Post message created successfully!",
      post: {
        _id: new Date().toISOString(),
        title: title,
        content: content,
        creator: {
          name: "Emman Ruaza"
        },
        createdAt: new Date()
      }
    });
  } catch (e) {
    console.error("Something is wrong in creating Post.");
  }
}
