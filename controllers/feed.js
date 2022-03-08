// Model
const Post = require('../models/post');

// helpers
const { errorCatcher, throwError } = require('../helpers/error-handler/error-catcher');
const validationError = require('../helpers/error-handler/validation-handler');
const { deleteFile } = require('../helpers/delete-image');

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

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    validationError(req, "Validation failed! Entered data is incorrect!");

    const { title, content } = req.body;
    let imageUrl = req.body.image;

    if (req.file) imageUrl = req.file.path;
    if (!imageUrl) throwError(422, "No file picked.");

    const post = await Post.findById(postId);
    if (!post) throwError(404, "Could not find post.");

    if (imageUrl !== post.imageUrl) deleteFile(`../${post.imageUrl}`);

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    await post.save();
    res.status(200).json({ message: "Post updated successfully!", post: post});
  } catch (err) {
    errorCatcher(err, next);
  }
}

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) throwError(404, "Could not find post.");

    // check login user
    deleteFile(`../${post.imageUrl}`)
    await Post.findByIdAndRemove(postId);
    res.status(200).json({ message: "Deleted post!" }); 
  } catch (err) {
    errorCatcher(err, next);
  }
}
