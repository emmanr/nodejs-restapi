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
      return res.status(422).json({
        message: "Validation failed! Incorrect data inputted!",
        errors: errors.array()
      });
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
  } catch (e) {
    console.error(e);
  }
}
