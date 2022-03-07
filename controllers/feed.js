// helpers
const { errorCatcher, throwError } = require('../helpers/error-handler/error-catcher');
const validationError = require('../helpers/error-handler/validation-handler');

// Model
const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: "Fetched posts successfully.", posts: posts });
  } catch (err) {
    errorCatcher(err, next);
  }
}

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) throwError(404, "Could not find post.");
    res.status(200).json({ message: "Post fetched.", post: post });
  } catch (err) {
    errorCatcher(err, next);
  }
}

exports.createPost = async (req, res, next) => {

  try {
    validationError(req, "Validation failed! Entered data is incorrect!");

    if (!req.file) throwError(422, "Error image file upload.");
    const imageUrl = req.file.path;
    const { title, content } = req.body;
    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: { name: "Emman Ruaza" }
    });

    const result = await post.save();
    if (!result) throw new Error("Can't save post.");
    res.status(201).json({ message: "Post message created successfully!", post: result});
  } catch (err) {
    errorCatcher(err, next);
  }
}
