const { validationResult } = require('express-validator');

// Model
const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  try {
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
  } catch (e) {
    console.error(e);
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error("Validation failed! Entered data is incorrect!");
      error.statusCode = 422;
      throw error; // although we are inside async, we are not using await here
      // if we use next(), this will continue and save the data even if we have a validation error
    }

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
    if (!err.statusCode) err.statusCode = 500;
    next(err); // we add next instead of throwing because we are in async request
  }
}
