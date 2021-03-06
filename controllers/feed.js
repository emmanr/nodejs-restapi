// Model
const Post = require('../models/post');
const User = require('../models/user');

// helpers
const { errorCatcher, throwError } = require('../helpers/error-handler/error-catcher');
const validationError = require('../helpers/error-handler/validation-handler');
const { deleteFile } = require('../helpers/delete-image');

const wsocket = require('../server/socket');

exports.getPosts = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find().populate('creator').sort({createdAt: -1}).skip((currentPage - 1) * perPage).limit(perPage);

    res.status(200).json({ message: "Fetched posts successfully.", posts: posts, totalItems: totalItems });
  } catch (err) {
    errorCatcher(err, next);
  }
}

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId).populate('creator');
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
      creator: req.userId
    });

    // finding User and Saving the post ID to User
    const user = await User.findById(req.userId);
    if (!user) throw new Error("Can't save post. Something is wrong with the referenced User");

    user.posts.push(post);
    await post.save();
    await user.save();

    // setting up socket io
    wsocket.getWSocket().emit('posts', {
      action: 'create',
      post: post
    });

    res.status(201).json({
      message: "Post created successfully!",
      post: post
    });
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

    // setting up socket io
    wsocket.getWSocket().emit('posts', {
      action: 'update',
      post: post
    });

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

    const user = await User.findById(req.userId);
    await user.posts.pull(postId); // this will removed the POST ID in User posts array
    await user.save();

    deleteFile(`../${post.imageUrl}`)
    await Post.findByIdAndRemove(postId);
    res.status(200).json({ message: "Deleted post!" });
  } catch (err) {
    errorCatcher(err, next);
  }
}
