// helpers
const { errorCatcher, throwError } = require('../helpers/error-handler/error-catcher');
const validationError = require('../helpers/error-handler/validation-handler');

// Model
const Post = require('../models/post');

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

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) throwError(404, "Could not find post.");

  } catch (err) {
    errorCatcher(err, next);
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    validationError(req, "Validation failed! Entered data is incorrect!");

    const post = new Post({
      title: title,
      content: content,
      imageUrl: "images/duck.jpg",
      creator: { name: "Emman Ruaza" }
    });

    const result = await post.save();
    if (!result) throw new Error("Can't save post.");
    res.status(201).json({ message: "Post message created successfully!", post: result});
  } catch (err) {
    errorCatcher(err, next);
  }
}
